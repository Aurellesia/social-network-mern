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

const initialState = {
  comments: {},
  comment: [],
  post: {},
  like: {},
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_CREATE_COMMENT:
      return {
        ...state,
        comment: action.payload.data,
      };
    case ERROR_CREATE_COMMENT:
      return { ...state, error: action.payload.message };
    case SUCCESS_READ_COMMENT:
      return {
        ...state,
        comment: action.payload.data,
      };
    case ERROR_READ_COMMENT:
      return { ...state, error: action.payload.message };
    case SUCCESS_VIEW_COMMENT:
      return {
        ...state,
        comments: action.payload.data,
      };
    case ERROR_VIEW_COMMENT:
      return { ...state, error: action.payload.message };
    case SUCCESS_DELETE_COMMENT:
      return {
        ...state,
        comments: action.payload.data,
      };
    case ERROR_DELETE_COMMENT:
      return { ...state, error: action.payload.message };
    case SUCCESS_LIKE_COMMENT:
      return {
        ...state,
        like: action.payload.data,
      };
    case ERROR_LIKE_COMMENT:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
