import {
  SAVE_QUESTION_FOLDER_DATA,
  SAVE_QUESTION_FOLDER_LOADING,
} from '../../action-types';

const INITIAL_STATE = {
  foldersData: null,
  foldersLoading: true,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_QUESTION_FOLDER_DATA:
      return {
        ...state,
        foldersData: payload,
      };

    case SAVE_QUESTION_FOLDER_LOADING:
      return {
        ...state,
        foldersLoading: payload,
      };

    default:
      return state;
  }
};
