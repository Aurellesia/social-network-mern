import {
  SUCCESS_CREATE_COMMENT,
  ERROR_CREATE_COMMENT,
  SUCCESS_READ_COMMENT,
  ERROR_READ_COMMENT,
  SUCCESS_VIEW_COMMENT,
  ERROR_VIEW_COMMENT,
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
