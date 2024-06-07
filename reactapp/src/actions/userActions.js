import axios from 'axios';

import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
 } from '../constants/userConstants';

 export const login = (email, password) => async (dispatch) => {
    try{
        dispatch ({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            Headers: {
                'Content-type':'applications/json'
            }
        } 

        const {data} = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password},
            config
        )
        localStorage.setItem('userInformation', JSON.stringify(data))

        dispatch ({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })


    }catch (error){
    dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message, //default message
        });
    }
 }