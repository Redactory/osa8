import React, { useEffect, useState } from 'react';
import './App.css';
import ShowAuthorsButton from './components/ShowAuthorsButton';
import ShowBooksButton from './components/ShowBooksButton';
import ShowAddBookButton from './components/ShowAddBookButton';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import bookService from './servicers/books';
import authorService from './servicers/authors';
import { Query, Mutation } from 'react-apollo'
import AddBookForm from './components/AddBookForm';

const styling = {
  display: 'inline-block',
  float: 'left'
};

const selectView = (view) => {
  const ALL_BOOKS = bookService.getBooks();

  switch(view) {
    case 'AUTHOR_VIEW':
      const ALL_AUTHORS = authorService.getAuthors();
      return (
        <div>
          <Query query={ALL_AUTHORS}>
            {(result => <AuthorList result={result}/>)} 
          </Query>
        </div>
      );

    case 'BOOK_VIEW':
      return (
        <Query query={ALL_BOOKS}>
          {(result) => <BookList result={result} />}
        </Query>
        );

    case 'ADD_BOOK_VIEW':
      const ADD_BOOK = bookService.addBook();
      return(
        <Mutation 
          mutation={ADD_BOOK}
          refetchQueries={[{ query: ALL_BOOKS }]}
        >
          {(addBook) => <AddBookForm addBook={addBook} />}
        </Mutation>
      );



    default: return null;
  }
};

function App(props) {
  const [view, setView] = useState('');

  useEffect(() => {
    setView('AUTHOR_VIEW');
  }, []);

  return (
    <div className="App">
      <div>
        <ShowAuthorsButton styling={styling} setView={setView} />
        <ShowBooksButton styling={styling} setView={setView} />
        <ShowAddBookButton styling={styling} setView={setView} />
        {selectView(view)}
      </div>
    </div>
  );
};

export default App;
