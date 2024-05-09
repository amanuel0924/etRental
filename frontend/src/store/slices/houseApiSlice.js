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
  }),
})

export const {
  useCreateHouseMutation,
  useDeleteMyHouseMutation,
  useGetMyhousesQuery,
  useGetSingleHouseQuery,
  useUpdateHouseMutation,
  useLockAndUnlockHouseMutation,
} = houseApi