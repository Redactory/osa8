import { gql } from 'apollo-boost';

const getAuthors = () => {
    const query = gql`
      {
        allAuthors {
          name,
          born,
          bookCount
        }
      }
    `;
  
    return query;
};

const changeAuthorBirthYear = () => {
  const query = gql`
    mutation changeAuthorBirth($name: String!, $setBornTo: Int!) {
      editAuthor(
        name: $name,
        setBornTo: $setBornTo
      ) {
        name,
        born
      }
    }
  `;

  return query;
};

export default {
    getAuthors,
    changeAuthorBirthYear
};
