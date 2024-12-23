import { createStore, combineReducers } from 'redux';
import handleCart from './reducer/handleCart';
import handleProducts from './reducer/handleProducts';

const rootReducer = combineReducers({
    handleCart,
    handleProducts,
});

const store = createStore(rootReducer);

export default store;
