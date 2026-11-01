import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        adminCompany: [],
        singleCompany: "",
        allCompany: []
    },
    reducers: {
        setAdminCompany: (state, action) => {
            state.adminCompany = action.payload
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setAllCompany: (state, action) => {
            state.allCompany = action.payload
        }
    }
})

export const { setAdminCompany, setSingleCompany, setAllCompany } = companySlice.actions
export default companySlice.reducer