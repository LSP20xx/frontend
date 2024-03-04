import { transactionsTypes } from "../types";

const { WITHDRAW_REQUEST, WITHDRAW_SUCCESS, WITHDRAW_FAILURE } =
  transactionsTypes;

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WITHDRAW_REQUEST:
      return { ...state, loading: true, error: null };
    case WITHDRAW_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case WITHDRAW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionsReducer;
