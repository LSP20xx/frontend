import { userTypes } from "../types/user.types";
const {
  GET_USER_INFO_BY_ID,
  ADD_USER,
  SET_USER_IMAGE,
  SEND_EMAIL,
  SEND_SMS,
  SET_SELECTED_ADDRESS,
} = userTypes;

const initialState = {
  user: null,
  isLoading: false,
  selectedAddress: null,
  error: null,
  hasError: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_BY_ID:
      return {
        ...state,
        user: action.item,
      };
    case ADD_USER:
      return {
        ...state,
        user: action.item,
      };
    case SET_USER_IMAGE:
      return {
        ...state,
        user: {
          ...state.user,
          image: action.item,
        },
      };
    case SEND_EMAIL:
      return {
        ...state,
      };
    case SEND_SMS:
      return {
        ...state,
      };

    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.item,
      };
    default:
      return state;
  }
};

export default userReducer;
