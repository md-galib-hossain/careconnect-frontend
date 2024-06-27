import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";
import { TMeta } from "@/types/common";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.appointment,tagTypes.review],
    }),
    getAllReviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/review",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: TMeta) => {
        return {
          reviews: response,
          meta,
        };
      },
      providesTags: [tagTypes.appointment,tagTypes.review],
    })
 

  }),
});

export const {
 useCreateReviewMutation,useGetAllReviewsQuery


} = reviewApi;