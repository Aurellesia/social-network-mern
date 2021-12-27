import authReducer from "./reducers/auth";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import profileReducer from "./reducers/profile";
import searchReducer from "./reducers/search";
import postsReducer from "./reducers/posts";
import commentReducer from "./reducers/comment";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  search: searchReducer,
  posts: postsReducer,
  comment: commentReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
