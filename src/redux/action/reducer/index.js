import { combineReducers } from 'redux';
import handleCart from './handleCart';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    cart: handleCart,
    products: productReducer,
});

export default rootReducer;
