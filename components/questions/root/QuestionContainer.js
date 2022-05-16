import * as Animatable from 'react-native-animatable';

import {Button} from 'native-base';
import React, {createRef, useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import Text from '../../Text';
import QuestionFooter from './QuestionFooter';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import YouTube from 'react-native-youtube';

import ThemeConstants from '../../../constants/Theme';
import {ThemeContext} from '../../../context';
import LayoutConstants from '../../../constants/Layout';

const QuestionContent = ({
  data,
  value,
  formValue,
  children,
  isValid = false,
  bntShow = true,
  isLight = false,
  isFirst = false,
  isLast = false,
  scroll = true,
  isNext = true,
  pageDesctiptor = false,
  onNext = () => {},
  onPrev = () => {},
  onChange = () => {},
}) => {
  const {theme} = useContext(ThemeContext);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(false);

  useEffect(() => {
    if (isValid) onChange(value);
    else if (formValue && !isValid) onChange('');
  }, [isValid, value]);

  return (
    <View style={styles.container}>

      {!!data.video_before && !isShowQuestion && (
        <Animatable.View
          style={styles.imageBefore}
          animation={!pageDesctiptor ? 'fadeInUp' : ''}
          useNativeDriver={true}>
          <Carousel
            sliderWidth={LayoutConstants.window.width}
            itemWidth={LayoutConstants.window.width}
            data={data.video_before.split(',')}
            onSnapToItem={setActiveSlide}
            renderItem={({item}) => (
              <YouTube
  videoId={item} // The YouTube video ID
  style={styles.image}
  controls={1}
  play // control playback of video with true/false // control whether the video should play in fullscreen or inline
  loop 
  style={{ alignSelf: 'stretch', height: 450 }}
/>
            )}
          />

          <Pagination
            dotsLength={data.video_before.split(',').length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              success
              style={[
                styles.btnNext,
                {
                  backgroundColor: ThemeConstants[theme].buttonLight,
                },
              ]}
              onPress={onPrev}>
              <Text>Вернуться назад</Text>
            </Button>

            <Button
              success
              style={[
                styles.btnNext,
                {
                  backgroundColor: ThemeConstants[theme].button,
                },
              ]}
              onPress={() => setIsShowQuestion(true)}>
              <Text>Перейти к вопросу</Text>
            </Button>
          </View>
        </Animatable.View>
      )}    

{!!data.image_before && !isShowQuestion && (
        <Animatable.View
          style={styles.imageBefore}
          animation={!pageDesctiptor ? 'fadeInUp' : ''}
          useNativeDriver={true}>
          <Carousel
            sliderWidth={LayoutConstants.window.width}
            itemWidth={LayoutConstants.window.width}
            data={data.image_before.split(',')}
            onSnapToItem={setActiveSlide}
            renderItem={({item}) => (
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                  url: `https://sales.ursosan.ru/${item}`,
                }}
              />
            )}
          />

          <Pagination
            dotsLength={data.image_before.split(',').length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              success
              style={[
                styles.btnNext,
                {
                  backgroundColor: ThemeConstants[theme].buttonLight,
                },
              ]}
              onPress={onPrev}>
              <Text>Вернуться назад</Text>
            </Button>

            <Button
              success
              style={[
                styles.btnNext,
                {
                  backgroundColor: ThemeConstants[theme].button,
                },
              ]}
              onPress={() => setIsShowQuestion(true)}>
              <Text>Перейти к вопросу</Text>
            </Button>
          </View>
        </Animatable.View>
      )}

      {(!data.image_before && !data.video_before || isShowQuestion) && (
        <Animatable.View
          style={{
            flex: 1,
          }}
          animation={!pageDesctiptor ? 'fadeInUp' : ''}
          useNativeDriver={true}>
          <View
            style={[
              styles.header,
              {paddingHorizontal: !pageDesctiptor ? 15 : 0},
            ]}>
            <Text style={styles.title} light={isLight}>
              {data.title}
            </Text>

            {!!data.description && (
              <Text style={styles.description} light={isLight}>
                {data.description}
              </Text>
            )}
          </View>

          {bntShow && !pageDesctiptor && scroll ? (
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps = 'always'
              extraScrollHeight={200}
              contentContainerStyle={{
                paddingBottom: 50,
                paddingTop: 20,
              }}
              showsVerticalScrollIndicator={false}>
              <View style={{paddingHorizontal: 20}}>
                {children}

                <View style={{marginTop: 15}}>
                  <QuestionFooter
                    isFirst={isFirst}
                    isLast={isLast}
                    isValid={isValid}
                    isNext={isNext}
                    bntShow={bntShow}
                    onNext={onNext}
                    onPrev={onPrev}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <View
              style={{
                paddingBottom: 50,
                paddingTop: 20,
                paddingHorizontal: !pageDesctiptor ? 30 : 0,
              }}>
              {children}
            </View>
          )}
        </Animatable.View>
      )}
    </View>
  );
};

export default QuestionContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  header: {
    marginBottom: 10,
  },

  title: {
    fontWeight: '500',
    fontSize: 18,
  },

  description: {
    marginTop: 3,

    fontSize: 16,
  },

  imageBefore: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: LayoutConstants.window.width,
    height: '100%',
  },

  btnNext: {
    marginHorizontal: 20,
    marginBottom: 40,

    fontSize: 18,
  },
});
