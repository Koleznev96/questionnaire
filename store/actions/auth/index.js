import {
  DELETE_AUTH_USER_DATA,
  SAVE_AUTH_TOKEN,
  SAVE_AUTH_USER_DATA,
} from '../../action-types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const register = ({name, fullName, email, password, cb, err = () => {}}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
    } = getState();

    const url = `${domen}/api/register`;

    axios
      .post(url, {first_name: name, last_name: fullName, email, password})
      .then(response => {
        if (response.data && response.data.status) {
          dispatch(saveAuthToken(response.data.token));
          dispatch(saveAuthUserData(response.data));

          AsyncStorage.setItem('userToken', response.data.token);

          cb();
        } else {
          err(
            'Такой логин уже занят.',
          );
        }
      })
      .catch(e => {
        if (e.response) {
          err(
            'Такой логин уже занят.',
          );
        } else err('Упсс! Отсуствует интернет подключение');
      });
  };
};

export const login = ({email, password, cb, err = () => {}}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
    } = getState();

    const url = `${domen}/api/login`;

    axios
      .post(url, {email, password})
      .then(response => {
        if (response.data && response.data.status) {
          dispatch(saveAuthToken(response.data.token));
          dispatch(saveAuthUserData(response.data));

          AsyncStorage.setItem('userToken', response.data.token);

          cb();
        } else {
          err(
            'Нам не удалось найти данного пользователя. Проверьте логин или пароль.',
          );
        }
      })
      .catch(e => {
        if (e.response) {
          err(
            'Нам не удалось найти данного пользователя. Проверьте логин или пароль.',
          );
        } else err('Упсс! Отсуствует интернет подключение');
      });
  };
};

export const resetPassword = ({email, cb, err}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
    } = getState();

    const url = `${domen}/api/resetpass`;

    axios
      .post(url, {email})
      .then(response => {
        if (response.status === 200) {
          cb();
        }
      })
      .catch(error => {
        err('Нам не удалось найти данного пользователя. Проверьте логин.');
      });
  };
};

export const resetPasswordAuth = ({oldPassword, newPassword, cb, err}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
      auth: {token},
    } = getState();

    const url = `${domen}/api/password/change`;
    const authorization = 'Bearer ' + token;

    axios
      .post(
        url,
        {old_password: oldPassword, new_password: newPassword},
        {
          headers: {
            Authorization: authorization,
          },
        },
      )
      .then(response => {
        if (response.data.status) {
          dispatch(saveAuthToken(response.data.token));

          AsyncStorage.setItem('userToken', response.data.token);

          cb();
        } else {
          err('Старый пароль не верный. Проверьте и попробуйте еще раз.');
        }
      })
      .catch(error => {
        err('Старый пароль не верный. Проверьте и попробуйте еще раз.');
      });
  };
};

export const getUserData = ({token, cb}) => {
  return (dispatch, getState) => {
    const {
      main: {domen},
    } = getState();

    const url = `${domen}/api/users/${token}`;

    axios
      .get(url)
      .then(response => {
        if (response.data && response.data.status) {
          dispatch(saveAuthUserData(response.data.user));
          cb(true);
        } else {
          cb(false);
        }
      })
      .catch(err => {
        cb(false);
      });
  };
};

const saveAuthToken = payload => ({
  type: SAVE_AUTH_TOKEN,
  payload,
});

const saveAuthUserData = payload => ({
  type: SAVE_AUTH_USER_DATA,
  payload,
});

const deleteAuthUserData = payload => {
  AsyncStorage.removeItem('userToken');
  AsyncStorage.removeItem('questionPast');

  return {
    type: DELETE_AUTH_USER_DATA,
    payload,
  };
};

export {saveAuthToken, saveAuthUserData, deleteAuthUserData};
