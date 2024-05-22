import {
  USER_INFO_URL,
  SEND_EMAIL_URL,
  SEND_SMS_URL,
  SET_EVM_FAVORITE_ADDRESS_URL,
} from '../../constants';
import { userTypes } from '../types/user.types';
import { Dispatch } from 'redux';

const {
  GET_USER_INFO_BY_ID,
  SEND_EMAIL,
  SEND_SMS,
  SET_SELECTED_ADDRESS,
  SET_FAVORITE_ADDRESS,
  FAVORITE_ADDRESS_SAVED_SUCCESSFULLY,
  FAVORITE_ADDRESS_SAVE_FAILED,
} = userTypes;

export const getUserInfoById = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${USER_INFO_URL}/${userId}`);
      const result = await response.json();
      dispatch({
        type: GET_USER_INFO_BY_ID,
        item: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSelectedAddress = (address: string) => {
  return {
    type: SET_SELECTED_ADDRESS,
    item: address,
  };
};

export const setFavoriteAddress =
  (userId: string, address: string, name: string) =>
  async (dispatch: Dispatch) => {
    console.log('llega acá');
    dispatch({
      type: SET_FAVORITE_ADDRESS,
      payload: { address, name },
    });

    console.log(userId, address, name);

    const requestBody = {
      address,
      name,
    };

    try {
      const response = await fetch(
        `${SET_EVM_FAVORITE_ADDRESS_URL}/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to save favorite address');
      }

      const data = await response.json();
      console.log('Favorite address saved successfully:', data);

      dispatch({
        type: FAVORITE_ADDRESS_SAVED_SUCCESSFULLY,
        payload: data,
      });
    } catch (error) {
      console.error(
        'Failed to save favorite address:',
        (error as Error).message,
      );
      dispatch({
        type: FAVORITE_ADDRESS_SAVE_FAILED,
        payload: (error as Error).message,
      });
    }
  };

export const sendEmail = (to: string, subject: string, template: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log(to);
      console.log(subject);
      console.log(template);
      console.log(SEND_EMAIL_URL);
      const response = await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, template }),
      });
      console.log('response: ', response.ok);
      if (!response.ok) {
        console.log('Error sending email before throw');
        throw new Error('Error sending email');
      }

      let result;
      if (response.headers.get('content-length') !== '0') {
        result = await response.json();
        console.log(result);
      } else {
        console.log(
          'Email sent successfully, but no content returned from server.',
        );
      }

      dispatch({
        type: SEND_EMAIL,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendSMS = (to: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log(to);
      const response = await fetch(SEND_SMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Error sending sms');
      }
      console.log(response);
      const result = await response.json();
      console.log(result);
      dispatch({
        type: SEND_SMS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
