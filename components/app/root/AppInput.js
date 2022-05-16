import React, {useContext} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';

export default ({
  value = null,
  placholder = '',
  type = 'input',
  isValid = true,
  autoFocus = false,
  secureTextEntry = false,
  keyboardType,
  style = {},
  onBlur = () => {},
  onChange = () => {},
}) => {
  const {theme} = useContext(ThemeContext);

  const textAreaStyle = {
    marginTop: 8,
    height: 80,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  };

  return (
    <View contrast style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: ThemeConstants[theme].borderColor,
            color: ThemeConstants[theme].color,
          },
          type === 'inputSearch' ? styles.inputSearch : {},
          type === 'textArea' ? textAreaStyle : {},
          !isValid && styles.noValid,
          style,
        ]}
        value={value}
        multiline={type === 'textArea'}
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholder={placholder}
        placeholderTextColor="#9F9F9F"
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  input: {
    height: 40,
    width: '100%',
    paddingBottom: 0.3,

    borderBottomWidth: 1,
    paddingLeft: 5,
    borderColor: '#DE7676',

    color: '#2E2E2E',
  },

  icon: {
    position: 'absolute',
    top: 13,
    left: 16,

    fontSize: 18,
    opacity: 0.5,
  },

  noValid: {
    paddingBottom: 0.3,

    borderColor: 'red',
    borderBottomWidth: 1.3,
  },
});
