import { configureStore, combineReducers } from "@reduxjs/toolkit";
import jobReducer from "./api/jobSlice";
import userReducer from "./api/userSlice";
import { apiSlice } from "./api/apiSlice";
import { usersApiSlice } from "./api/usersApiSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./store";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["job", "user"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  job: jobReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
