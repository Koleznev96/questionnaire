import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  UIManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const {State: TextInputState} = TextInput;

const ProfileHeaderFrom = ({children, topPaidding = 30}) => {
  const [shift, setShift] = useState(new Animated.Value(0));
  const [keyboardDidShowSub, setKeyboardDidShowSub] = useState(
    new Animated.Value(null),
  );
  const [keyboardDidHideSub, setKeyboardDidHideSub] = useState(
    new Animated.Value(null),
  );

  const handleKeyboardDidShow = event => {
    const {height: windowHeight} = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(shift, {
          toValue: gap - topPaidding,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    );
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    try {
      setKeyboardDidShowSub();
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
      setKeyboardDidHideSub();
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    } catch (e) {
      // console.err(e);
    }

    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: shift}]}]}>
      {children}
    </Animated.View>
  );
};

export default ProfileHeaderFrom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
