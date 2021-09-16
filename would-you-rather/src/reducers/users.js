import { RECEIVE_USERS, UPDATE_USERS, USER_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USERS:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case USER_QUESTION:
      const author = action.authedUser;
      const questionID = action.qid;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(questionID),
        },
      };
    default:
      return state;
  }
}
