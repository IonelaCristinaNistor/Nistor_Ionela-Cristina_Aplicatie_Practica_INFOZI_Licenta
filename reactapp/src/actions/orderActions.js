import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstants'

// ************* CREATE ORDER *************

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInformation },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',           
                Authorization: `Bearer ${userInformation.token}`,
            }
        } 

        const { data } = await axios.post(
           `/api/orders/add/`, 
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}
