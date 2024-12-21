import { createStore } from 'redux';
import rootReducer from './reducer'; // Pastikan jalur ini benar

const store = createStore(rootReducer);

export default store;
