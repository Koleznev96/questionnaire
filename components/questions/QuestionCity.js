import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, LogBox, StyleSheet} from 'react-native';

import QuestionContent from './root/QuestionContainer';
import SearchableDropdown from 'react-native-searchable-dropdown';
import ThemeConstants from '../../constants/Theme';
import cities from '../../assets/data/cities';
import {ThemeContext} from '../../context';
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";

const QuestionSelect = props => {
  const [value, setValue] = useState(props.defaultValue || cities[0]);
  const componentRef = useRef();
  const tmp = cities.map(function(item) { return { name: item, id: item}});
  const {theme} = useContext(ThemeContext);
  var isValidValue = false;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const setValidValue = (item) => {
    setValue(item);
  };
  return (
    <QuestionContent keyboardShouldPersistTaps={'always'}
      {...props}
      isValid={true}
      value={value}
      onNext={() => props.onNext(value)}>
      <View
        style={{
          height: 120,
        }}>
    <Autocomplete 
    minimumCharactersCount={2} 
    onChangeText={(text) => setValidValue(text)} 
    ref={componentRef}  
    overlayStyle={{backgroundColor:'#FFF'}} 
    listHeader={'Города'} 
    noDataText={'Город не найден'} 
    minimumCharactersCount={2} 
    handleSelectItem={(item, id) => setValidValue(item) } 
    placeholder={'Город'}
    // pickerStyle={{left: 0, top: 60, zIndex: 6000}}
    inputStyle={{
      width: '100%',
      paddingLeft: 0, 
      textAlign:'left', 
      height: 60, 
      borderBottomColor:ThemeConstants[theme].borderColor, 
      borderTopColor:'transparent', 
      borderRightColor:'transparent', 
      borderLeftColor:'transparent',
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderRadius:0
    }} 
    data={cities} 
    valueExtractor={item => item} />  
      </View>
    </QuestionContent>
  );
};

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: {maxHeight: 40},
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});

export default QuestionSelect;
