import AuthScreen from '../screens/AuthScreen';
import {Platform} from 'react-native';
import React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import { createStackNavigator } from 'react-navigation-stack';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  config,
);

AuthStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      component="Ionicons"
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

AuthStack.path = '';

const RootStack = createStackNavigator(
  {
    AuthStack,
  },
  {
    headerMode: 'none',
  },
);

RootStack.path = '';

export default RootStack;
