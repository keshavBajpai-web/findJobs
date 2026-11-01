import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJob: [],
        allAdminJob: [],
        allAppliedJob: [],
        singleJob: "",
        searchJob: ""
    },
    reducers: {
        setAllJob: (state, action) => {
            state.allJob = action.payload
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJob = action.payload
        },
        setAllAppliedJob: (state, action) => {
            state.allAppliedJob = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setSearchJob: (state, action) => {
            state.searchJob = action.payload
        },
    }
})

export const { setAllJob, setAllAdminJob, setAllAppliedJob, setSingleJob, setSearchJob } = jobSlice.actions
export default jobSlice.reducer