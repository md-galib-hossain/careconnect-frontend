import {  tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //query is for only get api , rest all is mutation
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
    //   invalidatesTags
    }),
    getAllSpecialties: build.query({
        query: () => ({
          url: "/specialties",
          method: "GET",
        }),
        providesTags : [tagTypes.specialties]
      }),

  }),
});

export const { useCreateSpecialtyMutation,useGetAllSpecialtiesQuery } = specialtiesApi;
