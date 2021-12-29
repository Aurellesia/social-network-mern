import {
  ERROR_CREATE_POSTS,
  ERROR_READ_POSTS,
  ERROR_UPDATE_POSTS,
  ERROR_VIEW_POSTS,
  ERROR_DELETE_POSTS,
  ERROR_LIKE_POSTS,
  ERROR_FETCH_LIKE_POSTS,
  SUCCESS_CREATE_POSTS,
  SUCCESS_READ_POSTS,
  SUCCESS_UPDATE_POSTS,
  SUCCESS_VIEW_POSTS,
  SUCCESS_DELETE_POSTS,
  SUCCESS_LIKE_POSTS,
  SUCCESS_FETCH_LIKE_POSTS,
  SUCCESS_READ_POSTS_USER,
  ERROR_READ_POSTS_USER,
  SUCCESS_READ_TIMELINE,
  ERROR_READ_TIMELINE,
} from "../constants/posts";

const initialState = {
  posts: {},
  error: "",
  posted: [],
  post: [],
  like: {},
  liker: [],
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
    case SUCCESS_VIEW_POSTS:
      return {
        ...state,
        post: action.payload.data,
      };
    case ERROR_VIEW_POSTS:
      return { ...state, error: action.payload.message };
    case SUCCESS_UPDATE_POSTS:
      return {
        ...state,
        post: action.payload.data,
      };
    case ERROR_UPDATE_POSTS:
      return { ...state, error: action.payload.message };
    case SUCCESS_DELETE_POSTS:
      return {
        ...state,
        post: action.payload.data,
      };
    case ERROR_DELETE_POSTS:
      return { ...state, error: action.payload.message };
    case SUCCESS_LIKE_POSTS:
      return {
        ...state,
        like: action.payload.data,
      };
    case ERROR_LIKE_POSTS:
      return { ...state, error: action.payload.message };
    case SUCCESS_FETCH_LIKE_POSTS:
      return {
        ...state,
        liker: action.payload.data,
      };
    case ERROR_FETCH_LIKE_POSTS:
      return { ...state, error: action.payload.message };
    case SUCCESS_READ_POSTS_USER:
      return {
        ...state,
        posted: action.payload.data,
      };
    case ERROR_READ_POSTS_USER:
      return { ...state, error: action.payload.message };
    case SUCCESS_READ_TIMELINE:
      return {
        ...state,
        posted: action.payload.data,
      };
    case ERROR_READ_TIMELINE:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
