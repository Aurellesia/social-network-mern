import { ERROR_CREATE_POSTS, SUCCESS_CREATE_POSTS } from "../constants/posts";

const initialState = {
  posts: {},
  error: "",
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_CREATE_POSTS:
      return {
        ...state,
        posts: action.payload.data,
      };
    case ERROR_CREATE_POSTS:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
