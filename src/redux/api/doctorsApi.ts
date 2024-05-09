import build from "next/dist/build";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-Types";

const doctorsApi = baseApi.injectEndpoints({
    endpoints : (build) => ({
        createDoctor : build.mutation({
           
            query : (data)=> ({
                
                url: "/user/create-doctor",
                method : "POST",
                contentType : "multipart/form-data",
                data
            }),
            invalidatesTags : [tagTypes.doctor]
        })
    })
})

export const {useCreateDoctorMutation} = doctorsApi