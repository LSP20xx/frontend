import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  assetsReducer,
  authReducer,
  userReducer,
  blockchainsReducer,
  documentsReducer,
  transactionsReducer,
} from './reducers/index';

const rootReducer = combineReducers({
  assets: assetsReducer,
  auth: authReducer,
  user: userReducer,
  blockchains: blockchainsReducer,
  documents: documentsReducer,
  transactions: transactionsReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
