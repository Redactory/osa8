import React from 'react';

const handleClick = (props) => {
    props.setView('BOOK_VIEW');
}

const ShowBooksButton = (props) => {
    return(
        <div style={props.styling}>
            <button onClick={() => handleClick(props)}>books</button>
        </div>
    );
}

export default ShowBooksButton;
