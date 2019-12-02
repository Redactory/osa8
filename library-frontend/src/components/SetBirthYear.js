import React, { useState } from 'react';
import Select from 'react-select';

const createOptions = (authors) => {
    const options = [];

    authors.forEach(element => {
        const option = {
            value: element.name,
            label: element.name
        }

        options.push(option);
    });

    return options;
}

const SetBirthYear = (props) => {
    const [birth, setBirth] = useState('');
    const [selectedName, setSelectedName] = useState(null);

    const styling = {
        width: '30%',
        marginLeft: '35%'
    };

    if (props.loading) {
        return <div>loading...</div>
    };

    const changeBirthYear = async(event) => {
        event.preventDefault();

        const born = parseInt(birth);

        await props.editAuthor({
            variables: {
                name: selectedName.value,
                setBornTo: born
            }
        });

        setSelectedName(null);
        setBirth('');
    };

    const handleChange = (selectedName) => {
        setSelectedName(selectedName);
    }

    return (
        <div>
            <h2>set birth year</h2>
            <form onSubmit={changeBirthYear}>
                <div style={styling}>
                    <div>
                        <label>name</label>
                        <Select 
                            value={selectedName}
                            onChange={handleChange}
                            options={createOptions(props.authors)}
                        />
                    </div>
                    <div>
                        <label>born</label>
                        <input value={birth} onChange={(event) => setBirth(event.target.value)}></input>
                    </div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}

export default SetBirthYear;
