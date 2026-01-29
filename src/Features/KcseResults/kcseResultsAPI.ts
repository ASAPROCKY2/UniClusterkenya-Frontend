import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

export type TKcseSubjectResult = {
  resultID: number;
  userID: number;
  subjectCode: string;
  subjectName: string;
  grade: string;
  points: number;
};

export type TCreateKcseResult = {
  userID: number;
  results: {
    subjectCode: string;
    subjectName: string;
    grade: string;
    points: number;
  }[];
};

export type TUpdateKcseResult = Partial<{
  subjectCode: string;
  subjectName: string;
  grade: string;
  points: number;
}>;

export const kcseResultsAPI = createApi({
  reducerPath: "kcseResultsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["KcseResults"],
  endpoints: (builder) => ({
    createKcseResult: builder.mutation<
      { message: string; data: TKcseSubjectResult[] },
      TCreateKcseResult
    >({
      query: (body) => ({
        url: "/kcseresult",
        method: "POST",
        body,
      }),
      invalidatesTags: ["KcseResults"],
    }),

    getAllKcseResults: builder.query<TKcseSubjectResult[], void>({
      query: () => "/kcseresult",
      transformResponse: (response: { data: TKcseSubjectResult[] }) =>
        response.data,
      providesTags: ["KcseResults"],
    }),

    getKcseResultsByUserId: builder.query<TKcseSubjectResult[], number>({
      query: (userID) => `/kcseresult/user/${userID}`,
      transformResponse: (response: { data: TKcseSubjectResult[] }) =>
        response.data,
      providesTags: ["KcseResults"],
    }),

    updateKcseResultsByUserId: builder.mutation<
      { message: string },
      { userID: number; updates: TUpdateKcseResult }
    >({
      query: ({ userID, updates }) => ({
        url: `/kcseresult/user/${userID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["KcseResults"],
    }),

    deleteKcseResultsByUserId: builder.mutation<{ message: string }, number>({
      query: (userID) => ({
        url: `/kcseresult/user/${userID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["KcseResults"],
    }),
  }),
});

export const {
  useCreateKcseResultMutation,
  useGetAllKcseResultsQuery,
  useGetKcseResultsByUserIdQuery,
  useUpdateKcseResultsByUserIdMutation,
  useDeleteKcseResultsByUserIdMutation,
} = kcseResultsAPI;
