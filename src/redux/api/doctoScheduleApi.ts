import { TMeta } from "@/types";
import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints : (build) => ({
    createDoctorSchedule : build.mutation({
        query : (data) => ({
            url: '/doctor-schedule',
            method : 'POST',
            cache : "no-store",

            data
        }),
        invalidatesTags : [tagTypes.doctorSchedule,tagTypes.schedule]
    }),
    getAllDoctorSchedules: build.query({
        query: (arg: Record<string, any>) => {
           return {
              url: '/doctor-schedule',
              method: 'GET',
              cache : "no-store",

              params: arg,
           };
        },
        transformResponse: (response: [], meta: TMeta) => {
           return {
              doctorSchedules: response,
              meta,
           };
        },
        providesTags: [tagTypes.doctorSchedule],
     }),
     getDoctorSchedule: build.query({
        query: (id: string | string[] | undefined) => ({
           url: `/doctor-schedule/${id}`,
           method: 'GET',
           cache : "no-store"

        }),
        providesTags: [tagTypes.doctorSchedule],
     }),
     getMySchedule: build.query({
        query: () => ({
           url: '/doctor-schedule/my-schedules',
           method: 'GET',
           cache : "no-store"

        }),
        providesTags: [tagTypes.doctorSchedule],
     }),

     deleteDoctorSchedule: build.mutation({
        query: (id: string) => ({
           url: `/doctor-schedule/${id}`,
           method: 'DELETE',
           cache : "no-store"

        }),
        invalidatesTags: [tagTypes.doctorSchedule],
     }),
  }),
});

export const {useCreateDoctorScheduleMutation,useGetAllDoctorSchedulesQuery,useGetDoctorScheduleQuery,useGetMyScheduleQuery,useDeleteDoctorScheduleMutation} = doctorScheduleApi