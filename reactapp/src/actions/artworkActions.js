import axios from 'axios'

import { 
    ARTWORK_LIST_REQUEST,
    ARTWORK_LIST_SUCCESS,
    ARTWORK_LIST_FAIL,
    ARTWORK_INFORMATION_REQUEST,
    ARTWORK_INFORMATION_SUCCESS,
    ARTWORK_INFORMATION_FAIL,
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

export const listArtworksInformation = (artwork_id) => async(dispatch) => {
    try{
        dispatch({type: ARTWORK_INFORMATION_REQUEST})

        const { data } = await axios.get(`/api/artworks/${artwork_id}`);

        dispatch({
            type: ARTWORK_INFORMATION_SUCCESS,
            payload: data,
        });
    }catch(error) {
        dispatch({
            type: ARTWORK_INFORMATION_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

};