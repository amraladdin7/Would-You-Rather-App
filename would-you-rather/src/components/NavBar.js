import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import setAuthedUser from "../actions/authedUser";
import { Redirect, withRouter } from "react-router";

class NavBar extends Component {
  handleLogout = (e) => {
    e.preventDefault();

    this.props.dispatch(setAuthedUser(null));

    this.props.history.push(`/`);
  };
  render() {
    const { authedUser, users } = this.props;

    return (
      <div>
        {authedUser ? (
          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/home" exact activeClassName="active">
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
                  LeaderBoard
                </NavLink>
              </li>
            </ul>

            <ul className="login-info">
              <li>
                <img
                  src={users[authedUser].avatarURL}
                  alt={`Avatar of ${users[authedUser].name}`}
                  className="avatar-login"
                />
                <div className="user-name">{users[authedUser].name}</div>
              </li>
              <li>
                <button onClick={this.handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
