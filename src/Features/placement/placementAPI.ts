// src/features/placements/placementAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

/* =============================
   TYPES
============================= */

// Programme attached to placement
export type TPlacementProgramme = {
  programmeID: number;
  name: string;
  level?: string | null;
};

// Placement type (matches PlacementsTable + relations)
export type TPlacement = {
  placementID: number;
  userID: number;
  placementStatus: string;
  placementDate?: string | null;
  programme: TPlacementProgramme;
};

// Payload for creating a placement
export type TCreatePlacementPayload = {
  userID: number;
  programmeID: number;
  placementStatus?: string;
  placementDate?: string;
};

// Payload for updating placement
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

    // 🔹 Get all placements (admin)
    getAllPlacements: builder.query<TPlacement[], void>({
      query: () => "/placement",
      transformResponse: (response: { data: TPlacement[] }) => response.data,
      providesTags: ["Placements"],
    }),

    // 🔹 Get placement by placementID
    getPlacementById: builder.query<TPlacement, number>({
      query: (placementID) => `/placement/${placementID}`,
      transformResponse: (response: { data: TPlacement }) => response.data,
      providesTags: ["Placements"],
    }),

    // ⭐ Get placements for a specific user (STUDENT DASHBOARD)
    getPlacementsByUserId: builder.query<TPlacement[], number>({
      query: (userID) => `/placement/student/${userID}`,
      transformResponse: (response: { data: TPlacement[] }) => response.data,
      providesTags: ["Placements"],
    }),

    /* =============================
       MUTATIONS
    ============================= */

    // 🔹 Create placement
    createPlacement: builder.mutation<
      { message: string; data: TPlacement },
      TCreatePlacementPayload
    >({
      query: (newPlacement) => ({
        url: "/placement",
        method: "POST",
        body: newPlacement,
      }),
      invalidatesTags: ["Placements"],
    }),

    // 🔹 Update placement
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

    // 🔹 Delete placement
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
  useUpdatePlacementMutation,
  useDeletePlacementMutation,
} = placementAPI;
