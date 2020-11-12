import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.actions';

export default combineReducers({
  user: userReducer
})