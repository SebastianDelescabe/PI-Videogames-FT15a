import {createStore , applyMiddleware} from "redux";
import {composeWithDevTools} from "reac-devtools-extension";
import thunk from "react-thunk";
import rootReducer from "../reducers";

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))