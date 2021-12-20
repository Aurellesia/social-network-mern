import {
  ERROR_FETCH_PROFILE,
  ERROR_UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE_PICT,
  SUCCESS_FETCH_PROFILE,
  SUCCESS_UPDATE_PROFILE,
  SUCCESS_UPDATE_PROFILE_PICT,
  SUCCESS_DELETE_PROFILE_PICT,
  ERROR_DELETE_PROFILE_PICT,
  SUCCESS_FETCH_FOLLOWERS,
  ERROR_FETCH_FOLLOWERS,
  SUCCESS_FETCH_FOLLOWING,
  ERROR_FETCH_FOLLOWING,
  SUCCESS_FETCH_FRIEND_PROFILE,
  ERROR_FETCH_FRIEND_PROFILE,
  SUCCESS_FOLLOW,
  ERROR_FOLLOW,
} from "../constants/profile";

const initialState = {
  user: {},
  error: "",
  followers: [],
  following: [],
};
export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_PROFILE:
      return {
        ...state,
        user: action.payload.data,
      };
    case ERROR_FETCH_PROFILE:
      return { ...state, error: action.payload.message };
    case SUCCESS_UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload.data,
      };
    case ERROR_UPDATE_PROFILE:
      return {
        ...state,
        error: action.payload.message,
      };
    case SUCCESS_UPDATE_PROFILE_PICT:
      return {
        ...state,
        user: action.payload.data,
      };
    case ERROR_UPDATE_PROFILE_PICT:
      return {
        ...state,
        error: action.payload.message,
      };
    case SUCCESS_DELETE_PROFILE_PICT:
      return {
        ...state,
      };
    case ERROR_DELETE_PROFILE_PICT:
      return {
        ...state,
        error: action.payload.message,
      };
    case SUCCESS_FETCH_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case ERROR_FETCH_FOLLOWERS:
      return { ...state, error: action.payload.message };
    case SUCCESS_FETCH_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    case ERROR_FETCH_FOLLOWING:
      return { ...state, error: action.payload.message };
    case SUCCESS_FETCH_FRIEND_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case ERROR_FETCH_FRIEND_PROFILE:
      return { ...state, error: action.payload.message };
    case SUCCESS_FOLLOW:
      return {
        ...state,
        user: action.payload,
      };
    case ERROR_FOLLOW:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
