import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducer';

const Store: any = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export default Store;
