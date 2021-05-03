import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import { useHistory } from "react-router-dom";

function Nav({ dispatch, user, users }) {
  let match = useRouteMatch("/login");
  const history = useHistory();

  const handleClick = () => {
    dispatch(setAuthedUser(null));
    history.push("/login");
  };


  const userName = (users
    ? users[user] && users[user].name
    : "Please Sign in");

  const userAvater = (users && users[user] && users[user].avatarURL);




  return (
    <React.Fragment>
      {match && match.isExact ? (
        ""
      ) : (
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" activeClassName="active">
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" activeClassName="active">
                Leader Board
              </NavLink>
            </li>
          </ul>
          <div className="user-log">
            <div className='info'>
              <span>Hello, {userName}</span>
              <img src={userAvater} alt={userName} className="avatar" />

            </div>
            <button onClick={
              handleClick
            }>
              Sign Out
            </button>
          </div>
        </nav>
      )}
    </React.Fragment>
  );
}

function mapStateToProps({ users, authedUser }) {
  return {
    user: authedUser,
    users: users
  };
}

export default connect(mapStateToProps)(Nav);
