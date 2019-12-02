const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Testudo';

mongoose.set('useFindAndModify', false);

const MONGODB_URI = 'mongodb+srv://Teemu:DBuser@puhelinluettelodb-hlufo.mongodb.net/library?retryWrites=true&w=majority';

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => { // TOIMII PARAMETRISOIMATON VERSIO
      //console.log('ALOITETAAN KIRJOJEN HAKU');
      let filteredBooks = await Book.find({});
      const authors = await Author.find({});
      
      if (args.author !== undefined && 
          args.author !== null && 
          args.author.length > 0) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author);
      }
      
      if (args.genre !== undefined && 
          args.genre !== null && 
          args.genre.length > 0) {
        filteredBooks = filteredBooks.filter(book => {
          const genre = book.genres.filter(genre => genre === args.genre)
          if (genre.length > 0) {
            return book;
          }
        });
      }

      //console.log('HAETUT KIRJAILIJAT', authors);
      
      filteredBooks = filteredBooks.map(book => {
        const wantedAuthor = authors.find(author => {
          const test_1 = author._id.str;
          const test_2 = book.author.str; 

          console.log('KIRJAILIJAN ID', test_2);
          console.log('KIRJAN ID', test_1);

          if (test_1 === test_2) {
            console.log('LÖYTYI!');
          }

          console.log();

        });

        book.author.name = 'TEMPORARY';
        book.author.bookCount = 0;

        return book;
      });
      

      return filteredBooks;
    },
    allAuthors: async() => {
      const authors = await Author.find({});

      for(let i=0; i<authors.length; i++) {
        const authorBooks = await Book.find({ author: authors[i]._id });
        authors[i].bookCount = authorBooks.length;
      }

      return authors;
    },
    me: async (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const newBook = new Book({ ...args });

      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('Autentikointi epäonnistui');
      }

      const authors = await Author.find({ name: args.author });
      if (authors.length === 0) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        });

        try {
          newAuthor.save(newAuthor);
        } catch(error) {
          throw new UserInputError('Annettu kirjailijan nimi on liian lyhyt', {invalidArgs: args});
        }

        try {
          await newBook.save();
        } catch (error) {
          throw new UserInputError('Annettu kirjan nimi on liian lyhyt', {invalidArgs: args});
        }

        return newBook;
      }

      const author = authors[0];
      author.bookCount = author.bookCount + 1;

      try {
        await newBook.save();
      } catch(error) {
        throw new UserInputError('Annettu kirjan nimi on liian lyhyt', {invalidArgs: args});
      }

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const searchResults = await Author.find({ name: args.name });

      console.log('KÄYTTÄJÄ', context.currentUser);
      
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('Autentikointi epäonnistui');
      }
      
      if (searchResults.length === 0) {
        return null;
      }
      
      const author = searchResults[0];
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        await user.save();
        return user;
      } catch(error) {
        throw new UserInputError('Käyttäjätunnus on liian lyhyt', {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'insecure') {
        throw new UserInputError('Annettu salasana tai käyttäjätunnus on väärin', {
          invalidArgs: args
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.find({ id: decodedToken.id });

      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
