import {Picker, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AppRadio from '../app/root/AppRadio';
import QuestionContent from './root/QuestionContainer';

const QuestionSelect = props => {
  const [value, setValue] = useState(props.defaultValue || 'Нет данных');

  let onSelet = data => {
    setValue(data);
  };

  return (
    <QuestionContent
      {...props}
      isValid={props.data.options.is_required ? value !== 'Нет данных' :true}
      // isValid={value.length}
      value={props.data.options.is_required?value:value?value:'Нет данных'}
      onNext={() => {
        props.onNext(value);
      }}>
      {props.data.options.values.map((item, index) => (
        <View style={styles.item} key={index}>
          <AppRadio
            light={props.isLight}
            label={item}
            defaultValue={item}
            value={value}
            onSelet={onSelet}
          />
        </View>
      ))}
    </QuestionContent>
  );
};

export default QuestionSelect;

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },
});
