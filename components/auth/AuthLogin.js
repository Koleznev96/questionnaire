import * as yup from 'yup';

import {Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';

import AppButton from '../app/root/AppButton';
import AppInput from '../app/root/AppInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import ThemeConstants from '../../constants/Theme';
import {connect} from 'react-redux';
import {login} from '../../store/actions/auth';

const AuthLogin = ({
  theme,
  login,
  goToHome = () => {},
  setActiveComponent = () => {},
}) => {
  let [formValues, setFormValues] = useState({email: '', password: ''});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userLogin').then(value => {
      if (value) {
        setFormValues({...formValues, email: value});
      }
    });
  }, []);

  const handleLogin = async ({email, password, actions}) => {
    setIsLoading(true);

    login({
      email: email + '@promedcs.com',
      password,
      cb: () => {
        AsyncStorage.setItem('userLogin', email);

        setIsLoading(false);

        goToHome();

        if (error) {
          setError(null);
        }
      },
      err: error => {
        setIsLoading(false);

        setError(error);
      },

      errNetwork: error => {
        if (error) setError(null);

        setIsLoading(false);

        Alert.alert('Упсс!', 'Отсуствует интернет подключение', [
          {text: 'Вход без пароля', onPress: _handlerGoNoPassword},
        ]);
      },
    });
  };

  const _handlerGoNoPassword = () => {
    goToHome();
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(4)
      .max(20),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          handleLogin({
            email: values.email,
            password: values.password,
            actions,
          });
        }}
        validationSchema={validationSchema}>
        {formikProps => (
          <View>
            <View style={{marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: Dimensions.get('window').width - 180}}>
              <AppInput
                // style={{color: '#000'}}
                placholder="Почта"
                value={formikProps.values.email}
                onChange={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
                isValid={
                  !formikProps.errors.email || !formikProps.touched.email
                }
              />
              </View>
              <View style={{
                width: 110,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: '100%',
                borderBottomWidth: 1,
                // borderLeftWidth: 2,
                borderColor: ThemeConstants[theme].borderColor
              }}
              >
              <Text
                style={{
                  fontSize: 13,
                  color: ThemeConstants[theme].text,
                  
                }}>
                  @promedcs.com
              </Text>
              </View>
            </View>

            <View style={{marginBottom: 40}}>
              <AppInput
                value={formikProps.values.password}
                placholder="Пароль"
                onChange={formikProps.handleChange('password')}
                onBlur={formikProps.handleBlur('password')}
                isValid={
                  !formikProps.errors.password || !formikProps.touched.password
                }
                secureTextEntry
              />
            </View>

            <View style={{marginBottom: 15}}>
              <AppButton
                text="Войти"
                round
                loading={isLoading}
                onPress={formikProps.handleSubmit}
              />
            </View>
            <View style={{marginBottom: 6}}>
              <AppButton
                text="Зарегистрироваться"
                round
                onPress={() => setActiveComponent('Register')}
              />
            </View>

            {/*<View style={{marginBottom: 10}}>
              <AppButton
                text="Вход без пароля"
                round
                onPress={_handlerGoNoPassword}
              />
              </View>*/}

            <TouchableOpacity
              onPress={() => setActiveComponent('ResetPassword')}
              style={{paddingTop: 9, paddingBottom: 25}}
            >
              <Text
                style={[
                  styles.forgotPassword,
                  {color: ThemeConstants[theme].text},
                ]}>
                Забыли пароль?
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
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
    flex: 1,
  },

  forgotPassword: {
    textAlign: 'center',

    fontSize: 12,
    // color: '#DE7676',
  },

  errorText: {
    marginTop: 50,
    textAlign: 'center',

    fontSize: 16,
    color: 'red',
  },
});
