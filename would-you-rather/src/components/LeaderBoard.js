import React, { Component } from "react";
import { connect } from "react-redux";
import User from "./User";

class LeaderBoard extends Component {
  render() {
    const { userIds } = this.props;
    return (
      <div>
        <ul>
          {userIds.map((user) => (
            <li key={user}>{<User id={user} />}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users).sort((a, b) => {
      const total1 =
        users[b].questions.length + Object.keys(users[b].answers).length;
      const total2 =
        users[a].questions.length + Object.keys(users[a].answers).length;
      return total1 - total2;
    }),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
