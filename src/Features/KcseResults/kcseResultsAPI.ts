// src/features/kcseresults/kcseResultsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES
============================= */

// Student details now included in the API response
export type TStudent = {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  citizenship?: string;
  highSchool?: string;
  kcseIndex?: string;
  meanGrade?: string;
  agp?: number;
  photoURL?: string;
};

export type TKcseSubjectResult = {
  resultID: number;
  userID: number;
  subjectCode: string;
  subjectName: string;
  grade: string;
  points: number;
  student?: TStudent; // <-- New field added
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

/* =============================
   API
============================= */
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
    /* CREATE KCSE RESULTS */
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

    /* GET ALL KCSE RESULTS (WITH STUDENT INFO) */
    getAllKcseResults: builder.query<TKcseSubjectResult[], void>({
      query: () => "/kcseresult",
      transformResponse: (response: { data: TKcseSubjectResult[] }) =>
        response.data,
      providesTags: ["KcseResults"],
    }),

    /* GET KCSE RESULTS BY USER ID (WITH STUDENT INFO) */
    getKcseResultsByUserId: builder.query<TKcseSubjectResult[], number>({
      query: (userID) => `/kcseresult/user/${userID}`,
      transformResponse: (response: { data: TKcseSubjectResult[] }) =>
        response.data,
      providesTags: ["KcseResults"],
    }),

    /* UPDATE KCSE RESULTS BY USER ID */
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

    /* DELETE KCSE RESULTS BY USER ID */
    deleteKcseResultsByUserId: builder.mutation<{ message: string }, number>({
      query: (userID) => ({
        url: `/kcseresult/user/${userID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["KcseResults"],
    }),
  }),
});

/* =============================
   HOOKS
============================= */
export const {
  useCreateKcseResultMutation,
  useGetAllKcseResultsQuery,
  useGetKcseResultsByUserIdQuery,
  useUpdateKcseResultsByUserIdMutation,
  useDeleteKcseResultsByUserIdMutation,
} = kcseResultsAPI;
