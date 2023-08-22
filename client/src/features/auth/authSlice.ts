import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../app/services/authAPI";
import { RootState } from "../../app/store";

interface InitialState {
    user: User & { token: string} | null;
    isAuthenticated: boolean;
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true
            })
            .addMatcher(authAPI.endpoints.register.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true
            })
            .addMatcher(authAPI.endpoints.current.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true
            })
    }
})

export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const user = (state: RootState) => state.auth.user;


