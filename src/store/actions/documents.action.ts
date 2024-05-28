import { documentsTypes } from '../types/documents.types';

const {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
} = documentsTypes;

export const uploadDocumentRequest = () => ({
  type: UPLOAD_DOCUMENT_REQUEST,
});

export const uploadDocumentSuccess = (data) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: data,
});

export const uploadDocumentFailure = (error) => ({
  type: UPLOAD_DOCUMENT_FAILURE,
  payload: error,
});
