import { apiSlice } from "./apiSlice.js"
import { HOUSE_URL } from "../constants.js"

export const houseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createHouse: builder.mutation({
      query: (data) => ({
        url: `${HOUSE_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getAllHouse: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${HOUSE_URL}/`,
        method: "GET",
        params: { pageNumber, keyword },
      }),
    }),
    getAllHouseforadmin: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${HOUSE_URL}/allHouse`,
        method: "GET",
        params: { pageNumber, keyword },
      }),
    }),
    getMyhouses: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${HOUSE_URL}/myHouse`,
        method: "GET",
        params: { pageNumber, keyword },
      }),
    }),
    deleteMyHouse: builder.mutation({
      query: (id) => ({
        url: `${HOUSE_URL}/deleteMyHouse/${id}`,
        method: "DELETE",
      }),
    }),
    deleteHousePermanent: builder.mutation({
      query: (id) => ({
        url: `${HOUSE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getSingleHouse: builder.query({
      query: (id) => ({
        url: `${HOUSE_URL}/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["House"],
    }),
    updateHouse: builder.mutation({
      query: (data) => ({
        url: `${HOUSE_URL}/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
    }),
    lockAndUnlockHouse: builder.mutation({
      query: (id) => ({
        url: `${HOUSE_URL}/lockAndUnlockHouse/${id}`,
        method: "PUT",
      }),
    }),
    sendBrokersRequest: builder.mutation({
      query: (data) => ({
        url: `${HOUSE_URL}/sendBrokersRequest/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    acceptbroker: builder.mutation({
      query: (data) => ({
        url: `${HOUSE_URL}/acceptBrokerRequest`,
        method: "POST",
        body: data,
      }),
    }),
    rejectBroker: builder.mutation({
      query: (data) => ({
        url: `${HOUSE_URL}/rejectBrokerRequest`,
        method: "POST",
        body: data,
      }),
    }),
    makeAvailableHouse: builder.mutation({
      query: (id) => ({
        url: `${HOUSE_URL}/makeHouseAvailable/${id}`,
        method: "PUT",
      }),
    }),
    createFeedback: builder.mutation({
      query: (data) => ({
        url: `${HOUSE_URL}/createFeedback/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useCreateHouseMutation,
  useDeleteMyHouseMutation,
  useGetMyhousesQuery,
  useGetSingleHouseQuery,
  useUpdateHouseMutation,
  useLockAndUnlockHouseMutation,
  useAcceptbrokerMutation,
  useRejectBrokerMutation,
  useGetAllHouseQuery,
  useMakeAvailableHouseMutation,
  useCreateFeedbackMutation,
  useSendBrokersRequestMutation,
  useGetAllHouseforadminQuery,
  useDeleteHousePermanentMutation,
} = houseApi
