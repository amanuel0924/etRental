import { apiSlice } from "./apiSlice.js"
import { USER_URL } from "../constants.js"

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    forgotePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotePassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/resetPassword/${data.token}`,
        method: "PUT",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/createUser`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${USER_URL}/`,
        method: "GET",
        params: { pageNumber, keyword },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotePasswordMutation,
  useResetPasswordMutation,
  useCreateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = userApi
