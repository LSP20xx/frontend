export const UPDATE_FORM = 'UPDATE_FORM';

export interface FormField {
  value: string;
  hasError: boolean;
  error: string;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField | boolean;
  isFormValid: boolean;
}

export interface Action {
  type: string;
  data: {
    name: string;
    value: string;
    hasError: boolean;
    error: string;
    touched: boolean;
    isFormValid: boolean;
  };
}

export const initialState: FormState = {
  firstName: { value: '', hasError: false, error: '', touched: false },
  lastName: { value: '', hasError: false, error: '', touched: false },
  dateOfBirth: { value: '', hasError: false, error: '', touched: false },
  isFormValid: false,
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case UPDATE_FORM: {
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: {
          ...(state[name] as FormField),
          value,
          hasError,
          error,
          touched,
        },
        isFormValid,
      };
    }
    default:
      return state;
  }
};

export default formReducer;
