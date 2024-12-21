import { combineReducers } from 'redux';
import handleCart from './handleCart';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    cart: handleCart, // Untuk keranjang
    products: productReducer, // Untuk produk
});

export default rootReducer;
