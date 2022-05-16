import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Text from '../../Text';

export default ({
  label,
  defaultValue,
  value,
  sufix,
  onSelet = () => {},
  disabled = false,
  active = true,
  light = false,
}) => {
  const content = (
    <View style={[styles.container, {opacity: disabled ? 0.3 : 1}]}>
      <View style={styles.main}>
        <View style={StyleSheet.flatten(styles.button(light))}>
          {value.indexOf(defaultValue) != -1 ? (
            <View style={StyleSheet.flatten(styles.active(light))} />
          ) : null}
        </View>

        {label && (
          <Text style={styles.label} light={light}>
            {label}
          </Text>
        )}
      </View>

      {sufix && (
        <Text style={styles.sufix} light={light}>
          {sufix}
        </Text>
      )}
    </View>
  );

  const _handleSecect = () => {
    let index = value.indexOf(defaultValue);

    if (index === -1) onSelet([...value, defaultValue]);
    else {
      value.splice(index, 1);

      onSelet(value);
    }
  };

  return active ? (
    <TouchableOpacity
      onPress={() => {
        _handleSecect();
      }}>
      {content}
    </TouchableOpacity>
  ) : (
    <View>{content}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: light => ({
    height: 20,
    width: 20,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 2,
    borderWidth: 1,
    borderColor: light ? '#fff' : '#52A49A',
  }),

  active: light => ({
    height: 13,
    width: 13,
    borderRadius: 1,
    backgroundColor: light ? '#fff' : '#52A49A',
  }),

  label: {
    marginLeft: 12,

    fontSize: 18,
  },

  sufix: {
    fontSize: 16,
  },
});
