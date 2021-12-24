import {
  ERROR_CREATE_POSTS,
  ERROR_READ_POSTS,
  SUCCESS_CREATE_POSTS,
  SUCCESS_READ_POSTS,
} from "../constants/posts";

const initialState = {
  posts: {},
  error: "",
  posted: [],
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
    case SUCCESS_READ_POSTS:
      return {
        ...state,
        posted: action.payload.data,
      };
    case ERROR_READ_POSTS:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
