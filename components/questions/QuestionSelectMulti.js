import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import AppCheckbox from '../app/root/AppCheckbox';
import QuestionContent from './root/QuestionContainer';

const QuestionSelect = props => {
  const [value, setValue] = useState(props.defaultValue || []);

  let onSelet = data => {
    setValue(data);
  };

  return (
    <QuestionContent
      {...props}
      isValid={value.length}
      value={value}
      onNext={() => {
        props.onNext(value);
      }}>
      <View
        style={{
          paddingBottom: 70,
        }}>
        {props.data.options.values.map((item, index) => (
          <View style={styles.item} key={index}>
            <AppCheckbox
              light={props.isLight}
              label={item}
              defaultValue={item}
              value={value}
              onSelet={onSelet}
            />
          </View>
        ))}
      </View>
    </QuestionContent>
  );
};

export default QuestionSelect;

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },
});
