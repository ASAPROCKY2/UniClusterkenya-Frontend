// src/features/placements/placementAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

/* =============================
   TYPES
============================= */

export type TPlacementUniversity = {
  universityID: number;
  name: string;
};

export type TPlacementProgramme = {
  programmeID: number;
  name: string;
  level?: string | null;
  university?: TPlacementUniversity | null;
};

export type TPlacement = {
  placementID: number;
  userID: number;
  placementStatus: string;
  placementDate?: string | null;
  programme: TPlacementProgramme;
};

export type TCreatePlacementPayload = {
  userID: number;
  programmeID: number;
  placementStatus?: string;
  placementDate?: string;
};

export type TUpdatePlacementPayload = {
  placementID: number;
  updates: Partial<{
    programmeID: number;
    placementStatus: string;
    placementDate: string;
  }>;
};

/* =============================
   API
============================= */

export const placementAPI = createApi({
  reducerPath: "placementAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState & {
        auth?: { token?: string };
      })?.auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Placements"],
  endpoints: (builder) => ({
    /* =============================
       QUERIES
    ============================= */

    // Admin – all placements
    getAllPlacements: builder.query<TPlacement[], void>({
      query: () => "/placement",
      transformResponse: (res: { data: TPlacement[] }) => res.data,
      providesTags: ["Placements"],
    }),

    // Single placement
    getPlacementById: builder.query<TPlacement, number>({
      query: (placementID) => `/placement/${placementID}`,
      transformResponse: (res: { data: TPlacement }) => res.data,
      providesTags: ["Placements"],
    }),

    // Student placements
    getPlacementsByUserId: builder.query<TPlacement[], number>({
      query: (userID) => `/placement/student/${userID}`,
      transformResponse: (res: { data: TPlacement[] }) => res.data,
      providesTags: ["Placements"],
    }),

    /* =============================
       MUTATIONS
    ============================= */

    // Manual placement
    createPlacement: builder.mutation<
      { message: string; data: TPlacement },
      TCreatePlacementPayload
    >({
      query: (payload) => ({
        url: "/placement",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Placements"],
    }),

    // ⭐ AUTO PLACEMENT (NEW)
    autoPlacement: builder.mutation<
      { message: string; data?: TPlacement[] },
      void
    >({
      query: () => ({
        url: "/placement/auto",
        method: "POST",
      }),
      invalidatesTags: ["Placements"],
    }),

    // Update placement
    updatePlacement: builder.mutation<
      { message: string },
      TUpdatePlacementPayload
    >({
      query: ({ placementID, updates }) => ({
        url: `/placement/${placementID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Placements"],
    }),

    // Delete placement
    deletePlacement: builder.mutation<{ message: string }, number>({
      query: (placementID) => ({
        url: `/placement/${placementID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Placements"],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useGetAllPlacementsQuery,
  useGetPlacementByIdQuery,
  useGetPlacementsByUserIdQuery,
  useCreatePlacementMutation,
  useAutoPlacementMutation, 
  useUpdatePlacementMutation,
  useDeletePlacementMutation,
} = placementAPI;
