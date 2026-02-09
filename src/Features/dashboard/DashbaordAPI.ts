// src/features/dashboard/dashboardAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

/* =============================
   TYPES
============================= */

export type TDashboardStats = {
  students: number;
  universities: number;
  programmes: number;
  applications: number;
  placements: number;
};

export type TMonthlyData = {
  month: string;
  count: number;
};

export type TDashboardAnalytics = {
  placementsPerMonth: TMonthlyData[];
  applicationsPerMonth: TMonthlyData[];
};

/* =============================
   API
============================= */

export const dashboardAPI = createApi({
  reducerPath: "dashboardAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState & { auth?: { token?: string } })?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    // Main dashboard totals
    getDashboardStats: builder.query<TDashboardStats, void>({
      query: () => "/admin/dashboard-stats",
      providesTags: ["Dashboard"],
    }),

    // Placements grouped by month
    getPlacementsPerMonth: builder.query<TMonthlyData[], void>({
      query: () => "/admin/analytics/placements-per-month",
      providesTags: ["Dashboard"],
    }),

    // Applications grouped by month
    getApplicationsPerMonth: builder.query<TMonthlyData[], void>({
      query: () => "/admin/analytics/applications-per-month",
      providesTags: ["Dashboard"],
    }),

    // Combined analytics (placements + applications)
    getDashboardAnalytics: builder.query<TDashboardAnalytics, void>({
      query: () => "/admin/analytics",
      providesTags: ["Dashboard"],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useGetDashboardStatsQuery,
  useGetPlacementsPerMonthQuery,
  useGetApplicationsPerMonthQuery,
  useGetDashboardAnalyticsQuery,
} = dashboardAPI;
