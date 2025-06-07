import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `${USERS_URL}`,
        method: "PUT",
        body: { id, ...updateData },
      }),
      invalidatesTags: ["User"],
    }),
    bulkDeleteUsers: builder.mutation({
      query: (ids) => ({
        url: `${USERS_URL}`,
        method: "PATCH",
        body: { ids },
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
} = usersApiSlice;
