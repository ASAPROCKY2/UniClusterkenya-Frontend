// src/Features/users/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* =============================
   TYPES
============================= */
export type UserRole = "student" | "university_admin" | "system_admin";

export type User = {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  kcseIndex?: string;
  meanGrade?: string;
  imageUrl?: string;
};

export type UserState = {
  token: string | null;
  user: User | null;
};

/* =============================
   INITIAL STATE
============================= */
const initialState: UserState = {
  token: null,
  user: null,
};

/* =============================
   SLICE
============================= */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      // Map API snake_case fields to camelCase
      const u = action.payload.user;
      state.token = action.payload.token;
      state.user = {
        userID: u.userID,
        firstName: u.first_name ?? "—",
        lastName: u.last_name ?? "—",
        email: u.email,
        role: u.role,
        kcseIndex: u.kcse_index ?? "—",
        meanGrade: u.mean_grade ?? "—",
        imageUrl: u.image_url ?? null,
      };
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

/* =============================
   EXPORTS
============================= */
export const { loginSuccess, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
