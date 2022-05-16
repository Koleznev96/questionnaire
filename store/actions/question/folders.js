import {
  SAVE_QUESTION_FOLDER_DATA,
  SAVE_QUESTION_FOLDER_LOADING,
} from '../../action-types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const loadFolder = () => (dispatch, getState) => {
  const {
    main: {domen},
  } = getState();

  const url = `${domen}/api/folders`;

  dispatch(saveQuestionFoldreLoading(true));

  axios
    .get(url)
    .then(res => {
      if (res.data.status) {
        dispatch(saveQuestionFoldreLoading(false));

        dispatch(saveQuestionFolderData(res.data.folders));
        AsyncStorage.setItem('folders', JSON.stringify(res.data.folders));
      }
    })
    .catch(err => {
      AsyncStorage.getItem('folders').then(data => {
        dispatch(saveQuestionFoldreLoading(false));

        if (data) {
          dispatch(saveQuestionFolderData(JSON.parse(data)));
        }
      });
    });
};

export const saveQuestionFolderData = payload => ({
  type: SAVE_QUESTION_FOLDER_DATA,
  payload,
});

export const saveQuestionFoldreLoading = payload => ({
  type: SAVE_QUESTION_FOLDER_LOADING,
  payload,
});
