import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feathers/authUserSlice"
// import defendSlice from "./feathers/Defend"
import organizationSlice from "./feathers/organization";

export const store = configureStore({
    reducer: {
        user: userSlice,
        // defends: defendSlice,
        organization: organizationSlice
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;