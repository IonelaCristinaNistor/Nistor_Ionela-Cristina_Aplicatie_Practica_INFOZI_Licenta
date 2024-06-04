import { 
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL,
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_FAIL,
} from '../constants/artworkConstants'; 

export const artworkListReducer = (state = { artworks: [] }, action) => {
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

export const artworkDetailsReducer = (state = { artwork: { likes_count: [] } }, action) => {
  switch (action.type) {
      case ARTWORK_DETAILS_REQUEST:
          return { ...state, loading: true };
      case ARTWORK_DETAILS_SUCCESS:
          return { loading: false, artwork: action.payload };
      case ARTWORK_DETAILS_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};
