import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {getBottomSpace} from 'react-native-iphone-x-helper';

import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';

const TabBar = props => {
  const {theme} = useContext(ThemeContext);

  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: ThemeConstants[theme].background},
      ]}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            style={[styles.item, isRouteActive && styles.itemActive]}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            key={routeIndex}
            accessibilityLabel={getAccessibilityLabel({route})}>
            {renderIcon({route, focused: isRouteActive, tintColor})}

            <Text style={styles.lable}>
              {getLabelText({route, focused: isRouteActive, tintColor})}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: getBottomSpace(),
  },

  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },

  itemActive: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },

  lable: {
    color: '#fff',
    fontSize: 12,
  },
});
