import { 
    ARTWORK_LIST_REQUEST,
    ARTWORK_LIST_SUCCESS,
    ARTWORK_LIST_FAIL,
 } from '../constants/ARTWORKConstants'
 
 
export const ARTWORKListReducer = (state = {ARTWORKs:[]}, action) =>{
    switch(action.type){
        case ARTWORK_LIST_REQUEST:
            return {
                loading: true,
                ARTWORKs: []
            }
        case ARTWORK_LIST_SUCCESS:
            return {
                loading: false,
                ARTWORKs: action.payload
            }
        case ARTWORK_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}