import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    selectedTab: "Unanswered",
  };
  handleClick = (e, n) => {
    const buttons = document.getElementsByClassName("tab-link");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = "tab-link";
    }
    if (n === 1) {
      this.setState({
        selectedTab: "Unanswered",
      });
    } else {
      this.setState({
        selectedTab: "Answered",
      });
    }
    e.target.className += " active";
  };
  render() {
    const { selectedTab } = this.state;
    return (
      <div>
        <div className="center-container">
          <div className="tab">
            <button
              className="tab-link active"
              onClick={(e) => this.handleClick(e, 1)}
            >
              Unanswered Questions
            </button>
            <button
              className="tab-link"
              onClick={(e) => this.handleClick(e, 2)}
            >
              Answered Questions
            </button>
          </div>
        </div>
        <div className="center-container">
          <ul className="questions-list">
            {selectedTab === "Unanswered" &&
              this.props.unansQuestionIds.map((id) => (
                <li key={id}>
                  <Question id={id} ans={false} />
                </li>
              ))}
            {selectedTab === "Answered" &&
              this.props.ansQuestionIds.map((id) => (
                <li key={id}>
                  <Question id={id} ans={true} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  let flag = false;
  const keys = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const ans = {};
  const unAns = {};
  keys.forEach((key) => {
    const votes = questions[key].optionOne.votes.concat(
      questions[key].optionTwo.votes
    );
    votes.forEach((vote) => {
      if (vote === authedUser) {
        ans[key] = questions[key];
        flag = true;
      }
    });
    if (!flag) {
      unAns[key] = questions[key];
    } else {
      flag = false;
    }
  });
  return {
    ansQuestionIds: Object.keys(ans),
    unansQuestionIds: Object.keys(unAns),
  };
}

export default connect(mapStateToProps)(Home);
