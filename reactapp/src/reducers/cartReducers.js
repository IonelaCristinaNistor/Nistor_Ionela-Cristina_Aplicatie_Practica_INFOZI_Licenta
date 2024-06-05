import { CART_ADD_ARTWORK, CART_REMOVE_ARTWORK } from '../constants/CartConstants'

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ARTWORK:
            const item = action.payload
            const existItem = state.cartItems.find(m => m.artwork === item.artwork)
            
            if(existItem) {
                return {
                    ...state, cartItems: state.cartItems.map(m => 
                        m.artwork === existItem.artwork ? item : m)
                }
            } else {
                return {
                    ...state, cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ARTWORK:
            return{
                ...state,
                cartItems: state.cartItems.filter(m => m.artwork !== action.payload)
            }
        default:
            return state
    }
}