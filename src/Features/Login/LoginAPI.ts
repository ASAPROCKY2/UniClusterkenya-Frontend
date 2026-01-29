// src/Features/auth/loginAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APiDomain";

/* =============================
   TYPES
============================= */
export type TLoginResponse = {
  message: string;
  token: string;
  user: {
    userID: number;
    firstname: string;
    lastname: string;
    email: string;
    role: "student" | "university_admin" | "system_admin";
    kcseIndex?: string;
    image_url?: string;
  };
};

export type LoginInputs = {
  email: string;
  password: string;
  kcseIndex?: string;
};

/* =============================
   API
============================= */
export const loginAPI = createApi({
  reducerPath: "loginAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain, // MUST be something like http://localhost:5000/api
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation<TLoginResponse, LoginInputs>({
      query: ({ email, password, kcseIndex }) => ({
        url: "auth/login", // ✅ no leading slash (important)
        method: "POST",
        body: {
          email: email.trim(),
          password,
          ...(kcseIndex ? { kcseIndex: kcseIndex.trim() } : {}),
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
