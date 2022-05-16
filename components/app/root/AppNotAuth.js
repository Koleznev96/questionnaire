import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppButton from './AppButton';
import {Icon} from 'native-base';
import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';
import {withNavigation} from 'react-navigation';

const AppNotAuth = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  const _login = () => {
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <Icon
        type="MaterialCommunityIcons"
        name="account-group"
        style={[styles.icon, {color: ThemeConstants[theme].text}]}
      />

      <Text style={[styles.notification, {color: ThemeConstants[theme].text}]}>
        Вам нужно войти в ваш аккаунт!
      </Text>

      <View style={styles.button}>
        <AppButton text="Войти" round onPress={() => _login()} />
      </View>
    </View>
  );
};

AppNotAuth.navigationOptions = {
  header: null,
};

export default withNavigation(AppNotAuth);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {color: '#DE7676', fontSize: 150},

  notification: {
    textAlign: 'center',

    fontSize: 20,
    color: '#DE7676',
  },

  button: {
    width: '100%',
    marginTop: 60,
  },
});
