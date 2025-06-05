import { apiSlice } from "./apiSlice";
import { JOBS_URL } from "../constants";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (jobData) => ({
        url: `${JOBS_URL}`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Job"],
    }),
    getJobs: builder.query({
      query: () => ({
        url: JOBS_URL,
        method: "GET",
      }),
      providesTags: (result) =>
        result?.jobs
          ? [
              ...result.jobs.map((job) => ({ type: "Job", id: job._id })),
              { type: "Job", id: "LIST" },
            ]
          : [{ type: "Job", id: "LIST" }],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `${JOBS_URL}`,
        method: "PATCH",
        body: { id, ...updateData },
      }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `${JOBS_URL}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApiSlice;
