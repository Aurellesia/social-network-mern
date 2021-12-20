import { USER_LOGIN, USER_LOGOUT } from "../constants/auth";

export const loginUser = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: USER_LOGOUT,
});
