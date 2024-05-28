import axios from 'axios';

import { UPDATE_USER_DOCUMENT_URL } from '../../constants';
import {
  uploadDocumentFailure,
  uploadDocumentRequest,
  uploadDocumentSuccess,
} from '../actions/documents.action';

export const uploadDocument = (imageUri, documentType, userId) => {
  return async (dispatch) => {
    dispatch(uploadDocumentRequest());
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: `${documentType}_image.jpg`,
      type: 'image/jpeg',
    });

    console.log('LLEGA A UPLOADDOCUMENT', formData);

    try {
      const response = await axios.post(
        `${UPDATE_USER_DOCUMENT_URL}/${userId}/${documentType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('response', response);
      dispatch(uploadDocumentSuccess(response.data));
    } catch (error) {
      dispatch(uploadDocumentFailure(error.message));
    }
  };
};
