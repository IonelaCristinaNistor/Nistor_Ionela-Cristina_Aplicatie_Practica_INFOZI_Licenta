import axios from 'axios';
import {
    FAVORITE_ADD_ITEM,
    FAVORITE_REMOVE_ITEM,
    FAVORITES_LOAD,
    FAVORITES_REQUEST,
    FAVORITES_FAIL,
} from '../constants/favConstants';

export const loadFavorites = () => async (dispatch, getState) => {
    const {
        userLogin: { userInformation },
    } = getState();

    if (!userInformation) {
        throw new Error('User is not authenticated');
    }

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInformation.token}`,
        },
    };

    dispatch({ type: FAVORITES_REQUEST });

    try {
        const { data } = await axios.get('/api/favorites/', config);
        dispatch({
            type: FAVORITES_LOAD,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FAVORITES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const addFavorite = (artwork_id) => async (dispatch, getState) => {
    const {
        userLogin: { userInformation },
    } = getState();

    if (!userInformation) {
        throw new Error('User is not authenticated');
    }

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInformation.token}`,
        },
    };

    try {
        const { data } = await axios.post('/api/favorites/add/', { artwork_id }, config);

        dispatch({
            type: FAVORITE_ADD_ITEM,
            payload: data,
        });

        dispatch(loadFavorites());
    } catch (error) {
        dispatch({
            type: FAVORITES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const removeFavorite = (favorite_id) => async (dispatch, getState) => {
    const {
        userLogin: { userInformation },
    } = getState();

    if (!userInformation) {
        throw new Error('User is not authenticated');
    }

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInformation.token}`,
        },
    };

    console.log(`Attempting to delete favorite with id: ${favorite_id}`);

    try {
        const response = await axios.delete(`/api/favorites/remove/${favorite_id}/`, config);
        console.log('Delete response:', response);

        dispatch({
            type: FAVORITE_REMOVE_ITEM,
            payload: favorite_id,
        });

        dispatch(loadFavorites());
    } catch (error) {
        console.error('Error removing favorite:', error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message);

        dispatch({
            type: FAVORITES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
