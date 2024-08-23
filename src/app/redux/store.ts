import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from './features/modalsSlice'

export const store=configureStore({
    reducer:{
        modals:modalsReducer
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch