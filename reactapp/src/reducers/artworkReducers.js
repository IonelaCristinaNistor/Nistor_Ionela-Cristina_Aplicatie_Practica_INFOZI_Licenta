import { 
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL
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
  
  export default artworkListReducer;
  