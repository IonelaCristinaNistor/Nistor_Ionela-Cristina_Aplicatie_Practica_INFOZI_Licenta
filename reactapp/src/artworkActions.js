import axios from 'axios'
import config from '../config'
import { 
    ARTWORK_LIST_REQUEST,
    ARTWORK_LIST_SUCCESS,
    ARTWORK_LIST_FAIL,
 } from '../constants/ArtworkConstants'
 
 
export const listArtworks = () => async (dispatch) => {
    try {
        dispatch({type: ARTWORK_LIST_REQUEST})
 
        const env = process.env.NODE_ENV || 'development';
        const backendUrl = config[env].backendUrl;
 
        const {data} = await axios.get(`${backendUrl}/api/artworks/`)
 
        dispatch({
            type: ARTWORK_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTWORK_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}