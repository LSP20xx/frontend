import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import mapsReducer from "./maps.slice";

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});