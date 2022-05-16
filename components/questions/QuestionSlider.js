import React, {useState} from 'react';
import {View} from 'native-base';

import Text from '../Text';

import QuestionContent from './root/QuestionContainer';
import Slider from '@react-native-community/slider';
import {StyleSheet} from 'react-native';

const QuestionInput = props => {
  const [value, setValue] = useState(
    props.defaultValue || +props.data.options.min || 0,
  );

  return (
    <QuestionContent
      {...props}
      isValid={true}
      value={value}
      onNext={() => props.onNext(value)}>
      <View style={styles.header}>
        <Text style={styles.headerText} light={props.isLight}>
          {props.data.options.min}
        </Text>
        <Text style={styles.headerText} light={props.isLight}>
          {props.data.options.max}
        </Text>
      </View>
      <Slider
        style={{width: '100%', height: 40}}
        value={value}
        onValueChange={setValue}
        step={1}
        minimumValue={+props.data.options.min || 0}
        maximumValue={+props.data.options.max}
        minimumTrackTintColor="#DF7676"
      />

      <Text style={StyleSheet.flatten(styles.textResult(props.isLight))}>
        Результат: {value}
      </Text>
    </QuestionContent>
  );
};

export default QuestionInput;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },

  headerText: {
    fontSize: 15,
  },

  textResult: light => ({
    marginTop: 10,
    color: light ? '#fff' : '#5BB4A9',

    fontSize: 17,
  }),
});
