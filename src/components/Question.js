import React from 'react';
import { useHistory } from "react-router-dom";

export default function question({ q, user }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/questions/${q.id}`);
    };

    return (
        <div className="question">
            <div className="row-1">
                <h1>{user.name} asks:</h1>
            </div>
            <div className="row-2">
                <div className="avater">
                    <img className="round-img" width="75" height="75" src={user.avatarURL} alt={user.name} />
                </div>
                <div className="col-2">
                    <h2>Would you Rather</h2>
                    <p>{q && q.optionOne && q.optionOne.text}</p>
                    <p className="or">or</p>
                    <p>{q && q.optionTwo && q.optionTwo.text}</p>
                </div>
            </div>
            <button onClick={handleClick} >View Poll</button>

        </div>
    );
}
