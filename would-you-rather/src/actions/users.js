export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USERS = "UPDATE_USERS";
export const USER_QUESTION = "USER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateUsers({ authedUser, qid, answer }) {
  return {
    type: UPDATE_USERS,
    authedUser,
    qid,
    answer,
  };
}

export function userQuestion({ authedUser, qid }) {
  return {
    type: USER_QUESTION,
    authedUser,
    qid,
  };
}
