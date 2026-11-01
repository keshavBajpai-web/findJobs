import Api from '@/api/axios'
import { setAllJob } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
 const dispatch = useDispatch()
 const {searchJob} = useSelector((store)=>store.job)


 useEffect(() => {
   const fetchAllJobs = async() => {
     try {
        const res = await Api.get(`/job/getAllJob?keyword=${searchJob}`)
        if (res.data.success) {
            dispatch(setAllJob(res.data.jobs))
        }
     } catch (error) {
        console.log(error.message);
     }
   }
   fetchAllJobs()
   
 }, [dispatch])
 
}

export default useGetAllJobs