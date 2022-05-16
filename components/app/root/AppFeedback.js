import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const AppFeedback = ({children, style = {}, onPress = () => {}}) => {
  if (Platform.OS === 'ios')
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[style]}>{children}</View>
      </TouchableOpacity>
    );
  else
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
        useForeground={true}>
        <View style={[style]}>{children}</View>
      </TouchableNativeFeedback>
    );
};

export default AppFeedback;
