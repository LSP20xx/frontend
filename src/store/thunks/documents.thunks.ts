import axios from 'axios';

import { UPLOAD_USER_DOCUMENT_URL } from '../../constants';
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

    try {
      const response = await axios.post(UPLOAD_USER_DOCUMENT_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { userId, documentType },
      });

      dispatch(uploadDocumentSuccess(response.data));
    } catch (error) {
      dispatch(uploadDocumentFailure(error.message));
    }
  };
};
