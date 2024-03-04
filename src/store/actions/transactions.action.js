import { WITHDRAW_FROM_EVM_WALLET_URL } from "../../constants";
import { transactionsTypes } from "../types";

const { WITHDRAW_REQUEST, WITHDRAW_SUCCESS, WITHDRAW_FAILURE } =
  transactionsTypes;

export const withdrawFromEvmWallet = (
  from,
  to,
  amount,
  coin,
  userId,
  blockchainId
) => {
  console.log("llega a dispatchear withdrawFromEvmWallet");
  console.log(
    "from: ",
    from,
    "to: ",
    to,
    "amount: ",
    amount,
    "coin: ",
    coin,
    "userId: ",
    userId,
    "blockchainId: ",
    blockchainId
  );
  return async (dispatch) => {
    try {
      dispatch({ type: WITHDRAW_REQUEST });
      const response = await fetch(WITHDRAW_FROM_EVM_WALLET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, amount, coin, userId, blockchainId }),
      });
      if (!response.ok) {
        throw new Error("Withdrawal failed");
      }
      const result = await response.json();
      dispatch({ type: WITHDRAW_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: WITHDRAW_FAILURE, payload: error.message });
    }
  };
};
