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

export type TClusterSubject = {
  id: number;
  subjectCode: string;
  subjectName: string;
  minPoints: number;
  alternativeGroup?: number | null;
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

  clusterSubjects?: Record<number, TClusterSubject[]>;

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
  tagTypes: ["Programmes", "Clusters", "ClusterSubjects"],

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
      providesTags: ["Programmes"],
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
       LOOKUPS (BUG FIXED HERE)
    ============================= */

    getProgrammeLevels: builder.query<
      { levelID: number; name: string; description?: string }[],
      void
    >({
      query: () => "/programme/levels",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    // ✅ FIXED: matches backend GET /programme/clusters
    getProgrammeClusters: builder.query<TSProgrammeCluster[], void>({
      query: () => "/programme/clusters",
      transformResponse: (res: any) => res?.data ?? [],
      providesTags: ["Clusters"],
    }),

    getClusterSubjectsByCluster: builder.query<TClusterSubject[], number>({
      query: (clusterID) => `/cluster-subjects/cluster/${clusterID}`,
      transformResponse: (res: any) => res?.data ?? [],
      providesTags: ["ClusterSubjects"],
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

    getProgrammesWithFilters: builder.query<TProgramme[], TProgramFilter>({
      query: ({ level }) =>
        level ? `/programme/filter?level=${level}` : `/programme`,
      transformResponse: (res: any) => res?.data ?? [],
    }),
  }),
});

/* =============================
   EXPORT HOOKS (UNCHANGED)
============================= */

export const {
  useGetAllProgrammesQuery,
  useGetProgrammeByIdQuery,
  useCreateProgrammeMutation,
  useUpdateProgrammeByIdMutation,
  useDeleteProgrammeByIdMutation,
  useGetProgrammeLevelsQuery,
  useGetProgrammeClustersQuery,
  useGetClusterSubjectsByClusterQuery,
  useGetProgrammesByLevelQuery,
  useGetProgrammesByClusterQuery,
  useGetProgrammesWithFiltersQuery,
} = programmesAPI;
