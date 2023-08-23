import {createListenerMiddleware} from "@reduxjs/toolkit";
import {authAPI} from "../app/services/authAPI";


export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authAPI.endpoints.login.matchFulfilled,
    effect: async (action, api) => {
        api.cancelActiveListeners();

        if(action.payload.token){
            localStorage.setItem('token', action.payload.token)
        }
    }

})
