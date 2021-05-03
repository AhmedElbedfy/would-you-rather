export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    };
}

export function addUserQuestion(authedUser, questionID) {
    return {
        type: ADD_USER_QUESTION,
        authedUser,
        questionID
    };
}

export function saveUserAnswer(auth, questionID, option) {
    return {
        type: USER_ANSWER_QUESTION,
        auth,
        questionID,
        option
    };
}