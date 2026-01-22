// src/Features/auth/loginAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES
============================= */

// ✅ Response from backend after login
export type TLoginResponse = {
  message: string;
  token: string;
  user: {
    userID: number;
    firstname: string;
    lastname: string;
    email: string;
    role: "student" | "university_admin" | "system_admin";
    kcseIndex?: string;     // ✅ only exists for students
    image_url?: string;
  };
};

// ✅ Login form inputs
export type LoginInputs = {
  email: string;
  password: string;
};

/* =============================
   API
============================= */
export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    // 🔑 Login user
    loginUser: builder.mutation<TLoginResponse, LoginInputs>({
      query: (loginData) => ({
        url: "/auth/login", // ✅ matches backend route
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});


export const { useLoginUserMutation } = loginAPI;
