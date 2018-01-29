import { combineReducers } from 'redux';
import BooksReducer from './books_reducer'

const rootReducer = combineReducers({
  // state: (state = {}) => state
  books: BooksReducer
});

export default rootReducer;
