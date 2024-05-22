import { UPDATE_FORM } from '../../utils/forms';

interface FormField {
  value: string;
  hasError: boolean;
  error: string;
  touched: boolean;
}

interface FormState {
  [key: string]: FormField | boolean;
  isFormValid: boolean;
}

interface Action {
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
