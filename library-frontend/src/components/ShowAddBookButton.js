import React from 'react'

const handleClick = (props) => {
    props.setView('ADD_BOOK_VIEW');
}

const ShowAddBookButton = (props) => {
    return (
        <div style={props.styling}>
            <button onClick={() => handleClick(props)}>add book</button>
        </div>
    );
};

export default ShowAddBookButton;
