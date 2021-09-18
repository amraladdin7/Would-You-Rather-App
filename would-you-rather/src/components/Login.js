import React, { Component } from "react";
import { connect } from "react-redux";
import setAuthedUser from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    user: "",
  };

  componentDidMount() {
    alert("Please sign in to continue to the app!");
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState(() => ({
      user: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.user));
    console.log("Authed user is: ", this.state.user);
  };

  render() {
    const { user } = this.state;
    const { userIds, users, authedUser } = this.props;

    if (authedUser !== null) {
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <div className="center-container">
          <div className="login-head">
            <h1>Welcome to the Would You Rather APP!</h1>
          </div>
        </div>
        <div className="center-container">
          <div className="sign-in">
            <form onSubmit={this.handleSubmit}>
              <h2>Please sign in to continue</h2>
              <select
                className="sign-in-select"
                defaultValue="Select a user..."
                onChange={this.handleChange}
              >
                <option disabled={true}>Select a user...</option>
                {userIds.map((user) => (
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>
                ))}
              </select>
              <button className="button" type="submit" disabled={user === ""}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    userIds: Object.keys(users),
    users,
    authedUser,
  };
}

export default connect(mapStateToProps)(Login);
