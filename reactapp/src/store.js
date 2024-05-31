import { configureStore, combineReducers} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { ARTWORKListReducer } from './artworkReducers'
 
 
const reducer = combineReducers({
    artworkList: ARTWORKListReducer,
})
 
export const initialState = {}
 
const middleware = [thunk]
 
const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
})
 
export default store