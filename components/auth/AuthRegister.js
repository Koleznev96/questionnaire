import * as yup from 'yup';

import {Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';

import AppButton from '../app/root/AppButton';
import AppInput from '../app/root/AppInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import ThemeConstants from '../../constants/Theme';
import {connect} from 'react-redux';
import {register} from '../../store/actions/auth';

const AuthRegister = ({
  theme,
  register,
  goToHome = () => {},
  setActiveComponent = () => {},
}) => {
  let [formValues, setFormValues] = useState({email: '', password: '', re_password: '', name: '', fullName: ''});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async ({name, fullName, email, password, re_password, actions}) => {
    if (password !== re_password) {
      return setError('Пароли не совпадают')
    }
    setIsLoading(true);

    register({
      name,
      fullName,
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
        console.log('err-', error, email)
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
    name: yup
      .string()
      .label('Name')
      .required(),
    fullName: yup
      .string()
      .label('FullName')
      .required(),
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
    re_password: yup
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
          handleRegister({
            name: values.name,
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            re_password: values.re_password,
            actions,
          });
        }}
        validationSchema={validationSchema}>
        {formikProps => (
          <View>
            <View style={{marginTop: -100, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: Dimensions.get('window').width - 180}}>
              <AppInput
                placholder="Рабочая почта"
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

            <View style={{marginBottom: 15}}>
              <AppInput
                value={formikProps.values.name}
                placholder="Имя"
                onChange={formikProps.handleChange('name')}
                onBlur={formikProps.handleBlur('name')}
                isValid={
                  !formikProps.errors.name || !formikProps.touched.name
                }
              />
            </View>

            <View style={{marginBottom: 15}}>
              <AppInput
                value={formikProps.values.fullName}
                placholder="Фамилия"
                onChange={formikProps.handleChange('fullName')}
                onBlur={formikProps.handleBlur('fullName')}
                isValid={
                  !formikProps.errors.fullName || !formikProps.touched.fullName
                }
              />
            </View>

            <View style={{marginBottom: 15}}>
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

            <View style={{marginBottom: 10}}>
              <AppInput
                value={formikProps.values.re_password}
                placholder="Повторите пароль"
                onChange={formikProps.handleChange('re_password')}
                onBlur={formikProps.handleBlur('re_password')}
                isValid={
                  !formikProps.errors.re_password || !formikProps.touched.re_password
                }
                secureTextEntry
              />
            </View>

            {!!error && <Text style={{...styles.errorText}}>{error}</Text>}
            <View style={{marginBottom: 15}}>
              <AppButton
                text="Зарегистрироваться"
                round
                loading={isLoading}
                onPress={formikProps.handleSubmit}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <AppButton
                text="Назад"
                round
                onPress={() => setActiveComponent('Login')}
              />
            </View>
            

            {/*<View style={{marginBottom: 10}}>
              <AppButton
                text="Вход без пароля"
                round
                onPress={_handlerGoNoPassword}
              />
              </View>*/}
          </View>
        )}
      </Formik>

      
    </View>
  );
};

AuthRegister.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(register(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRegister);

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
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',

    fontSize: 16,
    color: 'red',
  },
});
