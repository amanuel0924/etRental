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
      query: (id) => ({
        url: `${PENDING_URL}/${id}/accept`,
        method: "PUT",
      }),
    }),
    rejectRenter: builder.mutation({
      query: (id) => ({
        url: `${PENDING_URL}/${id}/reject`,
        method: "PUT",
      }),
    }),
    prorposeCounterOffer: builder.mutation({
      query: (data) => ({
        url: `${PENDING_URL}/${data.id}/counterOffer`,
        method: "PUT",
        body: { counterOfferPrice: Number(data.counterOfferPrice) },
      }),
    }),
    acceptCounterOffer: builder.mutation({
      query: (id) => ({
        url: `${PENDING_URL}/${id}/acceptCounterOffer`,
        method: "PUT",
      }),
    }),
    rejectCounterOffer: builder.mutation({
      query: (id) => ({
        url: `${PENDING_URL}/${id}/rejectCounterOffer`,
        method: "PUT",
      }),
    }),
    getMyPending: builder.query({
      query: () => ({
        url: `${PENDING_URL}/myPending`,
        method: "GET",
      }),
    }),
    getPendingGroupByStatus: builder.query({
      query: () => ({
        url: `${PENDING_URL}/getPendingGroupByStatus`,
        method: "GET",
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
  useProrposeCounterOfferMutation,
  useAcceptCounterOfferMutation,
  useRejectCounterOfferMutation,
  useGetMyPendingQuery,
  useGetPendingGroupByStatusQuery,
} = pendingApi
