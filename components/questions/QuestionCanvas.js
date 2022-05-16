import {Button, Text} from 'native-base';
import React, {createRef, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import QuestionContent from './root/QuestionContainer';
import SignatureCapture from 'react-native-signature-capture';
import ThemeConstants from '../../constants/Theme';
import {ThemeContext} from '../../context';

const QuestionCanvas = props => {
  const [isValid, setIsValid] = useState(false);
  const singRef = createRef();

  const {theme} = useContext(ThemeContext);

  const _handlerReset = () => {
    singRef.current.resetImage();

    setIsValid(false);
  };

  const _handlerNext = res => {
    const value = `data:‎image/png;base64,${res.encoded}`;
    props.onNext(value);
    props.onChange && props.onChange(value);
  };

  const _handlerDragEvent = () => {
    if (!isValid) {
      setIsValid(true);
    }
  };

  return (
    <QuestionContent {...props} isValid={isValid}>
      <View style={styles.container}>
        <SignatureCapture
          style={styles.signature}
          ref={singRef}
          onSaveEvent={_handlerNext}
          onDragEvent={_handlerDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
        />

        <View style={styles.footer}>
          <Button
            style={[
              styles.btnReset,
              {backgroundColor: ThemeConstants[theme].button},
            ]}
            danger
            block
            onPress={_handlerReset}>
            <Text style={{fontSize: 18}}>Сбросить</Text>
          </Button>
        </View>
      </View>
    </QuestionContent>
  );
};

export default QuestionCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  signature: {
    height: 400,
    width: '100%',
    borderRadius: 5,
  },

  footer: {
    marginTop: 20,
    flexDirection: 'row',
  },

  btnReset: {
    flex: 1,
    backgroundColor: '#F09085',
  },

  btnNext: {
    flex: 1,
    backgroundColor: '#52A49A',
  },
});
