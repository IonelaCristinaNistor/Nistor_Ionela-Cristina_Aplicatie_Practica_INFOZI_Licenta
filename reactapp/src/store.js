import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { artworkListReducer, artworkDetailsReducer } from './reducers/artworkReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers'

const rootReducer = combineReducers({
  artworkList: artworkListReducer,
  artworkDetails: artworkDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
});

const cartItemsStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInformation') ? 
    JSON.parse(localStorage.getItem('userInformation')) : null;

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress') ? 
    JSON.parse(localStorage.getItem('deliveryAddress')) : {};

export const initialState = {
  cart: { cartItems: cartItemsStorage, deliveryAddress: deliveryAddressFromStorage},
  userLogin: {userInformation: userInfoFromStorage},
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
