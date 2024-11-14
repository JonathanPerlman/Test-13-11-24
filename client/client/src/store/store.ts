import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feathers/authUserSlice"
import organizationSlice from "./feathers/organization";
import attackSlice from "./feathers/Attack"
export const store = configureStore({
    reducer: {
        user: userSlice,
        organization: organizationSlice,
        attack: attackSlice
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;