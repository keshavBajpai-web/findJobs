import Api from '@/api/axios'
import { setAllAppliedJob } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJob = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   const fetchAppliedJob = async() => {
     try {
        const res = await Api.get("application/getApplied")
        if (res.data.success) {
            dispatch(setAllAppliedJob(res.data.application))
        }
     } catch (error) {
        console.log(error.message);
        
     }
   }
   fetchAppliedJob()
  }, [dispatch])
  
}

export default useGetAppliedJob