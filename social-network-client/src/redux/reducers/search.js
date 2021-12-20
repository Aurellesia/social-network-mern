import { SUCCESS_SEARCH, ERROR_SEARCH } from "../constants/search";

const initialState = {
  result: [],
  error: "",
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_SEARCH:
      return {
        ...state,
        result: action.payload.data,
      };
    case ERROR_SEARCH:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
