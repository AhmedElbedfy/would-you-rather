import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Question from './Question';
import { connect } from "react-redux";

function Home({ unAnswerdQ, answerdQ, users }) {
    return (
        <div className="home">
            <div className="nav">
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Unanswered Questions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/answered' exact activeClassName='active'>
                            Answered Questions
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path='/'>
                    {unAnswerdQ.map(q => {
                        return <Question key={q.id} q={q} user={users[q.author]} />;
                    })}
                </Route>
                <Route exact path='/answered'>
                    {answerdQ.map(q => {
                        return <Question key={q.id} q={q} user={users[q.author]} />;
                    })}
                </Route>
            </Switch>
        </div>
    );
}


function mapStateToProps({ questions, authedUser, users }) {
    const authedUserData = users[authedUser];

    let answerdQ = [];
    let unAnswerdQ = [];

    for (const [key, value] of Object.entries(questions)) {
        if (key in authedUserData.answers) {
            answerdQ.push(value);
        } else if (key in authedUserData.answers === false) {
            unAnswerdQ.push(value);
        }
    }


    return {
        questions,
        users,
        unAnswerdQ,
        answerdQ
    };
}


export default connect(mapStateToProps)(Home);
