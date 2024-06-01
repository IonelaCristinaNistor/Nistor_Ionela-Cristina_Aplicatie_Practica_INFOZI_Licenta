import { combineReducers } from 'redux';
import { artworkListReducer, artworkInformationReducer } from './artworkReducers';

const rootReducer = combineReducers({
  artworkList: artworkListReducer,
  artworkInformation: artworkInformationReducer,
});

export default rootReducer;
