import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';

import AppFeedback from './AppFeedback';
import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';

export default ({
  text,
  height = 44,
  fontSize = 16,
  textColor = '#fff',
  backgroundColor = '#2c3f94',
  loading = false,
  onPress = () => {},
  style = {},
  styleText = {},
  round = false,
  disabled = false,
  customStyle = {},
}) => {
  const {theme} = useContext(ThemeContext);

  const _styleRound = {};
  const _styleRoundText = {};

  if (round) {
    _styleRound.backgroundColor = 'transparent';
    _styleRound.borderWidth = 1;
    _styleRoundText.color = ThemeConstants[theme].text;
  }

  return (
    <AppFeedback
      onPress={() => !disabled && onPress()}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          height: height,
          borderColor: ThemeConstants[theme].borderColor,
        },
        style,
        _styleRound,
        disabled && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={round ? ThemeConstants[theme].text : '#fff'}
        />
      ) : (
        <Text style={[styles.text, {color: textColor}, _styleRoundText]}>
          {text}
        </Text>
      )}
    </AppFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 2,
    borderColor: '#DE7676',
    borderWidth: 1,
  },

  disabled: {
    opacity: 0.9,
  },

  text: {
    fontSize: 15,

    color: '#DE7676',
    fontWeight: '500',
  },
});
