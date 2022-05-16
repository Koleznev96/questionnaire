import React, {memo, useEffect, useState, useMemo} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import AppInputNumber from '../app/root/AppInputNumber';

import QuestionContent from './root/QuestionContainer';

const QuestionInput = props => {
  const [res, setRes] = useState({});
  //  props.data.options.values.map(() => 0),
  // );
  const [countSelected, setCountSelected] = useState(0);

  const countPoints = useMemo(() => {
    if (props.data.options && props.data.options.distribute_points) {
      return +props.data.options.distribute_points;
    }

    return null;
  }, [props.data]);

  useEffect(() => {
    // props.defaultValue

    let initValue = {};
    if (props.defaultValue) {
      props.defaultValue.forEach(item => {
        const items = item.split(' - ');

        initValue[items[0]] = +items[1];
      });
    } else {
      props.data.options.values.forEach(item => (initValue[item] = 0));
    }

    setRes(initValue);
  }, []);

  useEffect(() => {
    let count = 0;

    Object.values(res).forEach(item => (count += item));

    setCountSelected(count);
  }, [res, props.defaultValue]);

  const _handlerChange = ({value, item}) => {
    // let _res = { ...res, [item]: value};
    setRes({...res, [item]: value});
  };

  return (
    <QuestionContent
      {...props}
      isValid={
        (countPoints === 1 && countSelected > 0) ||
        (countPoints ? countSelected === countPoints : true)
      }
      value={res}
      onNext={() => {
        const items = Object.keys(res).map(key => {
          const value = res[key];

          return `${key} - ${value}`;
        });

        // console.log(items);

        props.onNext(items);
      }}>
      {/* <Text>{JSON.stringify(props.data.options.distribute_points)}</Text> */}
      {props.data.options.values.map((item, index) => (
        <View style={styles.item} key={index}>
          <AppInputNumber
            lable={item}
            value={res[item]}
            light={props.isLight}
            min={0}
            max={countPoints !== 1 && countPoints - countSelected + res[item]}
            onChange={value => _handlerChange({value, item})}
          />
        </View>
      ))}

      <Text style={styles.result}>
        Итого: {countSelected}{' '}
        {countPoints !== 1 && <Text>из {countPoints}</Text>}
      </Text>
    </QuestionContent>
  );
};

export default QuestionInput;

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },

  result: {
    fontSize: 19,
    textAlign: 'right',
  },
});
