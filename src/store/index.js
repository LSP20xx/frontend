import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  assetsReducer,
  categoriesReducer,
  favoritesReducer,
  authReducer,
  userReducer,
} from "./reducers/index";

const rootReducer = combineReducers({
  assets: assetsReducer,
  categories: categoriesReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
