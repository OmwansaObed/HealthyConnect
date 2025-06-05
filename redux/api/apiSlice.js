import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  // prepareHeaders: (headers, { getState }) => {
  //     const token = getState().auth.token;
  //     if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  // },
});

export const apiSlice = createApi({
  baseQuery,
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: ["Job", "User", "Auth"],
});
