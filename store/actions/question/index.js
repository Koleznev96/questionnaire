import {
  SAVE_ANSWERS_DATA,
  SAVE_ANSWERS_NOT_SEND_ALL_DATA,
  SAVE_ANSWERS_NOT_SEND_DATA,
  SAVE_ANSWERS_SEND_ALL_DATA,
  SAVE_ANSWERS_SEND_DATA,
  SAVE_ANSWER_DATA,
  SAVE_ANSWER_MASS_DATA,
  SAVE_QUESTION_ALL_DATA,
  SAVE_QUESTION_DATA,
  SAVE_QUESTION_LOADING,
  SAVE_QUESTION_PAST_DATA,
  RESET_ANSWER_DATA,
} from '../../action-types';
import {getRenderItem, splitIntoFolders} from '../../../utils/question';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const loadQuestionAll = () => (dispatch, getState) => {
  const {
    main: {domen},
  } = getState();

  dispatch(saveQuestionLoading(true));

  axios
    .get(`${domen}/api/questionnaires/list/full`)
    .then(res => {
      // console.log('====================================');
      // console.log(JSON.stringify(res.data));
      // console.log('====================================');
      dispatch(saveQuestionLoading(false));

      dispatch(saveQuestionAllData(splitIntoFolders(res.data.questionnaires)));

      AsyncStorage.setItem(
        'questionData',
        JSON.stringify(res.data.questionnaires),
      );
    })
    .catch(err => {
      AsyncStorage.getItem('questionData').then(data => {
        dispatch(saveQuestionLoading(false));

        if (data) {
          dispatch(saveQuestionAllData(splitIntoFolders(JSON.parse(data))));
        }
      });
    });
};

export const loadQuestion = ({id, cb = () => {}}) => (dispatch, getState) => {
  const {
    main: {domen},
  } = getState();

  axios
    .get(`${domen}/api/folders/${id}/questionnaires`)
    .then(res => {
      dispatch(saveQuestionData({data: res.data.questionnaires, id}));

      cb(res.data.questionnaires);
    })
    .catch(err => {
      console.log(err);

      cb(err);
    });
};

export const sendAnswers = ({questionnaireId, questionName, results, cb}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
      auth: {user, token},
      question: {answers},
    } = getState();
    const userId = user && (user.id || user.user_id);
    const url = `${domen}/api/answers/save`;
    const authorization = 'Bearer ' + token;
    // console.log(JSON.stringify(results));
    axios
      .post(
        url,
        {
          user_id: userId,
          questionnaire_id: questionnaireId,
          results: JSON.stringify(results),
        },
        {
          headers: {
            Authorization: authorization,
          },
        },
      )
      .then(response => {
        if (response.data.success) {
          dispatch(
            saveAnswersSend({
              userId: userId,
              questionnaireId: questionnaireId,
              question_name: questionName,
              data: JSON.parse(JSON.stringify(results)),
            }),
          );

          cb();
        } else {
          dispatch(
            saveAnswersNotSend({
              userId: userId,
              questionnaireId: questionnaireId,
              question_name: questionName,
              data: JSON.parse(JSON.stringify(results)),
            }),
          );
        }

        dispatch(resetAnswerData(questionnaireId));
      })
      .catch(error => {
        console.warn(error);
        dispatch(
          saveAnswersNotSend({
            userId: userId,
            questionnaireId: questionnaireId,
            question_name: questionName,
            data: JSON.parse(JSON.stringify(results)),
          }),
        );

        dispatch(resetAnswerData(questionnaireId));
      });
  };
};

export const loadQuestionPast = () => {
  return (dispatch, getState) => {
    const {
      main: {domen},
      auth: {user, token},
    } = getState();

    const url = `${domen}/api/${user.id || user.user_id}/answers`;
    const authorization = 'Bearer ' + token;

    axios
      .get(url, {
        headers: {
          Authorization: authorization,
        },
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(saveQuestionPast(response.data ? response.data : []));
        }
      })
      .catch(error => {
        console.err(error);
      });
  };
};

export const sendAnswerNotSend = ({
  questionnaireId,
  results,
  userId,
  index,
  cb = () => {},
}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
      auth: {user, token},
      question: {
        main: {answersNotSend},
      },
    } = getState();

    const url = `${domen}/api/answers/save`;
    const authorization = 'Bearer ' + token;

    axios
      .post(
        url,
        {
          user_id: user.id || user.user_id,
          questionnaire_id: questionnaireId,
          results: JSON.stringify(results),
        },
        {
          headers: {
            Authorization: authorization,
          },
        },
      )
      .then(response => {
        if (response.data.success) {
          cb();

          let currentAnswersNotSend = {...answersNotSend};
          let currentAnswer = currentAnswersNotSend[userId][index];

          dispatch(
            saveAnswersSend({
              userId: user.id || user.user_id,
              questionnaireId: questionnaireId,
              question_name: currentAnswer.title,
              data: currentAnswer,
            }),
          );

          delete currentAnswersNotSend[userId][index];

          dispatch(saveAnswersNotSendAll(currentAnswersNotSend));

          AsyncStorage.setItem(
            'answersNotSend',
            JSON.stringify(currentAnswersNotSend),
          );
        }
      })
      .catch(error => {
        console.err('err', error);
      });
  };
};

export const saveQuestionAllData = payload => ({
  type: SAVE_QUESTION_ALL_DATA,
  payload,
});

export const saveQuestionData = payload => ({
  type: SAVE_QUESTION_DATA,
  payload,
});

export const saveQuestionLoading = payload => ({
  type: SAVE_QUESTION_LOADING,
  payload,
});

export const saveAnswer = payload => ({
  type: SAVE_ANSWER_DATA,
  payload,
});

export const resetAnswerData = payload => ({
  type: RESET_ANSWER_DATA,
  payload,
});

export const saveAnswerMass = payload => ({
  type: SAVE_ANSWER_MASS_DATA,
  payload,
});

export const saveAnswers = payload => ({
  type: SAVE_ANSWERS_DATA,
  payload,
});

export const saveQuestionPast = payload => ({
  type: SAVE_QUESTION_PAST_DATA,
  payload,
});

export const saveAnswersNotSend = payload => ({
  type: SAVE_ANSWERS_NOT_SEND_DATA,
  payload,
});

export const saveAnswersSend = payload => ({
  type: SAVE_ANSWERS_SEND_DATA,
  payload,
});

export const saveAnswersNotSendAll = payload => ({
  type: SAVE_ANSWERS_NOT_SEND_ALL_DATA,
  payload,
});

export const saveAnswersSendAll = payload => ({
  type: SAVE_ANSWERS_SEND_ALL_DATA,
  payload,
});
