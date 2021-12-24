import {
  ERROR_CREATE_POSTS,
  ERROR_READ_POSTS,
  SUCCESS_CREATE_POSTS,
  SUCCESS_READ_POSTS,
} from "../constants/posts";

export const successCreatePosts = (payload) => ({
  type: SUCCESS_CREATE_POSTS,
  payload,
});

export const failCreatePosts = (payload) => ({
  type: ERROR_CREATE_POSTS,
  payload,
});

export const successReadPosts = (payload) => ({
  type: SUCCESS_READ_POSTS,
  payload,
});

export const failReadPosts = (payload) => ({
  type: ERROR_READ_POSTS,
  payload,
});
