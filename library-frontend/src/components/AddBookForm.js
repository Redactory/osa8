import React, { useState } from 'react';

const handleGenreSubmission = (event, genreInput, setGenreInput, genres, setGenres) => {
    event.preventDefault();
    const updatedGenreList = [...genres];
    updatedGenreList.push(genreInput);
    setGenres(updatedGenreList);
    setGenreInput('');
}

const showGenres = (genres) => {
    let genreString = '';
    genres.forEach(genre => {
        if (genreString.length > 0) {
            genreString = genreString + ', ' + genre;
        } else {
            genreString = genre;
        }
    });

    return genreString;
}

const AddBookForm = (props) => {
    const [genres, setGenres] = useState([]);
    const [genreInput, setGenreInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [authorInput, setAuthorInput] = useState('');
    const [publishedInput, setPublishedInput] = useState('');

    
const handleBookCreation = async (event) => {
    event.preventDefault();

    const published = parseInt(publishedInput);

    await props.addBook({
        variables: {
            title: titleInput,
            author: authorInput,
            published,
            genres: genres
        }
    });

    setTitleInput('');
    setAuthorInput('');
    setPublishedInput('');
    setGenreInput('');
    setGenres([]);
};

    const form_one_Styling = {
        float: 'left',
        position: 'relative',
        left: '50%',
        border: 'solid black 2px',
        paddingBottom: '10%',
        paddingLeft: '10%',
        paddingRight: '10%',
    };

    const containerStyling = {
        float: 'left'
    };

    const form_two_Styling = {
        float: 'left',
        position: 'relative',
        left: '10%',
        border: 'solid black 2px',
        paddingLeft: '10px',
        paddingRight: '10px'
    };

    const containerStylingTwo = {
        width: '80%',
    }

    return (
        <div>
            <div style={containerStyling}>
                <form onSubmit={(event) => handleBookCreation(event, props, genres, titleInput, authorInput, publishedInput)} style={form_one_Styling}>
                    <div>
                        <label>Title</label>
                        <input value={titleInput} onChange={(event) => setTitleInput(event.target.value)}></input>
                    </div>
                    <div>
                        <label>Author</label>
                        <input value={authorInput} onChange={(event) => setAuthorInput(event.target.value)}></input>
                    </div>
                    <div>
                        <label>Published</label>
                        <input type="number" value={publishedInput} onChange={(event) => setPublishedInput(event.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div style={containerStylingTwo}>
                <form onSubmit={(event) => handleGenreSubmission(event, genreInput, setGenreInput, genres, setGenres)} style={form_two_Styling}>
                    <div>
                        <label>Genre Input</label>
                        <input value={genreInput} onChange={(event) => setGenreInput(event.target.value)}></input>
                    </div>
                    <button type="submit">add genre</button>
                    <div>
                        Genres: {showGenres(genres)}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookForm;
