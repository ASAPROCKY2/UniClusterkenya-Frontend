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

// ✅ PROMISE-based storage wrapper
const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

// -------------------------
// VALID REDUCER
// -------------------------
const rootReducer = combineReducers({
  dummy: (state = {}) => state,
});

// -------------------------
// PERSIST CONFIG
// -------------------------
const persistConfig = {
  key: "root",
  version: 1,
  storage: asyncLocalStorage,
  whitelist: [], // no slices yet
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// -------------------------
// STORE
// -------------------------
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// -------------------------
// PERSISTOR
// -------------------------
export const persistedStore = persistStore(store);

// -------------------------
// TYPES
// -------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
