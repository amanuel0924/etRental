import { apiSlice } from "./apiSlice.js"
import { PENDING_URL } from "../constants.js"

export const pendingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPending: builder.mutation({
      query: (data) => ({
        url: `${PENDING_URL}/`,
        method: "POST",
        body: { ...data, bid: Number(data.bid) },
      }),
    }),
    getAllPending: builder.query({
      query: () => ({
        url: `${PENDING_URL}/`,
        method: "GET",
      }),
    }),

    getSinglePending: builder.query({
      query: (id) => ({
        url: `${PENDING_URL}/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Pending"],
    }),
    acceptRenter: builder.mutation({
      query: (data) => ({
        url: `${PENDING_URL}/acceptBrokerRequest`,
        method: "POST",
        body: data,
      }),
    }),
    rejectRenter: builder.mutation({
      query: (data) => ({
        url: `${PENDING_URL}/rejectBrokerRequest`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useCreatePendingMutation,
  useGetAllPendingQuery,
  useGetSinglePendingQuery,
  useAcceptRenterMutation,
  useRejectRenterMutation,
} = pendingApi
