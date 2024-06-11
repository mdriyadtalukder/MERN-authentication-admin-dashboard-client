import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                method: "GET",
            }),
            providesTags: ['users']
        }),
        getUser: builder.query({
            query: (email) => ({
                url: `/user?email=${email}`,
                method: "GET",
            }),
            providesTags: ['user']
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [
                { type: "singleUser", id: arg }
            ]
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: '/currentUser',
                method: "GET",
            }),
            providesTags: ['currentUser']
        }),
        getCode: builder.query({
            query: () => ({
                url: '/mailCode',
                method: "GET",
            }),
            providesTags: ['mailCode']
        }),
        addUsers: builder.mutation({
            query: (data) => ({
                url: '/users',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['users', 'user', 'currentUser', 'mailCode']
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),
        updateSingleUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/singleuser/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),

        updatePass: builder.mutation({
            query: ({ id, data }) => ({
                url: `/userPass/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),
        updateEmail: builder.mutation({
            query: ({ id, data }) => ({
                url: `/userEmail/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),
        updateName: builder.mutation({
            query: ({ id, data }) => ({
                url: `/userName/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),
        updatePhoto: builder.mutation({
            query: ({ id, data }) => ({
                url: `/userPhoto/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg }
            ]

        }),
        updateCurrentUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/currentUser/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]
        }),

        updateCode: builder.mutation({
            query: ({ id, data }) => ({
                url: `/mailCode/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['users', 'user', 'currentUser', 'mailCode',
                { type: "singleUser", id: arg.id }
            ]

        }),
        sentMail: builder.mutation({
            query: (data) => ({
                url: '/send-email',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['users', 'user', 'currentUser', 'mailCode']
        }),

    })
})
export const { useGetUserQuery, useGetUsersQuery, useGetCurrentUserQuery, useGetCodeQuery, useAddUsersMutation, useUpdateUserMutation, useDeleteUserMutation, useUpdateCurrentUserMutation, useUpdateCodeMutation, useSentMailMutation, useGetSingleUserQuery, useUpdateSingleUserMutation, useUpdatePassMutation, useUpdateEmailMutation, useUpdateNameMutation, useUpdatePhotoMutation } = userApi;