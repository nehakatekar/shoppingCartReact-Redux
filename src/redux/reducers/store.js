import { createStore, combineReducers } from "redux";
import { cartreducer } from "./reducer";

const rootReducer = combineReducers({
  cartreducer,
});

const store = createStore(rootReducer);

export default store;