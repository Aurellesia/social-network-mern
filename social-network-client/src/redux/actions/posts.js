import {
  ERROR_CREATE_POSTS,
  ERROR_READ_POSTS,
  ERROR_VIEW_POSTS,
  ERROR_UPDATE_POSTS,
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

export const successViewPosts = (payload) => ({
  type: SUCCESS_VIEW_POSTS,
  payload,
});

export const failViewPosts = (payload) => ({
  type: ERROR_VIEW_POSTS,
  payload,
});

export const successUpdatePosts = (payload) => ({
  type: SUCCESS_UPDATE_POSTS,
  payload,
});

export const failUpdatePosts = (payload) => ({
  type: ERROR_UPDATE_POSTS,
  payload,
});

export const successDeletePosts = (payload) => ({
  type: SUCCESS_DELETE_POSTS,
  payload,
});

export const failDeletePosts = (payload) => ({
  type: ERROR_DELETE_POSTS,
  payload,
});

export const successLikePosts = (payload) => ({
  type: SUCCESS_LIKE_POSTS,
  payload,
});

export const failLikePosts = (payload) => ({
  type: ERROR_LIKE_POSTS,
  payload,
});

export const successFetchLikePosts = (payload) => ({
  type: SUCCESS_FETCH_LIKE_POSTS,
  payload,
});

export const failFetchLikePosts = (payload) => ({
  type: ERROR_FETCH_LIKE_POSTS,
  payload,
});
