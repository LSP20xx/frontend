// reducers/documentReducer.js
import { documentsTypes } from '../types/documents.types';

const {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
} = documentsTypes;

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default documentsReducer;
