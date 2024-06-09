import { 
    CART_ADD_ARTWORK, 
    CART_REMOVE_ARTWORK,
    CART_SAVE_DELIVERY,
    CART_SAVE_PAYMENT,

} from '../constants/CartConstants'

export const cartReducer = (state = {cartItems: [], deliveryAddress: {}}, action) => {
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
        case CART_SAVE_DELIVERY:
            return{
                ...state,
                deliveryAddress: action.payload
            }
        case CART_SAVE_PAYMENT:
            return{
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}