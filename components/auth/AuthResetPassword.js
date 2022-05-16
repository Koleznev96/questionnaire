import * as yup from 'yup';

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import AppButton from '../app/root/AppButton';
import AppInput from '../app/root/AppInput';
import {Formik} from 'formik';
import {Icon} from 'native-base';
import ThemeConstants from '../../constants/Theme';
import {connect} from 'react-redux';
import {resetPassword} from '../../store/actions/auth';

const AuthResetPassword = ({
  theme,
  resetPassword,
  setActiveComponent = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessReset, setIsSuccessReset] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async ({email, actions}) => {
    setIsLoading(true);

    resetPassword({
      email,
      cb: () => {
        if (error) setError(null);
        setIsLoading(false);
        setIsSuccessReset(true);

        setTimeout(() => {
          setActiveComponent('Login');
        }, 2000);
      },
      err: error => {
        setIsLoading(false);

        setError(error);
      },
    });
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email()
      .required(),
  });

  return (
    <View style={styles.container}>
      {!isSuccessReset ? (
        <Formik
          initialValues={{email: ''}}
          onSubmit={(values, actions) => {
            handleResetPassword({
              email: values.email,
              actions,
            });
          }}
          validationSchema={validationSchema}>
          {formikProps => (
            <View>
              <View style={{marginBottom: 40}}>
                <AppInput
                  placholder="Почта"
                  onChange={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                  isValid={
                    !formikProps.errors.email || !formikProps.touched.email
                  }
                />
              </View>

              <View style={{marginBottom: 12}}>
                <AppButton
                  text="Востановить пароль"
                  round
                  loading={isLoading}
                  onPress={formikProps.handleSubmit}
                />
              </View>

              <TouchableOpacity
                style={styles.back}
                onPress={() => setActiveComponent('Login')}>
                <Icon type="AntDesign" name="left" style={styles.backIcon} />

                <Text
                  style={[
                    styles.forgotPassword,
                    {color: ThemeConstants[theme].text},
                  ]}>
                  Вернуться назад
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      ) : (
        <Text style={styles.successText}>
          Вам отправлено письмо с новым паролем.
        </Text>
      )}

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

AuthResetPassword.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  resetPassword: payload => dispatch(resetPassword(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthResetPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  forgotPassword: {
    marginLeft: 5,

    textAlign: 'center',

    fontSize: 12,
    lineHeight: 12,
    color: '#DE7676',
  },

  successText: {
    marginTop: 50,
    textAlign: 'center',

    fontSize: 16,
    color: '#53A551',
  },

  errorText: {
    marginTop: 50,
    textAlign: 'center',

    fontSize: 16,
    color: 'red',
  },

  back: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 12,
    color: '#DE7676',
  },
});
