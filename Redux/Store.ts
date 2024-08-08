
import Reduser from './reducer';

import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import thunkMiddleware from 'redux-thunk';


const rootreduser: Reducer = combineReducers(Reduser);

const store = createStore(rootreduser, applyMiddleware(thunkMiddleware));

export default store;