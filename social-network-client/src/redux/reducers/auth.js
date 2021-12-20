import { USER_LOGIN, USER_LOGOUT } from "../constants/auth";

const initialState = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : { user: null, token: null };

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN:
      return { user: payload.user, token: payload.token };

    case USER_LOGOUT:
      return { user: null, token: null };

    default:
      return state;
  }
}
