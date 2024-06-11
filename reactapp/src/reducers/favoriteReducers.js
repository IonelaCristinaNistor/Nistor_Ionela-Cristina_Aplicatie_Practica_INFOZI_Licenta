import { 
    FAVORITES_LIST_REQUEST, 
    FAVORITES_LIST_SUCCESS, 
    FAVORITES_LIST_FAIL, 
    FAVORITE_ADD_ITEM, 
    FAVORITE_REMOVE_ITEM } from '../constants/favConstants';

    const initialState = { favorites: [], loading: false, error: null };

    export const favoriteReducer = (state = initialState, action) => {
        switch (action.type) {
            case FAVORITES_LIST_REQUEST:
                return { ...state, loading: true };
            case FAVORITES_LIST_SUCCESS:
                return { ...state, loading: false, favorites: action.payload };
            case FAVORITES_LIST_FAIL:
                return { ...state, loading: false, error: action.payload };
            case FAVORITE_ADD_ITEM:
                return { ...state, favorites: [...state.favorites, action.payload] };
            case FAVORITE_REMOVE_ITEM:
                return { 
                    ...state,
                    favorites: state.favorites.filter(m => m.artwork !== action.payload),
                };
            default:
                return state;
        }
    };
