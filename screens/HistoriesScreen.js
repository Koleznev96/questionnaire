import {ScrollView, StyleSheet} from 'react-native';

import React from 'react';

const HistoriesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      {/* <ExpoLinksView /> */}
    </ScrollView>
  );
};

HistoriesScreen.navigationOptions = ({navigation}) => {
  return {
    headerStyle: {
      backgroundColor: '#DE7676',
    },

    headerTitle: <Title style={{color: '#fff'}}>Прошедшие</Title>,

    headerRight: (
      <View>
        <AppHeaderRight />
      </View>
    ),
  };
};

export default HistoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
