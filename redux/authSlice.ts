import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState, Student } from "@/type";

const initialState: AuthState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(
            state,
            action: PayloadAction<{user: Student; token: string}>
        ) {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        logOut(state) {
            state.token = null;
            state.user = null;
        }
        },
    },
);

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
