import React from 'react';
import {View, Text} from 'react-native';

const QuestionBtn = () => {
  return (
    <View>
      {bntShow && (
        <View style={styles.footer}>
          {!isFirst && (
            <Button
              success
              block
              style={[
                styles.btnPrev,
                {
                  marginRight: bntShow ? 15 : 0,
                  backgroundColor: ThemeConstants[theme].buttonLight,
                },
              ]}
              onPress={onPrev}>
              <Text>Назад</Text>
            </Button>
          )}

          <Button
            success
            block
            style={[
              styles.btnNext,
              {
                backgroundColor: !isValid
                  ? '#B5B5B5'
                  : ThemeConstants[theme].button,
              },
            ]}
            disabled={!isValid}
            onPress={_handlerNextQuestion}>
            <Text>{isLast ? 'Отправить' : 'Далее'}</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default QuestionBtn;
