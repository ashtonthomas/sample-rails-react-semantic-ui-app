import { combineReducers } from 'redux';
import BooksReducer from './books_reducer';
import ActiveBookReducer from './active_book_reducer'

const rootReducer = combineReducers({
  // state: (state = {}) => state
  books: BooksReducer
});

export default rootReducer;
