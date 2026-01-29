// src/app/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { userAPI } from "../Features/users/UsersApi";
import { studentsAPI } from "../Features/students/StudentsApi";
import { loginAPI } from "../Features/Login/LoginAPI"; 
import userReducer from "../Features/Login/UserSlice"; 

/* =============================
   ASYNC STORAGE (PROMISE-BASED)
============================= */
const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(localStorage.removeItem(key)),
};

/* =============================
   ROOT REDUCER
============================= */
const rootReducer = combineReducers({
  // 🔥 RTK Query APIs
  [userAPI.reducerPath]: userAPI.reducer,
  [studentsAPI.reducerPath]: studentsAPI.reducer, // 👈 new student API slice
  [loginAPI.reducerPath]: loginAPI.reducer,

  // persistent slices
  user: userReducer,
});

/* =============================
   PERSIST CONFIG
============================= */
const persistConfig = {
  key: "root",
  version: 1,
  storage: asyncLocalStorage,
  whitelist: ["user"], // persist the user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* =============================
   STORE
============================= */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      // 🔥 RTK Query middleware
      userAPI.middleware,
      studentsAPI.middleware, // 👈 make sure middleware is added
      loginAPI.middleware
    ),
});

/* =============================
   PERSISTOR
============================= */
export const persistedStore = persistStore(store);

/* =============================
   TYPES
============================= */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
