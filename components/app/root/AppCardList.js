import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
 FlatList
} from 'react-native';

import LayoutConstants from '../../../constants/Layout';

import * as Animatable from 'react-native-animatable';

import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';

import Layout from '../../../constants/Layout';

const AppCardList = ({
  data,
  loading = false,
  renderItem = () => {},
  onRefresh = () => {},
}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      {!data && loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            color={ThemeConstants[theme].activityIndicator}
          />
        </View>
      ) : (
        <>
          {data ? (
            <ScrollView
              contentContainerStyle={[styles.contentContainer]}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }>
              {data &&
                data.map((item, index) => (
                  <Animatable.View
                    animation="fadeInUp"
                    useNativeDriver={true}
                    style={styles.card}
                    delay={index * 100}
                    key={item.id}>
                    {renderItem(item)}
                  </Animatable.View>
                ))}
            </ScrollView>
            // <FlatList
            //   data={data}
            //   renderItem={({ item, index }) => (
            //     <Animatable.View
            //       animation="fadeInUp"
            //       useNativeDriver={true}
            //       style={styles.card}
            //       delay={index * 100}
            //       key={item.id}>
            //       {renderItem(item)}
            //     </Animatable.View>
            //   )}
            //   contentContainerStyle={[styles.contentContainer]}
            //   showsVerticalScrollIndicator={false}
            //   refreshControl={
            //     <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            //   }>
            //   </FlatList>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16}}>Пусто :(</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default AppCardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 7.5,
  },

  card: {
    width: (LayoutConstants.window.width - 15) / (Layout.isSmallDevice ? 2 : 3),
    marginTop: 20,
    paddingHorizontal: 7.5,

    shadowColor: 'rgba(0,0,0,0.14)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 7,

    elevation: 2,
  },
});
