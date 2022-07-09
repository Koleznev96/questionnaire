import * as Animatable from 'react-native-animatable';

import {Dimensions, ScrollView, StyleSheet, View, Alert, Linking, Platform} from 'react-native';
import React, {useContext, useState} from 'react';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';

import AuthLogin from '../components/auth/AuthLogin';
import AuthResetPassword from '../components/auth/AuthResetPassword';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';
import AuthRegister from '../components/auth/AuthRegister';

const {height} = Dimensions.get('window');

export default function LoginScreen({navigation}) {
  const [activeComponent, setActiveComponent] = useState('Login');

  const {theme} = useContext(ThemeContext);

  goToHome = () => {
    // check version - rootVersion
    fetch('https://sales.ursosan.ru/download/vers.txt', { headers: {
      'Cache-Control': 'no-cache'
    }})
    .then((response) => response.text())
    .then((json) => {
      let url_upoad = Platform.OS === 'ios' ? 'https://sales.ursosan.ru/download' : 'https://sales.ursosan.ru/download/promedcs.apk';
      console.warn(json);
      // Update version 09.07.22
      if (json != '8') {
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
        navigation.navigate('Home');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={[styles.imageContainer]}>
              <Icon
                type="MaterialCommunityIcons"
                name="account-group"
                style={[styles.icon, {color: ThemeConstants[theme].text}]}
              />
            </View>

            <View style={styles.formContainer}>
              {activeComponent === 'Login' ? (
                <Animatable.View
                  style={{flex: 1}}
                  animation="fadeInRight"
                  duration={500}
                  useNativeDriver={true}>
                  <AuthLogin
                    theme={theme}
                    goToHome={() => goToHome()}
                    setActiveComponent={value => setActiveComponent(value)}
                  />
                </Animatable.View>
              ) : ( activeComponent === 'Register' ? (
                <Animatable.View
                  style={{flex: 1}}
                  animation="fadeInLeft"
                  duration={500}
                  useNativeDriver={true}>
                  <AuthRegister
                    theme={theme}
                    goToHome={() => goToHome()}
                    setActiveComponent={value => setActiveComponent(value)}
                  />
                </Animatable.View>
              ) : (
                <Animatable.View
                  style={{flex: 1}}
                  animation="fadeInLeft"
                  duration={500}
                  useNativeDriver={true}>
                  <AuthResetPassword
                    theme={theme}
                    setActiveComponent={value => setActiveComponent(value)}
                  />
                </Animatable.View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    minHeight: height,
    paddingTop: ifIphoneX
      ? getStatusBarHeight() + 20
      : getStatusBarHeight() + 15,

    flex: 1,
  },

  icon: {color: '#DE7676', fontSize: 150},

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    width: '100%',
    height: '48%',
    paddingHorizontal: 25,
  },

  forgotPassword: {
    textAlign: 'center',

    fontSize: 12,
    color: '#DE7676',
  },
});
