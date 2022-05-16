import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Badge, Icon, Text} from 'native-base';
import React, {useContext} from 'react';
import {
  saveQuestionPast,
  sendAnswerNotSend,
} from '../../../store/actions/question';

import {ThemeContext} from '../../../context';
import {connect} from 'react-redux';
import {deleteAuthUserData} from '../../../store/actions/auth';
import {withNavigation} from 'react-navigation';

const AppHeaderRight = ({
  navigation,
  user,
  isAuthenticated,
  answersNotSend,
  deleteAuthUserData,
  sendAnswerNotSend,
  saveQuestionPast,
}) => {
  const {theme} = useContext(ThemeContext);

  const _login = () => {
    navigation.navigate('Auth');
  };

  const _logout = () => {
    deleteAuthUserData();
    saveQuestionPast([]);

    navigation.navigate('Auth');
  };

  const _handlerSendData = () => {
    if (isAuthenticated)
      Alert.alert(
        '',
        'У вас накопились пройденные опросы, попробовать отправить на проверку?',
        [
          {
            text: 'Отменить',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Отправить',
            onPress: () => {
              // console.log('Отправить');
              // console.log(user);
              let userId = user.id || user.user_id;

              if (answersNotSend[userId])
                for (let index in answersNotSend[userId]) {
                  let item = answersNotSend[userId][index];

                  sendAnswerNotSend({
                    questionnaireId: item.questionnaireId,
                    results: item.answers,
                    userId: userId,
                    index: index,
                  });
                }

              if (answersNotSend['noAuth']) {
                for (let index in answersNotSend['noAuth']) {
                  let item = answersNotSend['noAuth'][index];

                  sendAnswerNotSend({
                    questionnaireId: item.questionnaireId,
                    results: item.answers,
                    userId: 'noAuth',
                    index: index,
                  });
                }
              }
            },
          },
        ],
      );
    else handleAlertNoAuth();
  };

  const handleAlertNoAuth = () => {
    Alert.alert(
      '',
      'Чтобы отправить анкету на сервер вам нужно войти в свой профиль',
      [
        {
          text: 'Отменить',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Войти',
          onPress: () => {
            navigation.navigate('Auth');
          },
        },
      ],
    );
  };

  const _getCountNotSend = () => {
    let count = 0;

    if (answersNotSend) {
      if (user && answersNotSend[user.id])
        count = Object.values(answersNotSend[user.id]).length;

      if (answersNotSend['noAuth']) {
        count += Object.values(answersNotSend['noAuth']).length;
      }
    }

    return count;
  };

  return (
    <View style={[styles.container]}>
      {_getCountNotSend() != 0 && (
        <TouchableOpacity style={styles.badge} onPress={_handlerSendData}>
          <Badge info={theme == 'men'}>
            <Text>{_getCountNotSend()}</Text>
          </Badge>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => (isAuthenticated ? _logout() : _login())}>
        <Icon
          style={[styles.icon]}
          type="Entypo"
          name={isAuthenticated ? 'log-out' : 'login'}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  answersNotSend: state.question.main.answersNotSend,
});

const mapDispatchToProps = dispatch => ({
  deleteAuthUserData: payload => dispatch(deleteAuthUserData(payload)),
  sendAnswerNotSend: payload => dispatch(sendAnswerNotSend(payload)),
  saveQuestionPast: payload => dispatch(saveQuestionPast(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(AppHeaderRight));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    paddingHorizontal: 16,

    fontWeight: '900',
    fontSize: 18,
    color: '#fff',
  },

  badge: {
    marginRight: 5,
  },
});
