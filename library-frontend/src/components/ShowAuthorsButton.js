import React from 'react';

const handleClick = (props) => {
    props.setView('AUTHOR_VIEW');
};

const ShowAuthorsButton = (props) => {
    return(
        <div style={props.styling}>
            <button onClick={() => handleClick(props)}>authors</button>
        </div>
    );
};

export default ShowAuthorsButton;
