import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    setTimeout(1000);
    const { question, users, author, ans } = this.props;
    const creator = users[author];
    return (
      <Link to={`/question/${question.id}`} className="question">
        <div className="center-container">
          <img
            src={creator.avatarURL}
            alt={`Avatar of ${creator.name}`}
            className="avatar"
          />
          <div className="question-details">
            <h3>
              {creator.name} {ans && "asked"} {!ans && "asks"} Would You
              Rather....
            </h3>
            <div className="options">
              {question.optionOne.text}
              <div className="or">... OR ...</div>
              {question.optionTwo.text}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  const author = question.author;
  return {
    question,
    author,
    users,
  };
}

export default connect(mapStateToProps)(Question);
