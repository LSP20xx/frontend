import { blockchainsTypes } from "../types";
const {
  FETCH_BLOCKCHAINS_REQUEST,
  FETCH_BLOCKCHAINS_SUCCESS,
  FETCH_BLOCKCHAINS_FAILURE,
} = blockchainsTypes;
import { FETCH_BLOCKCHAINS_URL } from "../../constants";

export const fetchBlockchains = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOCKCHAINS_REQUEST });
  try {
    const response = await fetch(`${FETCH_BLOCKCHAINS_URL}`);
    const data = await response.json();
    dispatch({ type: FETCH_BLOCKCHAINS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BLOCKCHAINS_FAILURE, error: error.toString() });
  }
};
