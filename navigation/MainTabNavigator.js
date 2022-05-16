import React from 'react';
import {Platform} from 'react-native';
import {Icon} from 'native-base';

import HomeScreen from '../screens/HomeScreen';
import PollListScreen from '../screens/PollListScreen';
import PastScreen from '../screens/PastScreen';

import ProfileScreen from '../screens/ProfileScreen';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBar from '../components/TabBar';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {
    navigationOptions: {
      headerBackTitle: 'Назад',
    },
  },
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },

    PollList: PollListScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Главная',
  tabBarIcon: ({focused}) => (
    <Icon
      style={{color: '#fff', fontSize: 22}}
      type="MaterialCommunityIcons"
      name="home-outline"
    />
  ),
};

HomeStack.path = '';

const PastStack = createStackNavigator({
  Past: PastScreen,
});

PastStack.navigationOptions = {
  tabBarLabel: ' Прошедшие',
  tabBarIcon: ({focused}) => (
    <Icon
      style={{color: '#fff', fontSize: 22}}
      type="MaterialCommunityIcons"
      name="playlist-check"
    />
  ),
};

PastStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config,
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Профиль',
  tabBarIcon: ({focused}) => (
    <Icon
      style={{color: '#fff', fontSize: 22}}
      type="MaterialCommunityIcons"
      name="account-circle-outline"
    />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    PastStack,
    ProfileStack,
  },
  {
    tabBarComponent: TabBar,
  },
);

tabNavigator.path = '';

export default tabNavigator;
