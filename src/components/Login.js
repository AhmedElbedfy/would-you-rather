import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import { useHistory } from "react-router-dom";

function Login({ users, dispatch, location }) {
    const [user, setUser] = useState("");
    const { from } = location.state || { from: { pathname: '/' } };
    const history = useHistory();

    const handleChange = (e) => {
        setUser(e.target.value);
    };

    const handleClick = () => {
        dispatch(setAuthedUser(user));
        user && history.push(from.pathname);
    };

    return (
        <div className="login">
            <h1>Welecom to the Would You Rather App!</h1>
            <hr />
            <small>please sign to continue</small>
            <div className="center">
                <h2>Sign in</h2>
                <select
                    autoFocus
                    name="user"
                    id="user"
                    onChange={handleChange}
                >
                    <option value="" >Chosse User</option>

                    {
                        Object.keys(users).map(key =>
                            <option key={key} value={key}>{users[key].name}</option>)
                    }
                </select>
                <br />
                <br />
                <button
                    disabled={user === ''}
                    onClick={
                        handleClick
                    }>
                    Sign In
                </button>
            </div>
        </div>
    );
}

function mapStateToProps({ users }) {
    return {
        users
    };
}

export default connect(mapStateToProps)(Login);
