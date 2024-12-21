import { createStore, combineReducers } from 'redux';
import handleCart from './reducer/handleCart';
import handleProducts from './reducer/handleProducts'; // Tambahkan ini

const rootReducer = combineReducers({
    handleCart,
    handleProducts, // Jangan lupa tambahkan handleProducts di sini
});

const store = createStore(rootReducer);

export default store;
