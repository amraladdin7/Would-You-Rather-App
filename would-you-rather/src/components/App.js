import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import Login from "./Login";
import AnsQuestion from "./AnsQuestion";
import { LoadingBar } from "react-redux-loading";
import NavBar from "./NavBar";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Error from "./Error";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <LoadingBar />
        <NavBar />
        <div className="App">
          {this.props.loading ? null : this.props.login ? (
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/question/:id" component={AnsQuestion} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route component={Error}></Route>
            </Switch>
          ) : (
            <Login />
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    loading: Object.keys(users).length > 0 ? false : true,
    login: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
