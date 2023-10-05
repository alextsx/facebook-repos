"use client";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

//slices
import userReducer from "./user/userSlice";
import repoReducer from "./repo/repoSlice";
import searchReducer from "./search/searchSlice";

//api slices
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    repo: repoReducer,
    search: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiSlice.middleware
    ) /* .concat(logger) */;
  },
});

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      repo: repoReducer,
      search: searchReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        apiSlice.middleware
      ) /* .concat(logger) */;
    },
  });
//create state type for store
export type RootState = ReturnType<typeof store.getState>;
