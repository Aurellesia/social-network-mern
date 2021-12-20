import { ERROR_SEARCH, SUCCESS_SEARCH } from "../constants/search";

export const successSearch = (payload) => ({
  type: SUCCESS_SEARCH,
  payload,
});

export const failSearch = (payload) => ({
  type: ERROR_SEARCH,
  payload,
});
