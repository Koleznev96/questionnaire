import {Title, View} from 'native-base';

import AppCardList from '../components/app/root/AppCardList';
import AppHeaderRight from '../components/app/root/AppHeaderRight';
import AppQuestionCard from '../components/app/root/AppQuestionCard';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import ThemeConstants from '../constants/Theme';
import {ThemeContext} from '../context';

import {connect} from 'react-redux';
import {loadQuestion} from '../store/actions/question';

import {getRenderFolderItems} from '../utils/question';

const PollListScreen = ({
  navigation,
  questionData,
  user,
  token,
  loadQuestion,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [renderQuestion, setRenderQuestion] = useState(null);

  useEffect(() => {
    if (questionData) {
      setRenderQuestion(
        getRenderFolderItems({data: questionData, user, token}),
      );
    }
  }, [questionData]);

  const folderId = navigation.getParam('folderId');

  const _convertToGroupedQuestion = data => {
    const result = [];

    if (!data) {
      return result;
    }

    let pageDescriptor = null;

    data.forEach(question => {
      if (
        pageDescriptor &&
        question.page &&
        question.page.name === pageDescriptor.title
      ) {
        pageDescriptor.items.push(question);
      } else {
        if (question.type === 'page-descriptor') {
          if (pageDescriptor) {
            result.push(pageDescriptor);

            pageDescriptor = null;
          }

          pageDescriptor = {
            title: question.title,
            type: question.type,
            question_no: question.question_no,
            items: [],
          };
        } else {
          if (pageDescriptor) {
            result.push(pageDescriptor);

            pageDescriptor = null;
          }

          result.push(question);
        }
      }
    });

    return result;
  };

  return (
    <>
      <AppCardList
        data={renderQuestion ? renderQuestion[folderId] : []}
        loading={isLoading}
        renderItem={item => (
          <View>
            <AppQuestionCard
              imageUrl={`https://sales.ursosan.ru/${item.image}`}
              title={item.title}
              loading={isLoading}
              onOpen={() => {
                navigation.navigate('Questions', {
                  data: _convertToGroupedQuestion(item.questions),
                  questionName: item.title,
                  questionnaireId: item.id,
                  durationMin: item.duration_min,
                });
              }}
            />
          </View>
        )}
        onRefresh={() => {
          setIsLoading(true);

          loadQuestion({
            id: folderId,
            cb: () => {
              setIsLoading(false);
            },
          });
        }}
      />
    </>
  );
};

PollListScreen.navigationOptions = ({navigation}) => {
  return {
    headerTintColor: 'white',

    headerStyle: {
      backgroundColor:
        ThemeConstants[ThemeContext._currentValue.theme].background,
    },

    headerTitle: (
      <Title style={{color: '#fff'}}>
        {navigation.getParam('folderName', 'Poll list')}
      </Title>
    ),

    headerRight: (
      <View>
        <AppHeaderRight />
      </View>
    ),
  };
};

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
  questionData: state.question.main.questionData,
});

const mapDispatchToProps = dispatch => ({
  loadQuestion: payload => dispatch(loadQuestion(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PollListScreen);

const styles = StyleSheet.create({});
