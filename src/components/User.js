import React from 'react';

export default function User({ name, avatarURL, numOfQ, numOfA }) {

    return (
        <div className="user">
            <div className="avater">
                <img className='round-img ' src={avatarURL} alt={name} />
            </div>
            <div className="user-info">
                <h1>{name}</h1>
                <div className="score">
                    <h3>Answerd Question:</h3>
                    <span>{numOfA}</span>
                </div>
                <div className="score">
                    <h3>Created Question:</h3>
                    <span>{numOfQ}</span>
                </div>
            </div>
            <div className="user-score">
                <h2>Score</h2><span>{numOfQ + numOfA}</span>
            </div>
        </div>
    );
}
