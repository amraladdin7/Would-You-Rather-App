import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestions } from "../actions/questions";
import { updateUsers } from "../actions/users";

class AnsQuestion extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const first = document.getElementById("one").checked;
    const second = document.getElementById("two").checked;
    const { dispatch, question, authedUser } = this.props;
    const op1 = "optionOne";
    const op2 = "optionTwo";

    if (first) {
      dispatch(
        handleAnswerQuestions({
          qid: question.id,
          answer: op1,
        })
      );
      dispatch(
        updateUsers({
          authedUser: authedUser,
          qid: question.id,
          answer: op1,
        })
      );
    } else if (second) {
      dispatch(
        handleAnswerQuestions({
          qid: question.id,
          answer: op2,
        })
      );
      dispatch(
        updateUsers({
          authedUser: authedUser,
          qid: question.id,
          answer: op2,
        })
      );
    } else {
      alert("Please Select a response!!");
    }
  };
  render() {
    if (this.props.found) {
      const { authedUser, question, users } = this.props;
      const creator = users[question.author];
      const optionOne = question.optionOne.text;
      const optionTwo = question.optionTwo.text;
      const answeredQuestions = Object.keys(users[authedUser].answers);
      const isAnswered =
        answeredQuestions.filter((q) => q === question.id).length > 0;
      const selectedOption = users[authedUser].answers[question.id];
      const nOne = question.optionOne.votes.length;
      const nTwo = question.optionTwo.votes.length;
      const total = nOne + nTwo;

      return (
        <div className="question unique">
          <div className="center-container">
            <img
              src={creator.avatarURL}
              alt={`Avatar of ${creator.name}`}
              className="avatar"
            />
            <div className="question-details">
              <h3>{creator.name} asks Would You Rather....</h3>
              {isAnswered ? (
                <div className="options">
                  {selectedOption === "optionOne" ? (
                    <div className="selected">{"    " + optionOne}</div>
                  ) : (
                    <div className="option">{optionOne}</div>
                  )}
                  <div className="percentage">
                    {(nOne / total) * 100}% of total votes
                  </div>
                  <div>
                    {nOne} out of {total} users picked this option!
                  </div>
                  <div className="or">... OR ...</div>

                  {selectedOption === "optionTwo" ? (
                    <div className="selected">{"    " + optionTwo}</div>
                  ) : (
                    <div className="option">{optionTwo}</div>
                  )}
                  <div className="percentage">
                    {(nTwo / total) * 100}% of total votes
                  </div>
                  <div>
                    {nTwo} out of {total} users picked this option!
                  </div>
                </div>
              ) : (
                <form className="options" onSubmit={this.handleSubmit}>
                  <input
                    id="one"
                    type="radio"
                    name="answer"
                    value={optionOne}
                  />
                  {optionOne}
                  <div className="or">... OR ...</div>
                  <input
                    id="two"
                    type="radio"
                    name="answer"
                    value={optionTwo}
                  />
                  {optionTwo}
                  <button className="submit-answer">Submit</button>
                </form>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>404 Not Found!!</div>;
    }
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const questionIds = Object.keys(questions).filter((q) => q === id);
  const f = questionIds.length > 0;
  return {
    found: f,
    question: questions[id],
    users,
    authedUser,
  };
}

export default connect(mapStateToProps)(AnsQuestion);
