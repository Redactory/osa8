import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import SetBirthYear from './SetBirthYear';
import authorService from '../servicers/authors';
import { Mutation } from 'react-apollo'

const AuthorList = ({ result }) => {
  if (result.loading) {
    return <div>loading...</div>
  };

  let authors = [];
  
  if (result.data.allAuthors !== undefined) {
    authors = result.data.allAuthors;
  }

  const columns = [
        {
          Header: 'Name',
          accessor: 'name',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        },
        {
          Header: 'Born',
          accessor: 'born',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        },
        {
          Header: 'Books',
          accessor: 'bookCount',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        }
      ];

    const CHANGE_BIRTH_YEAR = authorService.changeAuthorBirthYear();
    const ALL_AUTHORS = authorService.getAuthors();
    
    return (
        <div>
            <h2>List of Authors</h2>
            <div>
                <ReactTable
                    manual
                    minRows={0}
                    pageSize={1}
                    data={authors}
                    columns={columns}
                    pages={0}
                    showPagination={true}
                />
            </div>
            <div>
              <Mutation 
                mutation={CHANGE_BIRTH_YEAR}
                refetchQueries={[{ query: ALL_AUTHORS }]}  
              >
                {(editAuthor) => <SetBirthYear editAuthor={editAuthor} authors={authors} />}
              </Mutation>
            </div>
        </div>
    );
}

export default AuthorList;
