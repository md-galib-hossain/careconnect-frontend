import build from "next/dist/build";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-Types";
import { IDoctor } from "@/types/doctor";
import { TMeta } from "@/types";

const doctorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    getAllDoctors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDoctor[], meta: TMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),
    deleteDoctor: build.mutation({
      query: (id: string) => ({
        url: `/doctor/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    getSingleDoctor: build.query({
      query: (id: any) => {
        return {
          url: `/doctor/${id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.doctor],
    }),
    updateDoctor: build.mutation({
      query: (data: any) => ({
        url: `/doctor/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
    getDoctorStatistics: build.query({
      query: ({ id, startDate, endDate }: { id: string; startDate?: string; endDate?: string }) => {
        console.log(id,startDate,endDate)
        return {
          url: `/doctor/statistics/${id}`,
          method: "GET",
          params: { startDate, endDate }
        };
      },
      providesTags: [
        tagTypes.doctor,
        tagTypes.patient,
        tagTypes.appointment,
        tagTypes.review,
        tagTypes.payment,
      ],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useDeleteDoctorMutation,
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,useGetDoctorStatisticsQuery
} = doctorsApi;
