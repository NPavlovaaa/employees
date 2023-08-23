import {Employee} from '@prisma/client';
import {createSlice} from "@reduxjs/toolkit";
import {employeesAPI} from "../../app/services/employeesAPI";
import {RootState} from "../../app/store";


interface InitialState{
    employees: Employee[] | null
}

const initialState: InitialState = {
    employees: null
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(employeesAPI.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
                state.employees = action.payload;
            })
    }
})

export default employeeSlice.reducer;

export const selectEmployees = (state: RootState) => state.employees.employees;