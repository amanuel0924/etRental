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
    getSingleuser: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "DELETE",
      }),
    }),
    getAlluserbyRolestatstic: builder.query({
      query: () => ({
        url: `${USER_URL}/getUsersByRole`,
        method: "GET",
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
  useGetSingleuserQuery,
  useUpdateUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetAlluserbyRolestatsticQuery,
} = userApi
