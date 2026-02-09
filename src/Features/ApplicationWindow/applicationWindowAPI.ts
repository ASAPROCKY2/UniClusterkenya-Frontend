// src/features/applicationWindows/applicationWindow.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES
============================= */

export type TApplicationWindow = {
  windowID: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  programmeID: number;
  totalSlots: number;
  availableSlots: number;
};

/* =============================
   API
============================= */

export const applicationWindowAPI = createApi({
  reducerPath: "applicationWindowAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["ApplicationWindows"],
  endpoints: (builder) => ({
    // Create application window
    createApplicationWindow: builder.mutation<
      { message: string; data: TApplicationWindow },
      Partial<TApplicationWindow>
    >({
      query: (body) => ({
        url: "/application-window",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ApplicationWindows"],
    }),

    // Get all application windows
    getAllApplicationWindows: builder.query<TApplicationWindow[], void>({
      query: () => "/application-window",
      transformResponse: (response: { data: TApplicationWindow[] }) =>
        response.data,
      providesTags: ["ApplicationWindows"],
    }),

    // Get application window by ID
    getApplicationWindowById: builder.query<TApplicationWindow, number>({
      query: (id) => `/application-window/${id}`,
      transformResponse: (response: { data: TApplicationWindow }) =>
        response.data,
      providesTags: ["ApplicationWindows"],
    }),

    // Update application window by ID
    updateApplicationWindow: builder.mutation<
      { message: string; data: any },
      { id: number; updates: Partial<TApplicationWindow> }
    >({
      query: ({ id, updates }) => ({
        url: `/application-window/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["ApplicationWindows"],
    }),

    // Delete application window by ID
    deleteApplicationWindow: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/application-window/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ApplicationWindows"],
    }),

    // Get all active application windows
    getActiveApplicationWindows: builder.query<TApplicationWindow[], void>({
      query: () => "/application-window/active",
      transformResponse: (response: { data: TApplicationWindow[] }) =>
        response.data,
      providesTags: ["ApplicationWindows"],
    }),

    // Filter application windows
    filterApplicationWindows: builder.query<
      TApplicationWindow[],
      Partial<{
        programmeID: number;
        isActive: boolean;
        startDate: string;
        endDate: string;
      }>
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.programmeID) params.append("programmeID", filters.programmeID.toString());
        if (filters.isActive !== undefined) params.append("isActive", filters.isActive.toString());
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);
        return `/application-window/filter?${params.toString()}`;
      },
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
  useCreateApplicationWindowMutation,
  useGetAllApplicationWindowsQuery,
  useGetApplicationWindowByIdQuery,
  useUpdateApplicationWindowMutation,
  useDeleteApplicationWindowMutation,
  useGetActiveApplicationWindowsQuery,
  useFilterApplicationWindowsQuery,
} = applicationWindowAPI;
