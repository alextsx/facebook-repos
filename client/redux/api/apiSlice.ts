"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api/v1";

const customFetchFn = (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init);
};

export const apiSlice = createApi({
  reducerPath: "api/v1",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("origin", "http://localhost:3000");
    },
    fetchFn: customFetchFn,
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "Repo"],
});
