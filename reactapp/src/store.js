import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { artworkListReducer, artworkDetailsReducer, artworkLikeReducer, artworkDeleteReducer } from './reducers/artworkReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer, userUpdateDataReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer } from './reducers/orderReducers'
import { favoriteReducer } from './reducers/favoriteReducers'

const rootReducer = combineReducers({
  artworkList: artworkListReducer,
  artworkDetails: artworkDetailsReducer,
  artworkLike: artworkLikeReducer,
  artworkDelete: artworkDeleteReducer,
  favorite: favoriteReducer,
  
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDataUpdate: userUpdateDataReducer,
  
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListReducer,
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
  favorite: { favorites: JSON.parse(localStorage.getItem('favoriteItems')) || [] },
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
