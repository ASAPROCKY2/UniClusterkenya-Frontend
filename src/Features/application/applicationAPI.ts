// src/features/applications/applicationAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

/* =============================
   TYPES
============================= */

// Programme attached to application
export type TApplicationProgramme = {
  programmeID: number;
  name: string;
  level?: string | null;
};

// Application type
export type TApplication = {
  applicationID: number;
  userID: number;
  choiceOrder: number;
  applicationDate: string;
  status: string;
  clusterScore?: string | null;
  programme: TApplicationProgramme;
};

// Payload for creating an application
export type TCreateApplicationPayload = {
  userID: number;
  programmeID: number;
  choiceOrder: number;
};

// Payload for updating application
export type TUpdateApplicationPayload = {
  applicationID: number;
  updates: Partial<{
    choiceOrder: number;
    status: string;
    clusterScore: string;
  }>;
};

// Application window type
export type TApplicationWindow = {
  windowID: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

/* =============================
   API
============================= */

export const applicationAPI = createApi({
  reducerPath: "applicationAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      // ✅ CORRECT: token lives directly on user slice
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Applications", "ApplicationWindows"],
  endpoints: (builder) => ({
    /* =============================
       APPLICATION QUERIES
    ============================= */

    // Get all applications (admin)
    getAllApplications: builder.query<TApplication[], void>({
      query: () => "/application",
      transformResponse: (response: { data: TApplication[] }) => response.data,
      providesTags: ["Applications"],
    }),

    // Get application by ID
    getApplicationById: builder.query<TApplication, number>({
      query: (applicationID) => `/application/${applicationID}`,
      transformResponse: (response: { data: TApplication }) => response.data,
      providesTags: ["Applications"],
    }),

    // ✅ FIXED: matches backend route exactly
    // GET /application/student/:studentID
    getApplicationsByUserId: builder.query<TApplication[], number>({
      query: (userID) => `/application/student/${userID}`,
      transformResponse: (response: { data: TApplication[] }) => response.data,
      providesTags: ["Applications"],
    }),

    /* =============================
       APPLICATION MUTATIONS
    ============================= */

    // Create application
    createApplication: builder.mutation<
      { message: string; data: TApplication },
      TCreateApplicationPayload
    >({
      query: (newApplication) => ({
        url: "/application",
        method: "POST",
        body: newApplication,
      }),
      invalidatesTags: ["Applications"],
    }),

    // Update application
    updateApplication: builder.mutation<
      { message: string },
      TUpdateApplicationPayload
    >({
      query: ({ applicationID, updates }) => ({
        url: `/application/${applicationID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Applications"],
    }),

    // Delete application
    deleteApplication: builder.mutation<{ message: string }, number>({
      query: (applicationID) => ({
        url: `/application/${applicationID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),

    /* =============================
       APPLICATION WINDOW QUERIES
    ============================= */

    getAllApplicationWindows: builder.query<TApplicationWindow[], void>({
      query: () => "/application-window",
      transformResponse: (response: { data: TApplicationWindow[] }) =>
        response.data,
      providesTags: ["ApplicationWindows"],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useGetApplicationsByUserIdQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useGetAllApplicationWindowsQuery,
} = applicationAPI;
