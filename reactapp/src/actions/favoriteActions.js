// src/actions/favoriteActions.js
import axios from 'axios';
import { 
    FAVORITES_LIST_REQUEST, 
    FAVORITES_LIST_SUCCESS, 
    FAVORITES_LIST_FAIL, 
    FAVORITE_ADD_ITEM, 
    FAVORITE_REMOVE_ITEM } from '../constants/favConstants';

export const listFavoriteItems = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FAVORITES_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('/api/favorites', config);
        
        dispatch({ type: FAVORITES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FAVORITES_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const favoriteListItem = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`/api/favorites/`, { id });

        dispatch({ type: FAVORITE_ADD_ITEM, payload: data });
    } catch (error) {
        console.error('Failed to add favorite item:', error);
    }
};

export const favoriteRemove = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/api/favorites/${id}`);

        dispatch({ type: FAVORITE_REMOVE_ITEM, payload: id });
    } catch (error) {
        console.error('Failed to remove favorite item:', error);
    }
};
