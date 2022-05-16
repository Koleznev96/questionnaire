import {Button, Icon} from 'native-base';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

import Text from '../../Text';

import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';

export default ({
  value,
  lable,
  min,
  max,
  light = false,
  onChange = () => {},
}) => {
  const {theme} = useContext(ThemeContext);

  const _handlerIncrement = () => {
    if (max && value >= max) {
      return;
    }

    onChange(value + 1);
  };

  const handlerDecrement = () => {
    if (value <= min) {
      return;
    }

    onChange(value - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText} light={light}>
          {lable}
        </Text>
      </View>

      <View style={styles.control}>
        <Button
          style={[
            styles.button,
            {
              backgroundColor:
                min === value ? '#B5B5B5' : ThemeConstants[theme].button,
            },
          ]}
          danger
          small
          disabled={min === value}
          onPress={handlerDecrement}>
          <Icon style={[styles.icon]} type="Entypo" name="minus" />
        </Button>

        <View style={{width: 45, alignItems: 'center'}}>
          <Text style={styles.value} light={light}>
            {value}
          </Text>
        </View>

        <Button
          style={[
            styles.button,
            {backgroundColor: ThemeConstants[theme].button},
          ]}
          small
          success
          onPress={_handlerIncrement}>
          <Icon style={[styles.icon]} type="Entypo" name="plus" />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  control: {
    marginLeft: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    flex: 1,
  },

  labelText: {
    fontSize: 18,
  },

  button: {
    position: 'relative',
    width: 35,
    height: 35,
    padding: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    position: 'absolute',

    fontSize: 21,
    color: '#fff',
    zIndex: 2,
  },

  value: {
    fontSize: 25,
    lineHeight: 28,
  },
});
