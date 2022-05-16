import React, {createRef, useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {Button, Text} from 'native-base';

import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';

const QuestionFooter = ({
  bntShow,
  isFirst,
  isLast,
  isValid,
  isNext,
  onPrev,
  onNext,
}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {!isFirst && (
        <Button
          success
          block
          style={[
            styles.btnPrev,
            {
              marginRight: isNext && bntShow ? 15 : 0,
              backgroundColor: ThemeConstants[theme].buttonLight,
            },
          ]}
          onPress={onPrev}>
          <Text style={styles.btnText}>Назад</Text>
        </Button>
      )}

      {isNext && (
        <Button
          success
          block
          style={[
            styles.btnNext,
            {
              backgroundColor: !isValid
                ? '#B5B5B5'
                : ThemeConstants[theme].button,
            },
          ]}
          disabled={!isValid}
          onPress={onNext}>
          <Text style={styles.btnText}>
            {isLast ? 'Отправить' : 'Далее'}
          </Text>
        </Button>
      )}
    </View>
  );
};

export default QuestionFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },

  btnPrev: {
    flex: 1,
    backgroundColor: '#ef9a9a',
  },

  btnNext: {
    flex: 1,
  },

  btnText: {
    fontSize: 18,
  },
});
