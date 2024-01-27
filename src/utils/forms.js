const formatEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatPhoneNumber = /^[0-9]{7,20}$/;
const minPasswordLength = 7;
export const UPDATE_FORM = "UPDATE_FORM";

const validateInput = ({ name, value }) => {
  let hasError = false;
  let error = "";
  const formatValue = value.trim();

  switch (name) {
    case "email":
      if (formatValue === "") {
        hasError = true;
        error = "Email or phone number is required";
        console.log("llega al email", hasError, error);
      } else if (
        !formatEmail.test(formatValue) &&
        !formatPhoneNumber.test(formatValue)
      ) {
        hasError = true;
        error = "Invalid email or phone number";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "password":
      if (formatValue === "") {
        hasError = true;
        error = "Password is required";
      } else if (formatValue.length < minPasswordLength) {
        hasError = true;
        error = `Password must be at least ${minPasswordLength} characters`;
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};

export const onInputChange = ({ name, value, dispatch, formState }) => {
  const { hasError, error } = validateInput({ name, value });
  let isFormValid = true;

  for (const key in formState) {
    const item = formState[key];
    if (item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: {
      name,
      value,
      hasError,
      error,
      touched: true,
      isFormValid,
    },
  });
};
