import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers'
import InitialState from '../redux/constants/initialState'

const store = createStore(rootReducer, InitialState, applyMiddleware(thunk))
export default store;