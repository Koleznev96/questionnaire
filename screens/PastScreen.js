import {Alert, FlatList, StatusBar, StyleSheet, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Title, View} from 'native-base';
import {
  loadQuestionPast,
  saveQuestionPast,
  sendAnswerNotSend,
} from '../store/actions/question';

import AppHeaderRight from '../components/app/root/AppHeaderRight';
import AppNotAuth from '../components/app/root/AppNotAuth';
import PastCard from '../components/past/PastCard';
import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';
import {connect} from 'react-redux';

const PastScreen = ({
  navigation,
  user,
  answersNotSend,
  answersSend,
  isAuthenticated,
  sendAnswerNotSend,
}) => {
  const {theme} = useContext(ThemeContext);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    navigation.setParams({
      theme: theme,
    });
  }, [theme]);

  useEffect(() => {
    let res = [];

    changeAnswer({res, data: answersNotSend, isSend: false});

    changeAnswer({res, data: answersSend, isSend: true});

    setAnswers(res.reverse());
  }, [answersNotSend, answersSend]);

  const changeAnswer = ({res, data, isSend}) => {
    for (let userId in data) {
      let answersUser = data[userId];

      for (let index in answersUser) {
        let answer = answersUser[index];

        if (!isSend || (isSend && user && userId == (user.id || user.user_id)))
          res.push({
            title: answer.title,
            answers: answer.answers,
            userId,
            questionnaireId: answer.questionnaireId,
            status: isSend,
            index: index,
          });
      }
    }
  };

  const _onSend = item => {
    sendAnswerNotSend({
      questionnaireId: item.questionnaireId,
      results: item.answers,
      userId: item.userId,
      index: item.index,
      cb: () => {
        Alert.alert('', 'Ваши ответы успешно отправлены');
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={{flex: 1}}>
        {!isAuthenticated ? (
          <View style={[styles.contentContainer, {flex: 1}]}>
            <AppNotAuth />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            {answers && answers.length > 0 ? (
              <FlatList
                contentContainerStyle={styles.contentContainer}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={answers}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.item,
                      item.length - 1 == index && {marginBottom: 100},
                    ]}
                    key={index}>
                    <PastCard
                      title={item.title}
                      status={item.status}
                      onSend={() => _onSend(item)}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => `${index}`}
              />
            ) : (
              <View style={styles.notification}>
                <Text style={{fontSize: 20}}>Здесь еще пусто!</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

PastScreen.navigationOptions = ({navigation}) => {
  return {
    headerStyle: {
      backgroundColor:
        ThemeConstants[ThemeContext._currentValue.theme].background,
    },

    headerTitle: <Title style={{color: '#fff'}}>Прошедшие</Title>,

    headerRight: (
      <View>
        <AppHeaderRight />
      </View>
    ),
  };
};

const mapStateToProps = state => ({
  domen: state.main.domen,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  questionPastData: state.question.main.questionPastData,
  answersNotSend: state.question.main.answersNotSend,
  answersSend: state.question.main.answersSend,
});

const mapDispatchToProps = dispatch => ({
  loadQuestionPast: payload => dispatch(loadQuestionPast(payload)),
  saveQuestionPast: payload => dispatch(saveQuestionPast(payload)),
  sendAnswerNotSend: payload => dispatch(sendAnswerNotSend(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PastScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },

  item: {
    width: '100%',
    marginBottom: 15,
  },

  notification: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
