import {
    FAVORITE_ADD_ITEM,
    FAVORITE_REMOVE_ITEM,
    FAVORITES_LOAD,
    FAVORITES_REQUEST,
    FAVORITES_FAIL,
} from '../constants/favConstants';

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favoriteItems')) || [],
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
            const newFavoritesAdd = [...state.favorites, action.payload];
            localStorage.setItem('favoriteItems', JSON.stringify(newFavoritesAdd));
            return { ...state, favorites: newFavoritesAdd };
        case FAVORITE_REMOVE_ITEM:
            const newFavoritesRemove = state.favorites.filter(item => item.artwork._id !== action.payload);
            localStorage.setItem('favoriteItems', JSON.stringify(newFavoritesRemove));
            return { ...state, favorites: newFavoritesRemove };
        default:
            return state;
    }
};
