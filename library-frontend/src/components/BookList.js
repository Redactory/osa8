import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const BookList = ({ result }) => {
    if (result.loading) {
        return <div>loading...</div>
    };
    
    console.log('HAKUTULOKSET', result.data);

    let books = [];
    if (result.data.allBooks !== undefined) {
      books = result.data.allBooks;
    }
 
    const columns = [
        {
          Header: 'Name',
          accessor: 'title',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        },
        {
          Header: 'Author',
          accessor: 'author.name',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        },
        {
          Header: 'Published',
          accessor: 'published',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        }
      ];

    return (
        <div>
            <h2>Book List</h2>
            <div>
            <ReactTable
                manual
                minRows={0}
                pageSize={1}
                data={books}
                columns={columns}
                pages={0}
                showPagination={true}
            />
            </div>
        </div>
    );
};

export default BookList;

