import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AppConfetti from '../../app/root/AppConfetti';

const QuestionCongratulations = ({onStart = () => {}, onEnd = () => {}}) => {
  useEffect(() => {
    onStart();

    const timeout = setTimeout(onEnd, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <AppConfetti />
      <View style={styles.content}>
        <Text style={styles.title}>Опрос завершен</Text>
        <Text style={styles.desctiption}>
          Спасибо, Ваши результаты приняты!
        </Text>
      </View>
    </View>
  );
};

export default QuestionCongratulations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginBottom: 7,
    fontWeight: '700',
    fontSize: 30,
  },

  desctiption: {
    fontSize: 17,
  },
});
