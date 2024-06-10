import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //query is for only get api , rest all is mutation
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),

    getAllSchedules: build.query({
      query: (arg : Record<string,any>) => ({
        url: "/schedule",
        method: "GET",
        params:arg
      }), transformResponse: (response: any) => {
        return {
          schedules: response?.data,
          meta : response?.meta,
        };
      },
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
