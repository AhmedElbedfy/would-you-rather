import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { handleAnswer } from '../actions/shared';

function QuestionPage(
    { q, user, dispatch, authedUserData,
        result, optionOneVotes, optionTwoVotes,
        userAnswer, notFound }) {

    console.log("Props From the component", notFound);

    const [selectOption, setSelectOption] = useState("");


    const handleChange = (event) => {
        setSelectOption(event.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("q.id", q.id);
        dispatch(handleAnswer(q.id, selectOption));
        result();
    };


    return (
        notFound ? <Redirect to="/not-found" /> :
            <div className="question">

                {q.id in authedUserData.answers ?

                    <React.Fragment>

                        <div className="row-1">
                            <h1>Results</h1>
                        </div>

                        <div className="row-2 result">
                            <div className="avater">
                                <img className="round-img" width="75" height="75" src={user.avatarURL} alt={user.name} />
                            </div>
                            <div className="col-2">
                                <h2>Asked by {user.name}</h2>

                                <div className={`${userAnswer === "optionOne" && "answer"} align`}>
                                    <p>
                                        {q && q.optionOne && q.optionOne.text}
                                    </p>
                                    <br />
                                    <span>
                                        {optionOneVotes} out of {optionOneVotes + optionTwoVotes} votes
                                    {userAnswer === "optionOne" && <b> (Your Answer)</b>}
                                    </span>
                                </div>
                                <p className="or">vs</p>

                                <div className={`${userAnswer === "optionTwo" && "answer"} align`}>

                                    <p>
                                        {q && q.optionTwo && q.optionTwo.text}
                                    </p>
                                    <br />
                                    <span>
                                        {optionTwoVotes} out of {optionOneVotes + optionTwoVotes} votes
                            {userAnswer === "optionTwo" && <b> (Your Answer)</b>}
                                    </span>
                                </div>

                            </div>
                        </div>

                    </React.Fragment>

                    :

                    <React.Fragment>
                        <div className="row-1">
                            <h1>{user.name} asks:</h1>
                        </div>
                        <div className="row-2">
                            <div className="avater">
                                <img className="round-img" width="75" height="75" src={user.avatarURL} alt={user.name} />
                            </div>


                            <div className="col-2">

                                <h2>Would you Rather</h2>

                                <div className="flex ">
                                    <input

                                        type="radio"
                                        id="optionOne"
                                        name="answer"
                                        value="optionOne"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="optionOne">
                                        {q && q.optionOne && q.optionOne.text}
                                    </label>
                                </div>

                                <p className="or">or</p>

                                <div className="flex">
                                    <input
                                        type="radio"
                                        id="optionTwo"
                                        name="answer"
                                        value="optionTwo"
                                        onChange={handleChange}
                                    />

                                    <label htmlFor="optionTwo">
                                        {q && q.optionTwo && q.optionTwo.text}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="question-page-btn" >
                            <button
                                disabled={!selectOption}
                                onClick={handleClick}
                            >
                                Submit
                </button>
                        </div>
                    </React.Fragment>
                }
            </div>
    );
}




function mapStateToProps({ questions, authedUser, users }, props) {
    let { question_id } = props.match.params;
    let { path } = props.match;
    console.log("Props", props);
    console.log("path", path);
    console.log("question_id in questions", question_id in questions);

    if (path === "/questions/:question_id" && question_id in questions) {
        const q = questions[question_id];
        const user = users[q.author];
        const authedUserData = users[authedUser];
        let userAnswer, optionOneVotes, optionTwoVotes;

        const result = () => {
            userAnswer = authedUserData.answers[q.id];
            optionOneVotes = q.optionOne.votes.length;
            optionTwoVotes = q.optionTwo.votes.length;

        };

        result();

        return {
            questions,
            users,
            authedUserData,
            user,
            q,
            optionOneVotes,
            optionTwoVotes,
            result,
            userAnswer
        };
    } else {
        return { notFound: true };
    }
}

export default connect(mapStateToProps)(QuestionPage);
