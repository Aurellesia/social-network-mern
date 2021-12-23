import { ERROR_CREATE_POSTS, SUCCESS_CREATE_POSTS } from "../constants/posts";

export const successCreatePosts = (payload) => ({
  type: SUCCESS_CREATE_POSTS,
  payload,
});

export const failCreatePosts = (payload) => ({
  type: ERROR_CREATE_POSTS,
  payload,
});
