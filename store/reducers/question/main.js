import {
  SAVE_ANSWERS_DATA,
  SAVE_ANSWERS_NOT_SEND_ALL_DATA,
  SAVE_ANSWERS_NOT_SEND_DATA,
  SAVE_ANSWERS_SEND_ALL_DATA,
  SAVE_ANSWERS_SEND_DATA,
  SAVE_ANSWER_DATA,
  RESET_ANSWER_DATA,
  SAVE_ANSWER_MASS_DATA,
  SAVE_QUESTION_ALL_DATA,
  SAVE_QUESTION_DATA,
  SAVE_QUESTION_LOADING,
  SAVE_QUESTION_PAST_DATA,
} from '../../action-types';

import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
  questionData: null,
  questionLoading: true,
  questionPastData: null,
  answers: {},
  answersNotSend: {},
  answersSend: {},
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_QUESTION_ALL_DATA:
      return {
        ...state,
        questionData: payload,
      };

    case SAVE_QUESTION_DATA:
      return {
        ...state,
        questionData: {
          ...state.questionData,
          [payload.id]: payload.data,
        },
      };

    case SAVE_QUESTION_LOADING:
      return {
        ...state,
        questionLoading: payload,
      };

    case SAVE_ANSWER_DATA:
      return {
        ...state,
        answers: {
          ...state.answers,
          [payload.questionnaireId]: {
            ...state.answers[payload.questionnaireId],
            [payload.answer.question]: payload.answer,
          },
        },
      };

    case RESET_ANSWER_DATA:
      // console.log('payload', payload);
      return {
        ...state,
        answers: {
          ...state.answers,
          [payload]: null,
        },
      };

    case SAVE_ANSWER_MASS_DATA:
      return {
        ...state,
        answers: {
          ...state.answers,
          [payload.questionnaireId]: {
            ...state.answers[payload.questionnaireId],
            ...payload.answers,
          },
        },
      };

    case SAVE_ANSWERS_DATA:
      return {
        ...state,
        answers: payload,
      };

    case SAVE_QUESTION_PAST_DATA:
      AsyncStorage.setItem('questionPast', JSON.stringify(payload));

      return {
        ...state,
        questionPastData: payload,
      };

    case SAVE_ANSWERS_NOT_SEND_ALL_DATA:
      return {
        ...state,
        answersNotSend: payload,
      };

    case SAVE_ANSWERS_SEND_ALL_DATA:
      return {
        ...state,
        answersSend: payload,
      };

    case SAVE_ANSWERS_NOT_SEND_DATA:
      let itemsNotSend =
        state.answersNotSend[payload.userId ? payload.userId : 'noAuth'] || [];

      let resNotSend = {
        ...state.answersNotSend,
        [payload.userId ? payload.userId : 'noAuth']: [
          ...itemsNotSend,
          ...[
            {
              questionnaireId: payload.questionnaireId,
              title: payload.question_name,
              answers: payload.data,
            },
          ],
        ],
      };

      AsyncStorage.setItem('answersNotSend', JSON.stringify(resNotSend));

      return {
        ...state,
        answersNotSend: resNotSend,
      };

    case SAVE_ANSWERS_SEND_DATA:
      let itemsSend = state.answersSend[payload.userId] || [];

      let resSend = {
        ...state.answersSend,
        [payload.userId]: [
          ...itemsSend,
          {
            questionnaireId: payload.questionnaireId,
            title: payload.question_name,
            answers: payload.data,
          },
        ],
      };

      // console.log(resSend);

      AsyncStorage.setItem('answersSend', JSON.stringify(resSend));

      return {
        ...state,
        answersSend: resSend,
      };
    default:
      return state;
  }
};
