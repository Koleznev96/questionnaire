import * as yup from 'yup';

import React, {createRef, useContext} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Formik} from 'formik';
import QuestionContent from './root/QuestionContainer';
import ThemeConstants from '../../constants/Theme';
import {ThemeContext} from '../../context';

const keyboardTypes = {
  default: 'default',
  phone: 'phone-pad',
  email: 'email-address',
  numerical: 'numeric',
};

const QuestionInput = props => {
  const {theme} = useContext(ThemeContext);

  const typeSchema =
    !!props.data &&
    props.data.validation &&
    props.data.validation !== '' &&
    props.data.validation !== '0' &&
    props.data.validation !== 0
      ? props.data.options && props.data.options.is_required? props.data.validation: 'default1'
      : 'default';

  const validations = {
    default1: yup.string().test('last_name', 'Last Name test message', function(value) {
      return true;
    }),
    default: yup.string(),
    email: yup
      .string()
      .label('Email')
      .email()
      .required(),
    phone: yup
      .number()
      .label('Phone')
      .required()
      .min(10),
    numerical: yup
      .number()
      .label('numerical')
      .required(),
  };

  const validationSchema = yup.object().shape({
    [typeSchema]: validations[typeSchema],
  });

  return (
    <Formik
      initialValues={{
        [typeSchema]: props.defaultValue,
      }}
      validateOnMount={props.validateOnMount}
      validationSchema={validationSchema}>
      {formikProps => (
        <QuestionContent
          {...props}
          onNext={() => props.onNext(formikProps.values[typeSchema])}
          value={props.data.options.is_required? formikProps.values[typeSchema]:formikProps.values[typeSchema]?formikProps.values[typeSchema]: ' '}
          isValid={
            (!formikProps.errors[typeSchema] && formikProps.values[typeSchema])||(!props.data.options.is_required)
          }>
          <TextInput
            placeholder="Введите свой ответ"
            value={formikProps.values[typeSchema]}
            multiline={props.multiline}
            numberOfLines={props.multiline ? 4 : 1}
            keyboardType={keyboardTypes[typeSchema]}
            onChangeText={formikProps.handleChange(typeSchema)}
            placeholderTextColor={
              props.isLight ? 'rgba(255,255,255, 0.7)' : null
            }
            onBlur={formikProps.handleBlur(typeSchema)}
            style={[
              StyleSheet.flatten(styles.input(props.isLight)),
              {
                height: props.multiline ? 90 : 50,
                borderBottomColor: ThemeConstants[theme].borderColor,
              },
            ]}
          />
        </QuestionContent>
      )}
    </Formik>
  );
};

export default QuestionInput;

const styles = StyleSheet.create({
  input: light => ({
    borderBottomColor: '#ee6e73',
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 15,
    fontSize: 18,
    color: light ? 'rgba(255,255,255, 0.8)' : '#000',
  }),
});
