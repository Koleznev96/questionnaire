import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'native-base';
import React, {useContext} from 'react';

import QuestionContent from './root/QuestionContainer';
import ThemeConstants from '../../constants/Theme';
import {ThemeContext} from '../../context';

const QuestionAgreement = props => {
  const {theme} = useContext(ThemeContext);

  const _handlerDisagree = () => {
    if (props.dataProcessing) {
      Alert.alert(
        'Обработка данных',
        'Без согласия на обработку персональных данных вы не можете продолжить',
        [
          {
            text: 'На главную',
            onPress: () => props.navigation.goBack(),
            style: 'cancel',
          },
          {text: 'Согласиться', onPress: () => props.onNext('yes')},
        ],
      );
    } else {
      props.onNext('not');
    }
  };

  return (
    <QuestionContent
      {...props}
      value={'yes'}
      isNext={false}
      onNext={() => props.onNext('yes')}>
      <View style={styles.container}>
        <Button
          style={{
            marginRight: 15,
            flex: 1,
            backgroundColor: ThemeConstants[theme].button,
            fontSize: 18,
          }}
          danger
          block
          onPress={_handlerDisagree}>
          <Text style={{fontSize: 18}}>Нет</Text>
        </Button>

        <Button
          style={{flex: 1, backgroundColor: '#52A49A', fontSize: 18}}
          success
          block
          onPress={() => props.onNext('yes')}>
          <Text style={{fontSize: 18}}>Да</Text>
        </Button>
      </View>
    </QuestionContent>
  );
};

export default QuestionAgreement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
