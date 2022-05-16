/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LayoutsDefault from './layouts/LayoutsDefault';
import {Provider} from 'react-redux';
import {ThemeContext} from './context';
import store from './store/index';

const App = () => {
  const [theme, setTheme] = useState('men');

  AsyncStorage.getItem('designTemplate').then(value => {
    if (value) setTheme(value);
  });

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

        <LayoutsDefault>
          <ThemeContext.Provider
            value={{theme, changeTheme: theme => setTheme(theme)}}>
            <AppNavigator />
          </ThemeContext.Provider>
        </LayoutsDefault>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
