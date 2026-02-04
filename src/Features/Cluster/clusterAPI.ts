// src/features/clusters/clusterAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

// Types
export type TCluster = {
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

// API - UPDATED to match actual backend routes
export const clusterAPI = createApi({
  reducerPath: "clusterAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Clusters", "ClusterSubjects"],
  endpoints: (builder) => ({
    getClustersByProgramme: builder.query<TCluster[], number>({
     
      query: (programmeID) => ({
        url: `/programme/${programmeID}`,
 
      }),
      // Since programme endpoint includes clusters in response
      transformResponse: (response: any) => {
        return response?.data?.clusters || [];
      },
      providesTags: ["Clusters"],
    }),
    
    getClusterSubjectsByCluster: builder.query<TClusterSubject[], number>({
      // Changed from: /cluster-subjects/{clusterID}
      // To: /cluster-subjects/cluster/{clusterID} (matches backend route)
      query: (clusterID) => `/cluster-subjects/cluster/${clusterID}`,
      providesTags: ["ClusterSubjects"],
    }),
  }),
});

export const {
  useGetClustersByProgrammeQuery,
  useGetClusterSubjectsByClusterQuery,
} = clusterAPI;