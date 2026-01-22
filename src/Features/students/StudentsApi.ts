// src/features/students/studentsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";
import type { RootState } from "../../app/store";

/* =============================
   TYPES
============================= */

// Base Student type (matches StudentsTable)
export type TStudent = {
  studentID: number;
  userID: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  gender: string;
  citizenship: string;
  highSchool: string;
  kcseIndex: string;
  meanGrade: string;
  agp: number;
  photoURL?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

// KCSE Result
export type TKcseResult = {
  resultID: number;
  studentID: number;
  subjectCode: string;
  subjectName: string;
  grade: string;
  points: number;
};

// Application (simplified for profile)
export type TApplication = {
  applicationID: number;
  choiceOrder: number;
  status: string;
  clusterScore?: number | null;
  programme: {
    programmeID: number;
    name: string;
    level?: string | null;
  };
};

// Placement
export type TPlacement = {
  placementID: number;
  placementStatus: string;
  placementDate?: string | null;
  programme: {
    programmeID: number;
    name: string;
  };
};

// Full student profile
export type TStudentFullProfile = TStudent & {
  kcseResults: TKcseResult[];
  applications: TApplication[];
  placements: TPlacement[];
};

/* =============================
   API
============================= */

export const studentsAPI = createApi({
  reducerPath: "studentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState & { auth?: { token?: string } })?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    /* =============================
       QUERIES
    ============================= */

    getStudents: builder.query<TStudent[], void>({
      query: () => "/students",
      transformResponse: (response: { data: TStudent[] }) => response.data,
      providesTags: ["Students"],
    }),

    getStudentById: builder.query<TStudent, number>({
      query: (id) => `/students/${id}`,
      transformResponse: (response: { data: TStudent }) => response.data,
      providesTags: ["Students"],
    }),

    getStudentByUserId: builder.query<TStudent, number>({
      query: (userID) => `/students/user/${userID}`,
      transformResponse: (response: { data: TStudent }) => response.data,
      providesTags: ["Students"],
    }),

    getStudentFullProfile: builder.query<TStudentFullProfile, number>({
      query: (studentID) => `/students/${studentID}/profile`,
      transformResponse: (response: { data: TStudentFullProfile }) => response.data,
      providesTags: ["Students"],
    }),

    /* =============================
       MUTATIONS
    ============================= */

    createStudent: builder.mutation<
      { message: string; data: TStudent },
      Partial<TStudent>
    >({
      query: (newStudent) => ({
        url: "/students",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["Students"],
    }),

    updateStudent: builder.mutation<
      { message: string },
      { studentID: number; updates: Partial<TStudent> }
    >({
      query: ({ studentID, updates }) => ({
        url: `/students/${studentID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Students"],
    }),

    deleteStudent: builder.mutation<{ message: string }, number>({
      query: (studentID) => ({
        url: `/students/${studentID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetStudentByUserIdQuery,
  useGetStudentFullProfileQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsAPI;
