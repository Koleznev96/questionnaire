import React, {useContext, useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Title, View} from 'native-base';

import AppHeaderRight from '../components/app/root/AppHeaderRight';
import AppNotAuth from '../components/app/root/AppNotAuth';
import ProfileResetPassword from '../components/profile/ProfileResetPassword';
import ProfileTemplate from '../components/profile/ProfileTemplate';
import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';
import {connect} from 'react-redux';

const ProfileScreen = ({navigation, isAuthenticated}) => {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    navigation.setParams({
      theme: theme,
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          !isAuthenticated && {flex: 1},
        ]}
        showsVerticalScrollIndicator={false}>
        {isAuthenticated ? (
          <View>
            <ProfileResetPassword />

            <View style={{marginTop: 40}}>
              <ProfileTemplate />
            </View>
          </View>
        ) : (
          <AppNotAuth />
        )}
      </ScrollView>
    </View>
  );
};

ProfileScreen.navigationOptions = ({navigation}) => {
  return {
    headerStyle: {
      backgroundColor:
        ThemeConstants[ThemeContext._currentValue.theme].background,
    },

    headerTitle: <Title style={{color: '#fff'}}>Профиль</Title>,

    headerRight: (
      <View>
        <AppHeaderRight />
      </View>
    ),
  };
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },

  notification: {
    width: '100%',
    height: '100%',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationText: {
    width: '80%',
    marginTop: '20%',
    marginBottom: 30,

    textAlign: 'center',

    fontSize: 17,
  },

  icon: {color: '#DE7676', fontSize: 150},
});
