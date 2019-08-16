import { combineReducers } from 'redux';

export const reducerHolder = (state = 0, action) => state;

export default combineReducers({
  reducerHolder
});
