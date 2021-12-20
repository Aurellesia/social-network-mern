import authReducer from "./reducers/auth";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import profileReducer from "./reducers/profile";
import searchReducer from "./reducers/search";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  search: searchReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
