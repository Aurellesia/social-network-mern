import {
  SUCCESS_CREATE_COMMENT,
  ERROR_CREATE_COMMENT,
  SUCCESS_READ_COMMENT,
  ERROR_READ_COMMENT,
  SUCCESS_VIEW_COMMENT,
  ERROR_VIEW_COMMENT,
  SUCCESS_DELETE_COMMENT,
  ERROR_DELETE_COMMENT,
  SUCCESS_LIKE_COMMENT,
  ERROR_LIKE_COMMENT,
} from "../constants/comment";

export const successCreateComment = (payload) => ({
  type: SUCCESS_CREATE_COMMENT,
  payload,
});

export const failCreateComment = (payload) => ({
  type: ERROR_CREATE_COMMENT,
  payload,
});

export const successReadComment = (payload) => ({
  type: SUCCESS_READ_COMMENT,
  payload,
});

export const failReadComment = (payload) => ({
  type: ERROR_READ_COMMENT,
  payload,
});

export const successViewComment = (payload) => ({
  type: SUCCESS_VIEW_COMMENT,
  payload,
});

export const failViewComment = (payload) => ({
  type: ERROR_VIEW_COMMENT,
  payload,
});

export const successDeleteComment = (payload) => ({
  type: SUCCESS_DELETE_COMMENT,
  payload,
});

export const failDeleteComment = (payload) => ({
  type: ERROR_DELETE_COMMENT,
  payload,
});

export const successLikeComment = (payload) => ({
  type: SUCCESS_LIKE_COMMENT,
  payload,
});

export const failLikeComment = (payload) => ({
  type: ERROR_LIKE_COMMENT,
  payload,
});
