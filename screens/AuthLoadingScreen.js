import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {getUserData, saveAuthToken} from '../store/actions/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';
import {connect} from 'react-redux';
import {loadQuestionPast} from '../store/actions/question';

const AuthLoadingScreen = ({navigation, token, saveAuthToken, getUserData}) => {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(value => {
      if (value) {
        saveAuthToken(value);
        getUserData({
          token: value,
          cb: status => {
            navigation.navigate(status ? 'Home' : 'Auth');
          },
        });
      } else {
        AsyncStorage.removeItem('questionPast');

        navigation.navigate('Auth');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!!token && (
        <ActivityIndicator
          size="large"
          color={ThemeConstants[theme].activityIndicator}
        />
      )}

      <StatusBar barStyle="default" />
    </View>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  getUserData: payload => dispatch(getUserData(payload)),
  saveAuthToken: payload => dispatch(saveAuthToken(payload)),
  loadQuestionPast: payload => dispatch(loadQuestionPast(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
