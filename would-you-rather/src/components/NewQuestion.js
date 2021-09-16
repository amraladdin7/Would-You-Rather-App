import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleOne = (e) => {
    e.preventDefault();
    const optionOne = e.target.value;
    this.setState({
      ...this.state,
      optionOne,
    });
  };

  handleTwo = (e) => {
    e.preventDefault();
    const optionTwo = e.target.value;
    this.setState({
      ...this.state,
      optionTwo,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { optionOne, optionTwo } = this.state;
    dispatch(handleAddQuestion({ optionOne, optionTwo }));
    this.setState({
      ...this.state,
      toHome: true,
    });
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    if (toHome) {
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <div className="center-container">
          <div className="new-head">
            <h1>Create a New Question</h1>
          </div>
        </div>
        <div className="center-container">
          <div className="create">
            <div>
              <h2>Would you rather...</h2>
            </div>
            <form className="options-new" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter option one!"
                onChange={this.handleOne}
                value={optionOne}
                className="new"
              />
              <div className="or">... OR ...</div>
              <input
                type="text"
                placeholder="Enter option two!"
                onChange={this.handleTwo}
                value={optionTwo}
                className="new"
              />
              <button
                className="new-question"
                disabled={optionOne === "" || optionTwo === ""}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(authedUser) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
