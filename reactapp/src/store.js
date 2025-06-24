import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { artworkListReducer, artworkDetailsReducer, artworkLikeReducer, artworkDeleteReducer, artworkCreateReducer, artworkUpdateReducer, reactionReducer, carouselReducer } from './reducers/artworkReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer, userUpdateDataReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer, orderAdminReducer, orderDeliveryReducer } from './reducers/orderReducers'
import { favoriteReducer } from './reducers/favoriteReducers'

const rootReducer = combineReducers ({
  artworkList: artworkListReducer,
  artworkDetails: artworkDetailsReducer,
  artworkLike: artworkLikeReducer,
  artworkDelete: artworkDeleteReducer,
  artworkCreate: artworkCreateReducer,
  artworkUpdate: artworkUpdateReducer,
  favorite: favoriteReducer,
  reactionList: reactionReducer,
  carouselList: carouselReducer,
  
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
  orderList: orderAdminReducer,
  orderDelivery: orderDeliveryReducer,
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
