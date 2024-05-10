import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //query is for only get api , rest all is mutation
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),

    getAllSchedules: build.query({
      query: () => ({
        url: "/schedule",
        method: "GET",
      }),
      providesTags: [tagTypes.schedule],
    }),
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
 useCreateScheduleMutation,useDeleteScheduleMutation,useGetAllSchedulesQuery
} = scheduleApi;
