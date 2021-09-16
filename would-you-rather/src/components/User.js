import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    const { users, id } = this.props;
    const rUser = users[id];
    const answerN = Object.keys(rUser.answers).length;
    const questionN = rUser.questions.length;
    const score = answerN + questionN;
    return (
      <div className="user">
        <div className="center-container">
          <img
            src={rUser.avatarURL}
            alt={`Avatar of ${rUser.name}`}
            className="avatar"
          />
          <div className="user-info">
            <h3>{rUser.name}</h3>
            <div className="options">Answered Questions: {answerN}</div>
            <div className="options">Created Questions: {questionN}</div>
          </div>
          <div className="score">Total = {score}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return { users, id };
}

export default connect(mapStateToProps)(User);
