import { combineReducers } from 'redux';
import news from './news';
//import authors from './authors';

const rootReducer = combineReducers({
  news,
  //authors,
});

export default rootReducer;
