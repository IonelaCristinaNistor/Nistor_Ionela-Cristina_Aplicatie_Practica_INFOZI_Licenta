import axios from 'axios'

import { 
    ARTWORK_LIST_REQUEST,
    ARTWORK_LIST_SUCCESS,
    ARTWORK_LIST_FAIL,
    
    ARTWORK_DETAILS_REQUEST,
    ARTWORK_DETAILS_SUCCESS,
    ARTWORK_DETAILS_FAIL,
   } from '../constants/artworkConstants'

export const listArtworks = () => async(dispatch) => {
    try{
        dispatch({type: ARTWORK_LIST_REQUEST})

        const { data } = await axios.get('/api/artworks/')

        dispatch({
            type: ARTWORK_LIST_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: ARTWORK_LIST_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}

export const listArtworkDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ARTWORK_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/artworks/${id}`);

        dispatch({
            type: ARTWORK_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ARTWORK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, //default message
        });
    }
};