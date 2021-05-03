import React, { useState } from 'react';
import { connect } from "react-redux";
import { handleAddQuestion } from '../actions/shared';
import { useHistory } from "react-router-dom";

function NewQuestion({ dispatch }) {
    const history = useHistory();

    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleClick = () => {
        dispatch(handleAddQuestion(optionOne, optionTwo));
        history.push("/");

    };

    return (
        <div className="new-question">
            <h1> Create New Question</h1>
            <hr />
            <small>Complete the question</small>
            <div className="center">
                <h2>Would you rather...</h2>
                <input
                    onChange={e => setOptionOne(e.target.value)}
                    type="text"
                    placeholder="Enter Question one text here"

                />

                <p>or</p>

                <input
                    onChange={e => setOptionTwo(e.target.value)}
                    type="text"
                    placeholder="Enter Question two text here"

                />
                <br />
                <br />
                <button
                    onClick={handleClick}
                    disabled={optionOne === '' || optionTwo === ''
                    }>create question</button>
            </div>
        </div>
    );
}

export default connect()(NewQuestion);

