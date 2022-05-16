import {Picker, View} from 'react-native';
import React, {useState} from 'react';

import QuestionContent from './root/QuestionContainer';

const QuestionSelect = props => {
  const [value, setValue] = useState(
    props.defaultValue || props.data.options.values[0],
  );

  return (
    <QuestionContent
      {...props}
      isValid={true}
      value={value}
      onNext={() => props.onNext(value)}>
      <View style={{height: 200}}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
          {props.data.options.values.map((item, index) => (
            <Picker.Item
              style={{fontSize: 18}}
              label={item}
              value={item}
              key={index}
            />
          ))}
        </Picker>
      </View>
    </QuestionContent>
  );
};

export default QuestionSelect;
