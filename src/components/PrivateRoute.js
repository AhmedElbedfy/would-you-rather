import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function performValidationHere(authedUser) {
    return authedUser ? true : false;
}

const PrivateRoute = (props) => {
    const condition = performValidationHere(props.authedUser);
    return condition ? (React.createElement(Route, { path: props.path, exact: props.exact, component: props.component })) :
        (React.createElement(Redirect, { to: "/login" }));
};


function mapStateToProps({ authedUser }) {
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(PrivateRoute);