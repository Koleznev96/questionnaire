import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default ({children, light = false, style}) => {
  return (
    <Text style={[StyleSheet.flatten(styles.text(light)), style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: light => ({
    color: light ? '#fff' : '#000',
  }),
});
