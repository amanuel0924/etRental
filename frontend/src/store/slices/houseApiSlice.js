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
    getMyhouses: builder.query({
      query: () => ({
        url: `${HOUSE_URL}/myHouse`,
        method: "GET",
      }),
    }),
    deleteMyHouse: builder.mutation({
      query: (id) => ({
        url: `${HOUSE_URL}/deleteMyHouse/${id}`,
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
        url: `${HOUSE_URL}/feedback`,
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
} = houseApi
