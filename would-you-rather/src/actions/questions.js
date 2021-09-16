import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { userQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAnswerQuestions({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispatch(answerQuestion({ authedUser, qid, answer })))
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn("Error saving your answer: ", e);
      });
  };
}

export function handleAddQuestion({ optionOne, optionTwo }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(userQuestion({ authedUser, qid: question.id }));
      })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn("Error saving your question: ", e);
      });
  };
}
