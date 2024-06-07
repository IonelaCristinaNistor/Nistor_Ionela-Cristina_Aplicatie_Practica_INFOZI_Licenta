import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { artworkListReducer, artworkDetailsReducer } from './reducers/artworkReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'

const rootReducer = combineReducers({
  artworkList: artworkListReducer,
  artworkDetails: artworkDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const cartItemsStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInformation') ? 
    JSON.parse(localStorage.getItem('userInformation')) : null;

export const initialState = {
  cart: { cartItems: cartItemsStorage},
  userLogin: {userInformation: userInfoFromStorage}
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
