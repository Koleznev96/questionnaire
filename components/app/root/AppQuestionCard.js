import {Image, StyleSheet, Text, ActivityIndicator, View} from 'react-native';
import React, {useContext} from 'react';

import {Button} from 'native-base';
import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';
import LayoutConstants from '../../../constants/Layout';
import Layout from '../../../constants/Layout';

const AppQuestionCard = ({
  imageUrl,
  title,
  loading = false,
  onOpen = () => {},
}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} resizeMode="contain" style={styles.image} />

      <View style={styles.main}>
        <View style={styles.body}>
          <Text
            style={{color: '#212121', textAlign: 'center'}}
            numberOfLines={2}
            ellipsizeMode="tail">
            {title}
          </Text>
        </View>

        <View style={styles.footer}>
          {!loading ? (
            <Button
              small
              style={[
                styles.btn,
                {backgroundColor: ThemeConstants[theme].buttonLight},
              ]}
              onPress={onOpen}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                {'Открыть'}
              </Text>
            </Button>
          ) : (
            <ActivityIndicator
              style={{paddingVertical: 5}}
              color={ThemeConstants[theme].activityIndicator}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AppQuestionCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    height: (LayoutConstants.window.width - 15) / (Layout.isSmallDevice ? 2 : 3)
  },

  main: {},

  body: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopColor: '#ECECEC',
    borderTopWidth: 1,
  },

  footer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',

    borderTopWidth: 0.25,
    borderColor: '#ee6e73',
  },

  btn: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#ef9a9a',
  },
});
