import { combineReducers } from 'redux'
import userReducer from './userReducer'
import roomReducer from './roomReducer'

const reducers = combineReducers({
   userReducer,
   roomReducer,
})

export default reducers
