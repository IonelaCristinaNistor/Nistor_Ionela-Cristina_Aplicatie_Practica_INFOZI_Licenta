import { 
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL,
  ARTWORK_INFORMATION_REQUEST,
  ARTWORK_INFORMATION_SUCCESS,
  ARTWORK_INFORMATION_FAIL,
 } from '../constants/artworkConstants' 
  
 export const artworkListReducer = (state = {artworks: []}, action) => {
    switch (action.type) {
      case ARTWORK_LIST_REQUEST:
        return { loading: true, artworks: [] };

      case ARTWORK_LIST_SUCCESS:
        return { loading: false, artworks: action.payload };

      case ARTWORK_LIST_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
  };

  export const artworkInformationReducer = (state = {artwork: {likes_count: []}}, action) => {
    switch (action.type) {
      case ARTWORK_INFORMATION_REQUEST:
        return { ...state, loading: true};

      case ARTWORK_INFORMATION_SUCCESS:
        return { loading: false, artwork: action.payload };

      case ARTWORK_INFORMATION_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
  };
  
  export default artworkListReducer;
  