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

// ===== RTK QUERY APIS =====
import { userAPI } from "../Features/users/UsersApi";
import { studentsAPI } from "../Features/students/StudentsApi";
import { loginAPI } from "../Features/Login/LoginAPI";
import { kcseResultsAPI } from "../Features/KcseResults/kcseResultsAPI";
import { universityAPI } from "../Features/universities/UniversityAPI";
import { programmesAPI } from "../Features/programmes/ProgrammesAPI";
import { placementAPI } from "../Features/placement/placementAPI"; 

// ===== REDUCERS =====
import userReducer from "../Features/Login/UserSlice";

/* =============================
   ASYNC STORAGE (PROMISE-BASED)
============================ */
const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(localStorage.removeItem(key)),
};

/* =============================
   ROOT REDUCER
============================ */
const rootReducer = combineReducers({
  // 🔥 RTK Query reducers
  [userAPI.reducerPath]: userAPI.reducer,
  [studentsAPI.reducerPath]: studentsAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [kcseResultsAPI.reducerPath]: kcseResultsAPI.reducer,
  [universityAPI.reducerPath]: universityAPI.reducer,
  [programmesAPI.reducerPath]: programmesAPI.reducer,
  [placementAPI.reducerPath]: placementAPI.reducer, // ✅ ADD PLACEMENTS REDUCER

  // 🔒 Persisted slices
  user: userReducer,
});

/* =============================
   PERSIST CONFIG
============================ */
const persistConfig = {
  key: "root",
  version: 1,
  storage: asyncLocalStorage,
  whitelist: ["user"], // persist auth state only
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* =============================
   STORE
============================ */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(
      // 🔥 RTK Query middleware
      userAPI.middleware,
      studentsAPI.middleware,
      loginAPI.middleware,
      kcseResultsAPI.middleware,
      universityAPI.middleware,
      programmesAPI.middleware,
      placementAPI.middleware // ✅ ADD PLACEMENTS MIDDLEWARE
    ),
});

/* =============================
   PERSISTOR
============================ */
export const persistedStore = persistStore(store);

/* =============================
   TYPES
============================ */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
