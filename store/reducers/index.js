import auth from './auth';
import {combineReducers} from 'redux';
import main from './main';
import question from './question';

export default combineReducers({
  main,
  question,
  auth,
});
