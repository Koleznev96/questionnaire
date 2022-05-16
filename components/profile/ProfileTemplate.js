import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppButton from '../app/root/AppButton';
import AppSelect from '../app/root/AppSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeConstants from '../../constants/Theme';
import {ThemeContext} from '../../context';
import {connect} from 'react-redux';
import {login} from '../../store/actions/auth';

const AuthLogin = ({goToHome = () => {}, setActiveComponent = () => {}}) => {
  const {theme, changeTheme} = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(theme);

  const itemsSelect = [
    {label: 'Мужской', value: 'men'},
    {label: 'Женский', value: 'woman'},
  ];

  return (
    <View>
      <Text style={styles.title}>Изменить шаблон оформления</Text>

      <View style={styles.container}>
        <View style={{marginBottom: 30}}>
          <AppSelect
            items={itemsSelect}
            value={value}
            onChange={value => {
              setValue(value);
            }}
          />
        </View>

        <View>
          <AppButton
            text="Сохранить"
            backgroundColor={ThemeConstants[theme].button}
            loading={isLoading}
            onPress={() => {
              changeTheme(value);
              AsyncStorage.setItem('designTemplate', value);
            }}
          />
        </View>
      </View>
    </View>
  );
};

AuthLogin.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(login(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLogin);

const styles = StyleSheet.create({
  container: {
    padding: 15,

    flex: 1,

    borderRadius: 7,
    backgroundColor: '#fff',

    shadowColor: 'rgba(0,0,0,0.14)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 7,
  },

  title: {
    marginBottom: 15,
    fontSize: 18,
    color: '#959595',
    fontWeight: '600',
  },

  forgotPassword: {
    textAlign: 'center',

    fontSize: 12,
    color: '#DE7676',
  },
});
