import { combineReducers } from 'redux';
import abonents from './abonents';
//import docflows from './docflows';

const rootReducer = combineReducers({
  abonents,
  //docflows,
});

export default rootReducer;