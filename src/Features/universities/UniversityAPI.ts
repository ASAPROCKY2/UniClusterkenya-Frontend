import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES
============================= */

export type TUniversity = {
  universityID: number;
  name: string;
  type: string;
  county?: string | null;
  logoURL?: string | null;
  governmentScholarship?: boolean;
  helbEligible?: boolean;
};

export type TProgramme = {
  programmeID: number;
  universityID: number;
  name: string;
  level?: string | null;
  durationYears?: number | null;
  minAGP?: number | null;
  helbEligible?: boolean;
  scholarshipAvailable?: boolean;
};

export type TUniversityWithProgrammes = TUniversity & {
  programmes: TProgramme[];
};

/* =============================
   API
============================= */

export const universityAPI = createApi({
  reducerPath: "universityAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Universities"],
  endpoints: (builder) => ({
    // Create university
    createUniversity: builder.mutation<
      { message: string; data: TUniversity },
      Partial<TUniversity>
    >({
      query: (body) => ({
        url: "/university",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Universities"],
    }),

    // Get all universities
    getAllUniversities: builder.query<TUniversity[], void>({
      query: () => "/university",
      transformResponse: (response: { data: TUniversity[] }) => response.data,
      providesTags: ["Universities"],
    }),

    // Get university by ID
    getUniversityById: builder.query<TUniversity, number>({
      query: (id) => `/university/${id}`,
      transformResponse: (response: { data: TUniversity }) => response.data,
      providesTags: ["Universities"],
    }),

    // Update university by ID
    updateUniversity: builder.mutation<
      { message: string },
      { id: number; updates: Partial<TUniversity> }
    >({
      query: ({ id, updates }) => ({
        url: `/university/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Universities"],
    }),

    // Delete university by ID
    deleteUniversity: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/university/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Universities"],
    }),

    // Get university with programmes
    getUniversityWithProgrammes: builder.query<
      TUniversityWithProgrammes,
      number
    >({
      query: (id) => `/university/full/${id}`,
      transformResponse: (response: { data: TUniversityWithProgrammes }) =>
        response.data,
      providesTags: ["Universities"],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useCreateUniversityMutation,
  useGetAllUniversitiesQuery,
  useGetUniversityByIdQuery,
  useUpdateUniversityMutation,
  useDeleteUniversityMutation,
  useGetUniversityWithProgrammesQuery,
} = universityAPI;
