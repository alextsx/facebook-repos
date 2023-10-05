"use client";
import { apiSlice } from "../api/apiSlice";
import customTransformResponse from "@/lib/transformResponse";

const RELATIVE_URL = "/repository";

export const repoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReposByQuery: builder.query({
      query: (q = "") => ({
        url: `${RELATIVE_URL}`,
        method: "GET",
        params: { q },
      }),
      providesTags: ["Repo"],
      transformResponse: customTransformResponse<Repository>("full_name"),
    }),
    getRepoContribution: builder.query({
      query: (id: string) => ({
        url: `${RELATIVE_URL}/${id}/contributions`,
        method: "GET",
      }),
      transformResponse: (contributions: ContributionResponse) =>
        contributions?.map((contribution) => ({
          userId: contribution?.userId,
        })),
    }),
  }),
});

export const { useGetReposByQueryQuery, useGetRepoContributionQuery } =
  repoApiSlice;
