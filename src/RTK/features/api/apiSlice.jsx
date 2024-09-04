import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'bookingApp',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mern-authentication-admin-dashboard.onrender.com/'
    }),
    tagTypes: ['users', 'user', 'currentUser', 'mailCode', 'singleUser'],
    endpoints: (builder) => ({})
})