import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

/* =============================
   TYPES
============================= */

export type TStudent = {
  userID: number;
  firstName: string;
  lastName: string;
};

export type TApplicationProgramme = {
  programmeID: number;
  name: string;
  level?: string | null;
};

export type TApplication = {
  applicationID: number;
  userID: number;
  choiceOrder: number;
  applicationDate: string;
  status: string;
  clusterScore?: string | null;
  programme: TApplicationProgramme;
  student: TStudent; // <-- NEW: include student info
};

// Payload for creating an application
export type TCreateApplicationPayload = {
  userID: number; // backend supports userID or studentID
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

// Cluster subject for validation
export type TClusterSubject = {
  id: number;
  subjectCode: string;
  subjectName: string;
  minPoints: number;
  alternativeGroup?: number | null;
};

/* =============================
   API
============================= */

export const applicationAPI = createApi({
  reducerPath: "applicationAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Applications", "ApplicationWindows", "ClusterSubjects"],
  endpoints: (builder) => ({
    /* =============================
       APPLICATION QUERIES
    ============================= */
    getAllApplications: builder.query<TApplication[], void>({
      query: () => "/application",
      transformResponse: (res: { data: TApplication[] }) => res.data,
      providesTags: ["Applications"],
    }),

    getApplicationById: builder.query<TApplication, number>({
      query: (applicationID) => `/application/${applicationID}`,
      transformResponse: (res: { data: TApplication }) => res.data,
      providesTags: ["Applications"],
    }),

    getApplicationsByUserId: builder.query<TApplication[], number>({
      query: (userID) => `/application/student/${userID}`,
      transformResponse: (res: { data: TApplication[] }) => res.data,
      providesTags: ["Applications"],
    }),

    // Fetch cluster subjects for a programme
    getProgrammeClusterSubjects: builder.query<TClusterSubject[], number>({
      query: (programmeID) => `/programmes/${programmeID}/clusters-with-subjects`,
      transformResponse: (res: { data: TClusterSubject[] }) => res.data,
      providesTags: ["ClusterSubjects"],
    }),

    /* =============================
       APPLICATION MUTATIONS
    ============================= */
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
      transformResponse: (res: { data: TApplicationWindow[] }) => res.data,
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
  useGetProgrammeClusterSubjectsQuery,
} = applicationAPI;
