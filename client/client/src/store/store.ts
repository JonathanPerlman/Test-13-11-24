import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feathers/authUserSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        // candidates: candidatesSlice
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;