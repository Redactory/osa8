import {gql} from 'apollo-boost';

const getBooks = () => {
    const query = gql`
      {
        allBooks {
          title,
          author {
            name
            born
            bookCount
          },
          published
        }
      }
    `;
  
    return query;
};

const addBook = () => {
  const query = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
      addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
      ) {
        title
        author {
          name
        }
        published
        genres
      }
    }
    `;
  
    return query;
}

export default {
    getBooks,
    addBook
};
