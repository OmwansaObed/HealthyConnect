import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";

const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export default store;
