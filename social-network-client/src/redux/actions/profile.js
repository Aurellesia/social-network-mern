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

export const successFetchProfile = (payload) => ({
  type: SUCCESS_FETCH_PROFILE,
  payload,
});

export const failFetchProfile = (payload) => ({
  type: ERROR_FETCH_PROFILE,
  payload,
});

export const successUpdateProfile = (payload) => ({
  type: SUCCESS_UPDATE_PROFILE,
  payload,
});

export const failUpdateProfile = (payload) => ({
  type: ERROR_UPDATE_PROFILE,
  payload,
});

export const successUpdateProfilePict = (payload) => ({
  type: SUCCESS_UPDATE_PROFILE_PICT,
  payload,
});

export const failUpdateProfilePict = (payload) => ({
  type: ERROR_UPDATE_PROFILE_PICT,
  payload,
});

export const successDeleteProfilePict = () => ({
  type: SUCCESS_DELETE_PROFILE_PICT,
});

export const failDeleteProfilePict = (payload) => ({
  type: ERROR_DELETE_PROFILE_PICT,
  payload,
});

export const successFetchFollowers = (payload) => ({
  type: SUCCESS_FETCH_FOLLOWERS,
  payload,
});

export const failFetchFollowers = (payload) => ({
  type: ERROR_FETCH_FOLLOWERS,
  payload,
});

export const successFetchFollowing = (payload) => ({
  type: SUCCESS_FETCH_FOLLOWING,
  payload,
});

export const failFetchFollowing = (payload) => ({
  type: ERROR_FETCH_FOLLOWING,
  payload,
});

export const successFetchFriendProfile = (payload) => ({
  type: SUCCESS_FETCH_FRIEND_PROFILE,
  payload,
});

export const failFetchFriendProfile = (payload) => ({
  type: ERROR_FETCH_FRIEND_PROFILE,
  payload,
});

export const successFollow = (payload) => ({
  type: SUCCESS_FOLLOW,
  payload,
});

export const failFollow = (payload) => ({
  type: ERROR_FOLLOW,
  payload,
});
