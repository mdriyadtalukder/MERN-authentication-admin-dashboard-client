import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "../features/mode/modeSlice";
import userSlice from "../features/user/userSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        mode: modeSlice,
        user: userSlice
    },
    devTools: import.meta.env.NODE_ENV !== 'production', //MODE
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware)
})