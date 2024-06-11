import {
    FAVORITE_ADD_ITEM,
    FAVORITE_REMOVE_ITEM,
    FAVORITES_LOAD,
    FAVORITES_REQUEST,
    FAVORITES_FAIL,
} from '../constants/favConstants';

const initialState = {
    favorites: [],
    loading: false,
    error: null,
};

export const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAVORITES_REQUEST:
            return { ...state, loading: true, error: null };
        case FAVORITES_LOAD:
            return { ...state, favorites: action.payload, loading: false };
        case FAVORITES_FAIL:
            return { ...state, loading: false, error: action.payload };
        case FAVORITE_ADD_ITEM:
            return { ...state, favorites: [...state.favorites, action.payload] };
        case FAVORITE_REMOVE_ITEM:
            return {
                ...state,
                favorites: state.favorites.filter(item => item.artwork.artwork_id !== action.payload),
            };
        default:
            return state;
    }
};
