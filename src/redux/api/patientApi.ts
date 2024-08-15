import build from "next/dist/build";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-Types";
import { TMeta } from "@/types";

const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createDoctor: build.mutation({
    //   query: (data) => ({
    //     url: "/user/create-doctor",
    //     method: "POST",
    //     contentType: "multipart/form-data",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.doctor],
    // }),
    // getAllDoctors: build.query({
    //   query: (arg: Record<string, any>) => ({
    //     url: "/doctor",
    //     method: "GET",
    //     params: arg,
    //   }),
    //   transformResponse: (response: IDoctor[], meta: TMeta) => {
    //     return {
    //       doctors: response,
    //       meta,
    //     };
    //   },
    //   providesTags: [tagTypes.doctor],
    // }),
    // deleteDoctor: build.mutation({
    //   query: (id : string) => ({
    //     url: `/doctor/soft/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.doctor],
    // }),
    // getSingleDoctor: build.query({
    //   query: (id: any) => {
    //     return {
    //       url: `/doctor/${id}`,
    //       method: "GET",
    //     }
    //   },

    //   providesTags: [tagTypes.doctor],
    // }),
    updatePatient: build.mutation({
      query: (data : any) => {
        console.log(data)
        return {
            url: `/patient/${data?.id}`,
            method : "PATCH",
            data : data.body
          }
      },
      invalidatesTags : [tagTypes.patient,tagTypes.user]
    }),
  }),
});

export const {
 useUpdatePatientMutation
} = patientApi;
