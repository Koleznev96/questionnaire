import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';

import {Icon, Text} from 'native-base';

import QuestionContent from './root/QuestionContainer';

// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 

const QuestionPhoto = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(props.defaultValue || null);

  const _handleChooseFile = () => {
    const options = {
      noData: false,
    };

    launchImageLibrary(options, response => {
      if (!response?.didCancel && response?.assets[0]?.uri) {
        // const base64 = `data:${response.type};base64,${response.data}`;
        // const base64 = `data:${response.assets[0].type};base64,${response.assets[0].uri}`;
        // setFile(base64);
        setFile(response.assets[0].uri);
      }
    });
  };

  return (
    <QuestionContent
      {...props}
      isValid={props.data.options.is_required?!!file:true}
      value={props.data.options.is_required?file: file?file: ' '}
      onNext={() => props.onNext(file)}>
      <TouchableOpacity
        onPress={() => !isLoading && _handleChooseFile()}
        style={styles.dropzone}>
        <View
          style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#4994EC" />
          ) : (
            <Icon
              style={[styles.icon]}
              type="Ionicons"
              name="md-cloud-upload"
            />
          )}
        </View>

        <Text style={styles.dropzoneText}>
          Нажмите сюда чтобы загрузить файлы
        </Text>
      </TouchableOpacity>

      {file && (
        <View style={{marginTop: 20}}>
          <Image
            style={[styles.dropzone]}
            source={{uri: file}}
            resizeMode="cover"
          />
        </View>
      )}
    </QuestionContent>
  );
};

export default QuestionPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginTop: StatusBar.currentHeight || 44,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
  },

  dropzone: {
    minHeight: 170,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f5f5f5',

    borderRadius: 5,

    shadowColor: 'rgba(62, 44, 90, 0.08)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 13,

    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: 'rgba(0, 0, 0, 0.09)',
  },

  dropzoneText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#909090',
  },

  icon: {
    fontSize: 26,
    fontWeight: '300',
    color: '#909090',
  },

  sizeDescription: {
    marginTop: 10,

    fontSize: 11,
    fontWeight: '600',
    color: '#909090',
  },

  file: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  fileText: {
    fontSize: 12,
  },

  fileIcon: {
    fontSize: 18,
    marginRight: 10,
  },
});
