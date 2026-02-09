import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES (MATCH BACKEND)
============================= */

//  Auth user (login response)
export type TAuthUser = {
  userID: number;
  email: string;
  role: "student" | "university_admin" | "system_admin";
  firstName?: string | null;
  lastName?: string | null;
  kcseIndex?: string | null;
  meanGrade?: string | null;
  agp?: number | null;
  image_url?: string | null;
};

//  Register payload
export type TRegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender?: string;
  citizenship?: string;
  highSchool?: string;
  kcseIndex?: string | null;
  meanGrade?: string | null;
  agp?: number | null;
  photoURL?: string | null;
};

//  Verify email
export type TVerifyUser = {
  email: string;
  verificationCode: string;
};

//  Login payload
export type TLoginRequest = {
  email: string;
  password: string;
  kcseIndex?: string; // REQUIRED only if role === student
};

export type TLoginResponse = {
  message: string;
  token: string;
  user: TAuthUser;
};

//  Full user (admin / profile)
export type TUser = {
  userID: number;
  email: string;
  role: string;
  isVerified: boolean;

  firstName?: string | null;
  lastName?: string | null;
  kcseIndex?: string | null;
  meanGrade?: string | null;
  agp?: number | null;
  photoURL?: string | null;
  createdAt?: string;

  gender?: string | null;      
  highSchool?: string | null;  
};

/* =============================
   API
============================= */

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    /* =============================
       AUTH
    ============================= */

    registerUser: builder.mutation<{ message: string }, TRegisterUser>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    verifyUser: builder.mutation<{ message: string }, TVerifyUser>({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body,
      }),
    }),

    loginUser: builder.mutation<TLoginResponse, TLoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    /* =============================
       USERS
    ============================= */

    getUsers: builder.query<TUser[], void>({
      query: () => "/users",
      transformResponse: (response: { data: any[] }) =>
        response.data.map((u) => ({
          userID: u.userID,
          email: u.email,
          role: u.role,
          isVerified: u.isVerified,
          firstName: u.firstName,
          lastName: u.lastName,
          kcseIndex: u.kcseIndex,
          meanGrade: u.meanGrade,
          agp: u.agp,
          photoURL: u.photoURL,
          createdAt: u.createdAt,
          gender: u.gender,          // ✅ added
          highSchool: u.highSchool,  // ✅ added
        })),
      providesTags: ["Users"],
    }),

    getUserById: builder.query<TUser, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: { data: any }) => ({
        userID: response.data.userID,
        email: response.data.email,
        role: response.data.role,
        isVerified: response.data.isVerified,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        kcseIndex: response.data.kcseIndex,
        meanGrade: response.data.meanGrade,
        agp: response.data.agp,
        photoURL: response.data.photoURL,
        createdAt: response.data.createdAt,
        gender: response.data.gender,         
        highSchool: response.data.highSchool,  
      }),
    }),

    updateUser: builder.mutation<
      { message: string },
      { id: number; updates: Partial<TUser> }
    >({
      query: ({ id, updates }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

/* =============================
   EXPORT HOOKS
============================= */

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAPI;
