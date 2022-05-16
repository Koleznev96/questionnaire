import {StyleSheet, View, Picker, Text} from 'react-native';

import {Icon} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import React, {useEffect} from 'react';

const PrifileHeaderFormInput = ({
  items,
  value,
  carousel = false,
  onChange = () => {},
}) => {
  useEffect(() => {
    if (!value && items) {
      onChange(items[0].value);
    }
  }, []);

  return (
    <View style={styles.content}>
      {carousel ? (
        <View style={{height: 200}}>
          <Picker selectedValue={value} onValueChange={onChange}>
            {items.map((item, index) => (
              <Picker.Item label={item.label} value={item.value} key={index} />
            ))}
          </Picker>
        </View>
      ) : (
        <RNPickerSelect
          placeholder={{}}
          value={value}
          useNativeAndroidPickerStyle={false}
          items={items}
          onValueChange={onChange}
          style={{
            ...pickerSelectStyles,
          }}
          Icon={() => (
            <Icon type="Ionicons" name="ios-arrow-down" style={styles.icon} />
          )}
        />
      )}
    </View>
  );
};

export default PrifileHeaderFormInput;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  icon: {
    fontSize: 14,
    color: '#DE7676',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: '100%',
    paddingBottom: 0.3,

    borderBottomWidth: 1,
    paddingLeft: 5,
    borderColor: '#DE7676',

    color: '#2E2E2E',

    fontSize: 16,
  },
  inputAndroid: {
    height: 40,
    width: '100%',
    paddingBottom: 0.3,

    borderBottomWidth: 1,
    paddingLeft: 5,
    borderColor: '#DE7676',

    color: '#2E2E2E',
  },

  iconContainer: {
    height: 40,
    marginRight: 5,

    justifyContent: 'center',
  },
});
