import * as Animatable from 'react-native-animatable';

import moment from 'moment';

import {
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';
import React, {useEffect, useState, useMemo} from 'react';
import {
  saveAnswer,
  saveAnswerMass,
  saveAnswers,
  sendAnswers,
} from '../store/actions/question';

import Text from '../components/Text';

import QuestionAddress from '../components/questions/QuestionAddress';
import QuestionAgreement from '../components/questions/QuestionAgreement';
import QuestionCanvas from '../components/questions/QuestionCanvas';
import QuestionCity from '../components/questions/QuestionCity';
import QuestionCongratulations from '../components/questions/root/QuestionCongratulations';
import QuestionInput from '../components/questions/QuestionInput';
import QuestionPageDescriptor from '../components/questions/QuestionPageDescriptor';
import QuestionPhoto from '../components/questions/QuestionPhoto';
import QuestionPoints from '../components/questions/QuestionPoints';
import QuestionSelect from '../components/questions/QuestionSelect';
import QuestionSelectMulti from '../components/questions/QuestionSelectMulti';
import QuestionSlider from '../components/questions/QuestionSlider';
import {connect} from 'react-redux';

const components = {
  string: QuestionInput,
  text: props => <QuestionInput {...props} multiline />,
  select: QuestionSelect,
  selectMulti: QuestionSelectMulti,
  agreement: props => <QuestionAgreement {...props} dataProcessing />,
  canvas: QuestionCanvas,
  number: QuestionSlider,
  checkbox: QuestionAgreement,
  points: QuestionPoints,
  city: QuestionCity,
  address: QuestionAddress,
  photo: QuestionPhoto,
  'page-descriptor': QuestionPageDescriptor,
};

const QuestionScreen = ({
  navigation,
  answers,
  saveAnswer,
  saveAnswerMass,
  sendAnswers,
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [time, setTime] = useState(navigation.getParam('durationMin') * 60);
  const [timeStr, setTimeStr] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  const data = navigation.getParam('data');
  const questionnaireId = navigation.getParam('questionnaireId');
  const questionName = navigation.getParam('questionName');

  const activeQuestion = data[activeQuestionIndex];

  let ActiveComponent = null;

  if (activeQuestion.type === 'select') {
    ActiveComponent =
      components[activeQuestion.options.multiple ? 'selectMulti' : 'select'];
  } else {
    ActiveComponent = components[activeQuestion.type];
  }

  useEffect(() => {
    let interval = '';

    if (time) {
      setStartTime(+moment());
      interval = setInterval(() => {
        setCurrentTime(+moment());
        if (currentTime >= startTime + time) {
          clearInterval(interval);
          setStartTime(null);
          setCurrentTime(null);
        } else {
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentTime) {
      const different = Math.ceil(time - (currentTime - startTime) / 1000);

      if (different <= 0) {
        if (answers[questionnaireId]) {
          setActiveQuestionIndex(data.length - 1);

          handleSendAnswers();
        } else {
          navigation.goBack();
        }
      } else {
        let h = `${different / 60}`;
        h = h.split('.')[0];

        let m = different - h * 60;

        setTimeStr(`${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`);
      }
    }
  }, [currentTime]);

  const isLigth = useMemo(() => {
    // return !!activeQuestion.images;
    return false;
  }, [activeQuestion]);

  const _handlerMassUpdate = items => {
    const res = {
      questionnaireId,
      answers: {},
    };

    Object.keys(items).forEach((key, index) => {
      const activeItem = data[activeQuestionIndex].items[index];

      res.answers[key] = {
        group: activeItem.group,
        need_score: true,
        score: 1,
        question: activeItem.title,
        right_answers: _getIsRightAnswer({
          answer: items[key],
          values: activeItem.options && activeItem.options.values,
          result: activeItem.options && activeItem.options.is_right,
          multiple: activeItem.options && activeItem.options.multiple,
        }),
        type: activeItem.type,
        question_no: activeItem.sort,
        answer: items[key],
      };
    });

    saveAnswerMass(res);

    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const _handlerNextQuestion = value => {
    let currentQuestion = data[activeQuestionIndex];
    let tmp = value;
    let answers = _getIsRightAnswer({
      answer: tmp,
      values: currentQuestion.options && currentQuestion.options.values,
      result: currentQuestion.options && currentQuestion.options.is_right,
      multiple: currentQuestion.options && currentQuestion.options.multiple,
    });
    saveAnswer({
      questionnaireId,
      answer: {
        group: currentQuestion.group,
        need_score: true,
        score: 1,
        right_answers: answers,
        question: currentQuestion.title,
        type: currentQuestion.type,
        question_no: currentQuestion.sort,
        answer: tmp,
      },
    });

    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const _getIsRightAnswer = ({result, answer, values, multiple = 0}) => {

    if (result) {
      if (multiple == 1) {
        let isValid = '1';

        const answersIndex = answer.map(item => values.indexOf(item));
        return '1';
        if (result == undefined) {
          return '0';
        }
        result.forEach((item, index) => {
          if (item === '1' && answersIndex.indexOf(index) === -1) {
            isValid = '0';
          }
        });

        return isValid;
      } else {
        return `${+(result.indexOf('1') === values.indexOf(answer))}`;
      }
    }

    return 0;
  };

  const handleSendAnswers = () => {
    // console.log('save');
    if (answers[questionnaireId]) {
      sendAnswers({
        questionnaireId,
        questionName,
        results: Object.values(answers[questionnaireId]),
        cb: () => {},
      });
    }
  };

  const _handlerPrevQuestion = () => {
    setActiveQuestionIndex(activeQuestionIndex - 1);
  };

  const _handlerConfirmClose = () => {
    Alert.alert('', 'Вы действительно хотите завершить тест?', [
      {
        text: 'Отменить',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Завершить',
        onPress: () => {
          if (answers[questionnaireId]) setActiveQuestionIndex(data.length - 1);
          else navigation.goBack();

          handleSendAnswers();
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={
        activeQuestion.images
          ? {
              uri:
                // 'https://sales.ursosan.ru/files//istock-000008421673large-1484555785.jpg',
                `https://sales.ursosan.ru/${activeQuestion.images}`,
            }
          : null
      }
      resizeMode="cover"
      style={styles.container}>
      <View style={StyleSheet.flatten(styles.wrapper(isLigth))}>
        <StatusBar barStyle={isLigth ? 'light-content' : 'dark-content'} />

        {activeQuestion.type === 'finally-text' ? (
          <Animatable.View animation="fadeInUp" style={{flex: 1}}>
            <QuestionCongratulations
              onStart={handleSendAnswers}
              onEnd={() => {
                navigation.goBack();
              }}
            />
          </Animatable.View>
        ) : (
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title} light={isLigth}>
                Вопрос {activeQuestionIndex + 1} из {data.length - 1}
              </Text>

              <Text style={styles.time} light={isLigth}>
                {timeStr}
              </Text>

              <TouchableOpacity
                style={styles.close}
                onPress={() => {
                  _handlerConfirmClose();
                }}>
                <Icon
                  type="Ionicons"
                  name="ios-close"
                  style={StyleSheet.flatten(styles.closeIcon(isLigth))}
                />
              </TouchableOpacity>
            </View>

            {ActiveComponent && (
              <ActiveComponent
                navigation={navigation}
                data={activeQuestion}
                key={activeQuestion.title}
                isLight={isLigth}
                answers={
                  activeQuestion.type === 'page-descriptor' &&
                  answers &&
                  answers[questionnaireId]
                }
                defaultValue={
                  answers &&
                  answers[questionnaireId] &&
                  answers[questionnaireId][activeQuestion.title] &&
                  answers[questionnaireId][activeQuestion.title].answer
                }
                isFirst={activeQuestionIndex === 0}
                isLast={activeQuestionIndex === data.length - 2}
                onNext={value => _handlerNextQuestion(value)}
                onPrev={_handlerPrevQuestion}
                onMassUpdate={_handlerMassUpdate}
              />
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  answers: state.question.main.answers,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: payload => dispatch(saveAnswer(payload)),
  saveAnswerMass: payload => dispatch(saveAnswerMass(payload)),
  saveAnswers: payload => dispatch(saveAnswers(payload)),
  sendAnswers: payload => dispatch(sendAnswers(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: ligth => ({
    flex: 1,
    backgroundColor: ligth ? 'rgba(0,0,0,0.4)' : null,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 44,
    position: 'relative',
  }),

  content: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },

  close: {
    padding: 3,
  },

  closeIcon: light => ({color: light ? '#fff' : '#000'}),

  title: {
    fontWeight: '900',
    fontSize: 23,
  },

  btn: {
    bottom: 44,
    right: 15,
    width: 'auto',
  },

  time: {
    fontWeight: '700',
    fontSize: 20,
  },
});
