import React from 'react';
import User from './User';
import { connect } from "react-redux";



function Users({ users }) {

    console.log(users);
    return (
        <React.Fragment>
            {
                users.map(user =>
                    <User
                        key={user.id}
                        name={user.name}
                        avatarURL={user.avatarURL}
                        numOfQ={user.questions.length}
                        numOfA={Object.keys(user.answers).length}
                    />)
            }

        </React.Fragment>
    );
}

function mapStateToProps({ users }) {
    const score = (user) =>
        Object.keys(user.answers).length + user.questions.length;
    return {
        users: Object.values(users).sort((a, b) => score(b) - score(a))
    };
}

export default connect(mapStateToProps)(Users);

