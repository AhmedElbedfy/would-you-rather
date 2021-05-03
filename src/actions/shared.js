import { getInitialData } from '../utils/api';
import { addQuestion, receiveQuestions, saveAnswer } from './questions';
import { addUserQuestion, saveUserAnswer, receiveUsers } from './users';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';

export default function handleInitialData(userId) {
    return dispatch => {
        dispatch(showLoading());
        return getInitialData().then(({ users, questions }) => {
            dispatch(setAuthedUser(userId ? userId : null));
            dispatch(receiveQuestions(questions));
            dispatch(receiveUsers(users));
            dispatch(hideLoading());
        });
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(addUserQuestion(authedUser, question.id));
            });

    };
}

export function handleAnswer(questionID, option) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        const info = {
            authedUser: authedUser,
            qid: questionID,
            answer: option
        };
        _saveQuestionAnswer(info)
            .then(() => {
                dispatch(saveAnswer(authedUser, questionID, option));
                dispatch(saveUserAnswer(authedUser, questionID, option));
            });
    };
}