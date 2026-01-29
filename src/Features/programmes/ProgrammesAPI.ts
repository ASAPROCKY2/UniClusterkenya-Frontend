import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES
============================= */

export type TSProgrammeCluster = {
  clusterID: number;
  clusterCode: string;
  name: string;
};

export type TProgramme = {
  programmeID: number;
  universityID: number;
  name: string;
  level?: string;
  durationYears?: number;
  minAGP?: number;
  helbEligible: boolean;
  scholarshipAvailable: boolean;

  clusters?: TSProgrammeCluster[];

  university?: {
    universityID: number;
    name: string;
    type: string;
    county?: string;
  };
};

export type TCreateProgramme = {
  universityID: number;
  name: string;
  level?: string;
  durationYears?: number;
  minAGP?: number;
  helbEligible?: boolean;
  scholarshipAvailable?: boolean;
  clusterIDs?: number[];
};

export type TUpdateProgramme = Partial<{
  name: string;
  level: string;
  durationYears: number;
  minAGP: number;
  helbEligible: boolean;
  scholarshipAvailable: boolean;
  clusterIDs: number[];
}>;

/* =============================
   FILTER TYPE
============================= */

export type TProgramFilter = {
  level?: string;
  clusterID?: number;
};

/* =============================
   PROGRAMMES API
============================= */

export const programmesAPI = createApi({
  reducerPath: "programmesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Programmes"],

  endpoints: (builder) => ({

    /* =============================
       BASIC CRUD
    ============================= */

    getAllProgrammes: builder.query<TProgramme[], void>({
      query: () => "/programme",
      transformResponse: (res: any) => res?.data ?? [],
      providesTags: ["Programmes"],
    }),

    getProgrammeById: builder.query<TProgramme, number>({
      query: (id) => `/programme/${id}`,
      transformResponse: (res: any) => res?.data ?? null,
    }),

    createProgramme: builder.mutation<
      { message: string; data: TProgramme },
      TCreateProgramme
    >({
      query: (body) => ({
        url: "/programme",
        method: "POST",
        body: {
          ...body,
          helbEligible: body.helbEligible ?? false,
          scholarshipAvailable: body.scholarshipAvailable ?? false,
        },
      }),
      invalidatesTags: ["Programmes"],
    }),

    updateProgrammeById: builder.mutation<
      { message: string },
      { programmeID: number; updates: TUpdateProgramme }
    >({
      query: ({ programmeID, updates }) => ({
        url: `/programme/${programmeID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Programmes"],
    }),

    deleteProgrammeById: builder.mutation<{ message: string }, number>({
      query: (programmeID) => ({
        url: `/programme/${programmeID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Programmes"],
    }),

    /* =============================
       LOOKUPS
    ============================= */

    getProgrammeLevels: builder.query<
      { levelID: number; name: string; description?: string }[],
      void
    >({
      query: () => "/programme/levels",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getProgrammeClusters: builder.query<TSProgrammeCluster[], void>({
      query: () => "/programme/clusters",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    /* =============================
       FILTERED QUERIES
    ============================= */

    getProgrammesByLevel: builder.query<TProgramme[], string>({
      query: (level) => `/programme/level/${level}`,
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getProgrammesByCluster: builder.query<TProgramme[], number>({
      query: (clusterID) => `/programme/cluster/${clusterID}`,
      transformResponse: (res: any) => res?.data ?? [],
    }),

    /**
     * ✅ SMART FILTER HANDLER
     * Matches backend routes exactly
     */
    getProgrammesWithFilters: builder.query<TProgramme[], TProgramFilter>({
      query: ({ level, clusterID }) => {
        // BOTH filters → /programme/filter
        if (level && clusterID) {
          return `/programme/filter?level=${level}&clusterID=${clusterID}`;
        }

        // Level only
        if (level) {
          return `/programme/level/${level}`;
        }

        // Cluster only
        if (clusterID !== undefined) {
          return `/programme/cluster/${clusterID}`;
        }

        // Fallback
        return `/programme`;
      },
      transformResponse: (res: any) => res?.data ?? [],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useGetAllProgrammesQuery,
  useGetProgrammeByIdQuery,
  useCreateProgrammeMutation,
  useUpdateProgrammeByIdMutation,
  useDeleteProgrammeByIdMutation,
  useGetProgrammeLevelsQuery,
  useGetProgrammeClustersQuery,
  useGetProgrammesByLevelQuery,
  useGetProgrammesByClusterQuery,
  useGetProgrammesWithFiltersQuery,
} = programmesAPI;
