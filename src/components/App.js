import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import handleInitialData from "../actions/shared";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import LoadingBar from "react-redux-loading";
import QuestionPage from "./QuestionPage";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className="container">
          <Router>
            <Nav />
            <div>
              <Switch>

                <PrivateRoute path="/" component={Home} exact />
                <PrivateRoute path="/answered" component={Home} exact />
                <PrivateRoute path="/add" component={NewQuestion} exact />
                <PrivateRoute path="/leaderboard" component={LeaderBoard} exact />
                <PrivateRoute path='/questions/:question_id' component={QuestionPage} />

                <Route path="/login" component={Login} />
                <Route path='/*' component={NotFound} />
                <Route path='/not-found' component={NotFound} />

              </Switch>
            </div>
            <Footer />
          </Router>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
