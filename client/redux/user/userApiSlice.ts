"use client";
import customTransformResponse from "@/lib/transformResponse";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: customTransformResponse<User>("id"),
    }),
  }),
});

export const { useGetAllUsersQuery } = userApiSlice;
