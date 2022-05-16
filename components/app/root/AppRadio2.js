import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default ({
  label,
  defaultValue,
  value,
  sufix,
  onSelet = () => {},
  disabled = false,
  active = true,
}) => {
  const content = (
    <View style={[styles.container, {opacity: disabled ? 0.3 : 1}]}>
      <View style={styles.main}>
        <View style={[styles.button]}>
          {value == defaultValue ? <View style={styles.active} /> : null}
        </View>

        {label && <Text style={styles.label}>{label}</Text>}
      </View>

      {sufix && <Text style={styles.sufix}>{sufix}</Text>}
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

  button: {
    height: 16,
    width: 16,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DE7676',
  },

  active: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: '#DE7676',
  },

  label: {
    paddingVertical: 5,
    marginLeft: 12,

    fontSize: 14,
  },

  sufix: {
    fontSize: 14,
  },
});
