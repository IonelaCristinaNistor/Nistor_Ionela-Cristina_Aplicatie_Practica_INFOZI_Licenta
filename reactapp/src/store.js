import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { artworkListReducer, artworkInformationReducer } from './reducers/artworkReducers';

const rootReducer = combineReducers({
  artworkList: artworkListReducer,
  artworkInformation: artworkInformationReducer,
});

export const initialState = {}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
