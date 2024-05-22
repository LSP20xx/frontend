import { blockchainsTypes } from '../types';
import { FETCH_BLOCKCHAINS_URL } from '../../constants';

const {
  FETCH_BLOCKCHAINS_REQUEST,
  FETCH_BLOCKCHAINS_SUCCESS,
  FETCH_BLOCKCHAINS_FAILURE,
} = blockchainsTypes;

export const fetchBlockchains = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOCKCHAINS_REQUEST });
  try {
    const response = await fetch(`${FETCH_BLOCKCHAINS_URL}`);
    const data = await response.json();
    console.log('data blockchains', data);
    dispatch({ type: FETCH_BLOCKCHAINS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BLOCKCHAINS_FAILURE, error: error.toString() });
  }
};
