import { apiSlice } from "./apiSlice.js"
import { Report_URL } from "../constants.js"

export const reportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (data) => ({
        url: `${Report_URL}/`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getallReports: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${Report_URL}/`,
        method: "GET",
        params: { pageNumber, keyword },
      }),
    }),

    getMyHouseReports: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${Report_URL}/myReports`,
        method: "GET",
        params: { pageNumber, keyword },
      }),
    }),
    resolveReport: builder.mutation({
      query: (id) => ({
        url: `${Report_URL}/resolve/${id}`,
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateReportMutation,
  useGetallReportsQuery,
  useResolveReportMutation,
  useGetMyHouseReportsQuery,
} = reportApi
