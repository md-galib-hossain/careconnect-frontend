import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypeList } from '../tag-Types'


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://care-connect-backend.vercel.app/api/v1' }),
  endpoints: () => ({
   
  
  }),
  tagTypes : tagTypeList
})

