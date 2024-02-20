import { blockchainsTypes } from "../types";
const {
  FETCH_BLOCKCHAINS_REQUEST,
  FETCH_BLOCKCHAINS_SUCCESS,
  FETCH_BLOCKCHAINS_FAILURE,
} = blockchainsTypes;

const initialState = {
  loading: false,
  blockchains: [],
  error: null,
};

const blockchainsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOCKCHAINS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BLOCKCHAINS_SUCCESS:
      return { ...state, loading: false, blockchains: action.payload };
    case FETCH_BLOCKCHAINS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default blockchainsReducer;
