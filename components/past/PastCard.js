import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import {Button} from 'native-base';
import ThemeConstants from '../../constants/Theme';
import LayoutConstants from '../../constants/Layout';
import {ThemeContext} from '../../context';

const PastCard = ({title, status, onSend}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={{color: '#212121'}}>{title}</Text>

      <View style={styles.control}>
        <Button
          small
          style={[
            styles.btn,
            {
              backgroundColor: ThemeConstants[theme].buttonLight,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={onSend}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            {'Отправить еще раз'}
          </Text>
        </Button>

        <Text style={styles.status}>
          {status ? 'Отправлено' : 'Не отправлено'}
        </Text>
      </View>
    </View>
  );
};

export default PastCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 10,
    backgroundColor: '#fff',

    shadowColor: 'rgba(0,0,0,0.14)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 7,
  },

  status: {
    marginTop: LayoutConstants.isSmallDevice ? 10 : 0,
    marginRight: LayoutConstants.isSmallDevice ? 0 : 10,

    color: '#455A64',
    fontSize: 12,
  },

  control: {
    flexDirection: LayoutConstants.isSmallDevice ? 'column' : 'row-reverse',
    alignItems: 'center',
  },

  btn: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#ef9a9a',
  },
});
