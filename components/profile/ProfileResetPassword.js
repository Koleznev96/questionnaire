import * as yup from 'yup';

import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';

import AppButton from '../app/root/AppButton';
import AppInput from '../app/root/AppInput';
import {Formik} from 'formik';
import ThemeConstants from '../../constants/Theme';
import {ThemeContext} from '../../context';
import {connect} from 'react-redux';
import {resetPasswordAuth} from '../../store/actions/auth';

const AuthLogin = ({
  resetPasswordAuth,
  goToHome = () => {},
  setActiveComponent = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessReset, setIsSuccessReset] = useState(false);
  const [error, setError] = useState(null);

  const {theme} = useContext(ThemeContext);

  const handleResetPassword = async ({oldPassword, newPassword, actions}) => {
    setIsLoading(true);

    resetPasswordAuth({
      oldPassword,
      newPassword,
      cb: () => {
        if (error) setError(null);
        setIsLoading(false);
        setIsSuccessReset(true);

        actions.resetForm({});

        setTimeout(() => {
          setIsSuccessReset(false);
        }, 3000);
      },
      err: error => {
        setIsLoading(false);
        setError(error);
      },
    });
  };

  const validationSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .label('Password')
      .required()
      .min(6)
      .max(20),
    newPassword: yup
      .string()
      .label('Password')
      .required()
      .min(6)
      .max(20),
  });

  return (
    <View>
      <Text style={styles.title}>Изменить пароль</Text>

      <View style={styles.container}>
        <Formik
          initialValues={{oldPassword: '', newPassword: ''}}
          onSubmit={(values, actions) => {
            handleResetPassword({
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
              actions,
            });
          }}
          validationSchema={validationSchema}>
          {formikProps => (
            <View>
              <View style={{marginBottom: 15}}>
                <AppInput
                  value={formikProps.values.oldPassword || ''}
                  placholder="Cтарый пароль"
                  onChange={formikProps.handleChange('oldPassword')}
                  onBlur={formikProps.handleBlur('oldPassword')}
                  isValid={
                    !formikProps.errors.oldPassword ||
                    !formikProps.touched.oldPassword
                  }
                  secureTextEntry
                />
              </View>

              <View style={{marginBottom: 30}}>
                <AppInput
                  value={formikProps.values.newPassword || ''}
                  placholder="Новый пароль"
                  onChange={formikProps.handleChange('newPassword')}
                  onBlur={formikProps.handleBlur('newPassword')}
                  isValid={
                    !formikProps.errors.newPassword ||
                    !formikProps.touched.newPassword
                  }
                  secureTextEntry
                />
              </View>

              <View>
                <AppButton
                  text="Сменить"
                  backgroundColor={ThemeConstants[theme].button}
                  loading={isLoading}
                  // onClick={() =>
                  //   formikProps.resetForm({oldPassword: '', newPassword: ''})
                  // }
                  onPress={formikProps.handleSubmit}
                />
              </View>

              {isSuccessReset && (
                <Text style={styles.successText}>Пароль успешно изменен</Text>
              )}

              {!!error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

AuthLogin.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  resetPasswordAuth: payload => dispatch(resetPasswordAuth(payload)),
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
    fontSize: 19,
    color: '#959595',
    fontWeight: '600',
  },

  forgotPassword: {
    textAlign: 'center',

    fontSize: 12,
    color: '#DE7676',
  },

  successText: {
    marginTop: 20,

    fontSize: 16,
    color: '#53A551',
  },

  errorText: {
    marginTop: 20,
    textAlign: 'center',

    fontSize: 16,
    color: 'red',
  },
});
