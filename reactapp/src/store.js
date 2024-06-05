import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { artworkListReducer, artworkDetailsReducer } from './reducers/artworkReducers';
import { cartReducer } from './reducers/cartReducers'

const rootReducer = combineReducers({
  artworkList: artworkListReducer,
  artworkDetails: artworkDetailsReducer,
  cart: cartReducer,
});

const cartItemsStorage = localStorage.getItem('cartItems') ? 
      JSON.parse(localStorage.getItem('cartItems')) : [];

export const initialState = {
  cart: { cartItems: cartItemsStorage}
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
