// src/Features/users/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* =============================
   TYPES
============================= */
export type UserRole =
  | "student"
  | "university_admin"
  | "system_admin";

export type User = {
  userID: number;               
  lastname: string;
  email: string;
  role: UserRole;
  kcseIndex?: string;           
  image_url?: string;
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
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
    },

    updateUser: (
      state,
      action: PayloadAction<Partial<User>>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

/* =============================
   EXPORTS
============================= */
export const { loginSuccess, logout, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
