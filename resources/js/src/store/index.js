import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import auth from "./reducers/auth";
import backend from "./reducers/backend";
import content from "./reducers/content";
import frontend from "./reducers/frontend";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth,
    backend,
    content,
    frontend,
});

export default createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
