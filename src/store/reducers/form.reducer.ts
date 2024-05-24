export const UPDATE_FORM = 'UPDATE_FORM';
export const LOAD_FORM_STATE = 'LOAD_FORM_STATE';

export const initialState = {
  completeName: { value: '', hasError: false, error: '', touched: false },
  dateOfBirth: { value: '', hasError: false, error: '', touched: false },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        [action.data.name]: {
          value: action.data.value,
          hasError: action.data.hasError,
          error: action.data.error,
          touched: action.data.touched,
        },
        isFormValid: action.data.isFormValid,
      };
    case LOAD_FORM_STATE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default formReducer;
