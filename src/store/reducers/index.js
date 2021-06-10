import { combineReducers } from 'redux';
import userReducer from './user';
import showLoginModalReducer from './showLoginModal';
// import visibilityFilterReducer from 'features/filters/filtersSlice'

export default combineReducers({
  user: userReducer,
  showLoginModal: showLoginModalReducer,
  //   visibilityFilter: visibilityFilterReducer
});
