import {combineReducers} from 'redux';
import folders from './folders';
import main from './main';

export default combineReducers({
  folders,
  main,
});
