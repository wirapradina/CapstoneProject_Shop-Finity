import { createStore } from "redux";
import rootReducers from "./reducer";
import handleCart from "./reducer/handleCart";

const store = createStore(rootReducers);

export default store;