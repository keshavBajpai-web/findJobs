import Api from '@/api/axios'
import { setAllAdminJob } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await Api.get(`/job/getAdminJob`)
                if (res.data.success) {
                    dispatch(setAllAdminJob(res.data.job))
                }
            } catch (error) {
                console.log(error.message);

            }
        }
        fetchAdminJobs()
    }, [dispatch])

}

export default useGetAdminJobs