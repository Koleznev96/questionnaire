import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import QuestionContent from './root/QuestionContainer';

import Text from '../Text';

import AppInput from '../app/root/AppInput';
import AppSelectCity from '../app/root/AppSelectCity';

import {Formik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  index: yup
    .number()
    .required()
    .min(6),
  city: yup.string().required(),
  address: yup
    .string()
    .required()
    .min(2),
});

const QuestionAddress = props => {
  return (
    <Formik
      initialValues={{
        index: props.defaultValue ? props.defaultValue.index : null,
        city: props.defaultValue ? props.defaultValue.city : null,
        address: props.defaultValue ? props.defaultValue.address : null,
      }}
      onSubmit={(values, actions) => {
        props.onNext(values);
      }}
      validationSchema={validationSchema}>
      {formikProps => (
        <QuestionContent
          {...props}
          isValid={!Object.keys(formikProps.errors).length}
          value={props.values}
          onNext={formikProps.submitForm}>
          <View style={styles.item}>
            <Text style={styles.lable} light={props.isLight}>
              Индекс
            </Text>

            <AppInput
              style={styles.input}
              keyboardType="numeric"
              value={formikProps.values.index}
              placholder="324325"
              onChange={formikProps.handleChange('index')}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.lable} light={props.isLight}>
              Город
            </Text>

            <AppSelectCity
              value={formikProps.values.city}
              onChange={formikProps.handleChange('city')}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.lable} light={props.isLight}>
              Адресс
            </Text>

            <AppInput
              style={styles.input}
              value={formikProps.values.address}
              placholder="Пушкина 2"
              onChange={formikProps.handleChange('address')}
            />
          </View>
        </QuestionContent>
      )}
    </Formik>
  );
};

export default QuestionAddress;

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },

  lable: {
    marginBottom: 5,
    fontSize: 16,
  },

  input: {
    fontSize: 18,
  },
});
