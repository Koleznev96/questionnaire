import React, {useContext} from 'react';
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
          {value === defaultValue ? (
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

  return active ? (
    <TouchableOpacity
      onPress={() => {
        onSelet(defaultValue);
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

    borderRadius: 12,
    borderWidth: 1,
    borderColor: light ? '#fff' : '#52A49A',
  }),

  active: light => ({
    height: 10,
    width: 10,

    borderRadius: 8,
    backgroundColor: light ? '#fff' : '#52A49A',
  }),

  label: {
    // paddingVertical: 15,
    width: '95%',
    marginLeft: 12,

    fontSize: 18,
  },

  sufix: {
    fontSize: 16,
  },
});
