import axios from 'axios';
import { 
    FAVORITES_LIST_REQUEST, 
    FAVORITES_LIST_SUCCESS, 
    FAVORITES_LIST_FAIL, 
    FAVORITE_ADD_ITEM, 
    FAVORITE_REMOVE_ITEM 
} from '../constants/favConstants';

export const listFavoriteItems = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FAVORITES_LIST_REQUEST });

        const {
            userLogin: { userInformation },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInformation.token}`
            }
        }

        const { data } = await axios.get('/api/favorites', config);

        dispatch({ type: FAVORITES_LIST_SUCCESS, payload: data });
        localStorage.setItem('favoriteItems', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: FAVORITES_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
};

export const favoriteListItem = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInformation },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInformation.token}`
            }
        }

        console.log('Sending data:', { id });

        const { data } = await axios.post(`/api/favorites/add/`, { id }, config);

        console.log('Received data:', data);

        dispatch({ type: FAVORITE_ADD_ITEM, payload: data });
        const { favorite: { artwork } } = getState();
        localStorage.setItem('favoriteItems', JSON.stringify(artwork));
    } catch (error) {
        dispatch({
            type: FAVORITES_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
};

export const favoriteRemove = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInformation },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        await axios.delete(`/api/favorites/${id}`, config);

        dispatch({ type: FAVORITE_REMOVE_ITEM, payload: id });
        const { favorite: { artwork } } = getState();
        localStorage.setItem('favoriteItems', JSON.stringify(artwork));
    } catch (error) {
        dispatch({
            type: FAVORITES_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
};
