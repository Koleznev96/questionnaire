import React, {useContext, useEffect, useState} from 'react';
import {Title, View} from 'native-base';
import {StatusBar, StyleSheet, Text, Linking, Alert, Platform} from 'react-native';
import {
  loadFolder,
  saveQuestionFolderData,
} from '../store/actions/question/folders';
import {
  loadQuestionAll,
  loadQuestionPast,
  saveAnswers,
  saveAnswersNotSendAll,
  saveAnswersSendAll,
} from '../store/actions/question';

import AppCardList from '../components/app/root/AppCardList';
import AppHeaderRight from '../components/app/root/AppHeaderRight';
import AppQuestionCard from '../components/app/root/AppQuestionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';
import {connect} from 'react-redux';

import {getRenderItem} from '../utils/question';
import { version } from '../const';

const HomeScreen = ({
  navigation,
  user,
  token,
  foldersData,
  foldersLoading,
  questionLoading,
  loadQuestionAll,
  saveAnswersNotSendAll,
  saveAnswersSendAll,
  loadFolder,
}) => {
  const [renderFolder, setRenderFolder] = useState([]);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    AsyncStorage.getItem('answersNotSend').then(data => {
      if (data) {
        saveAnswersNotSendAll(JSON.parse(data));
      }
    });

    AsyncStorage.getItem('answersSend').then(data => {
      if (data) {
        saveAnswersSendAll(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    if (foldersData) {
      setRenderFolder(getRenderItem({data: foldersData, user, token}));
    }
  }, [foldersData]);

  useEffect(() => {
    navigation.setParams({
      theme: theme,
    });
  }, [theme]);

  checkVersion = (item) => {
    // check version - rootVersion
    const url_get = Platform.OS === 'ios' ? 'https://sales.ursosan.ru/download/vers.txt' : 'https://sales.ursosan.ru/download/vers1.txt';
    fetch(url_get, { headers: {
      'Cache-Control': 'no-cache'
    }})
    .then((response) => response.text())
    .then((json) => {
      let url_upoad = Platform.OS === 'ios' ? 'https://sales.ursosan.ru/download' : 'https://sales.ursosan.ru/download/promedcs.apk';
      // Update version 09.07.22
      if (json != version[Platform.OS]) {
        Alert.alert(
          'Внимание',
          'Чтобы пользоваться приложением, необходимо скачать обновление!',
          [
            {
              text: 'Скачать',
              onPress: () => Linking.openURL(url_upoad),
            },
          ],
        );
      } else {
        navigation.navigate('PollList', {
          folderName: item.name,
          folderId: item.id,
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });

  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AppCardList
        data={renderFolder}
        loading={foldersLoading}
        renderItem={item => (
          <View>
            <AppQuestionCard
              imageUrl={`https://sales.ursosan.ru/${item.icon}`}
              title={item.name}
              loading={questionLoading}
              onOpen={() => {
                checkVersion(item);
              }}
            />
          </View>
        )}
        onRefresh={() => {
          loadFolder();

          loadQuestionAll();
        }}
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({navigation}) => {
  return {
    headerTintColor: 'white',

    headerBackTitle: 'Назад',

    headerStyle: {
      backgroundColor:
        ThemeConstants[ThemeContext._currentValue.theme].background,
    },

    headerTitle: <Title style={{color: '#fff'}}>Папки</Title>,

    headerRight: (
      <View>
        <AppHeaderRight />
      </View>
    ),
  };
};

const mapStateToProps = state => ({
  domen: state.main.domen,
  token: state.auth.token,
  user: state.auth.user,
  isAuthenticated: state.auth.user,
  answers: state.question.main.answers,
  questionData: state.question.main.questionData,
  questionLoading: state.question.main.questionLoading,
  foldersData: state.question.folders.foldersData,
  foldersLoading: state.question.folders.foldersLoading,
});

const mapDispatchToProps = dispatch => ({
  saveAnswers: payload => dispatch(saveAnswers(payload)),
  saveAnswersNotSendAll: payload => dispatch(saveAnswersNotSendAll(payload)),
  saveAnswersSendAll: payload => dispatch(saveAnswersSendAll(payload)),
  saveQuestionFolderData: payload => dispatch(saveQuestionFolderData(payload)),
  loadQuestionAll: payload => dispatch(loadQuestionAll(payload)),
  loadFolder: payload => dispatch(loadFolder(payload)),
  loadQuestionPast: payload => dispatch(loadQuestionPast(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
