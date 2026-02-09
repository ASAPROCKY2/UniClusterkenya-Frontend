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
  university?: TPlacementUniversity | null; // <-- added
};

export type TPlacementStudent = {
  userID: number;
  firstName: string;
  lastName: string;
};

export type TPlacement = {
  placementID: number;
  placementStatus: string;
  placementDate?: string | null;
  programme: TPlacementProgramme;
  student?: TPlacementStudent | null;
  university?: TPlacementUniversity | null;
};

export type TCreatePlacementPayload = {
  userID: number;
  programmeID: number;
  universityID: number;
  applicationID: number;
  year: number;
  placementDate?: string;
};

export type TUpdatePlacementPayload = {
  placementID: number;
  updates: Partial<{
    programmeID: number;
    universityID: number;
    placementDate: string;
    placementStatus: string;
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
      const token = (getState() as RootState & { auth?: { token?: string } })?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Placements"],
  endpoints: (builder) => ({
    getAllPlacements: builder.query<TPlacement[], void>({
      query: () => "/placement",
      transformResponse: (res: { data: TPlacement[] }) => res.data,
      providesTags: ["Placements"],
    }),
    getPlacementById: builder.query<TPlacement, number>({
      query: (placementID) => `/placement/${placementID}`,
      transformResponse: (res: { data: TPlacement }) => res.data,
      providesTags: ["Placements"],
    }),
    getPlacementsByUserId: builder.query<TPlacement[], number>({
      query: (userID) => `/placement/student/${userID}`,
      transformResponse: (res: { data: TPlacement[] }) => res.data,
      providesTags: ["Placements"],
    }),
    createPlacement: builder.mutation<{ message: string; data: TPlacement }, TCreatePlacementPayload>({
      query: (payload) => ({
        url: "/placement",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Placements"],
    }),
    autoPlacement: builder.mutation<{ message: string; data?: TPlacement[] }, { year: number }>({
      query: ({ year }) => ({
        url: `/placement/auto?year=${year}`,
        method: "POST",
      }),
      invalidatesTags: ["Placements"],
    }),
    updatePlacement: builder.mutation<{ message: string }, TUpdatePlacementPayload>({
      query: ({ placementID, updates }) => ({
        url: `/placement/${placementID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Placements"],
    }),
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
