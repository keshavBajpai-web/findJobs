import Api from '@/api/axios'
import { setAdminCompany } from '@/redux/companySlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllcompany = async () => {
            try {
                const res = await Api.get(`/company/getAdminCompany`)
                if (res.data.success) {
                    dispatch(setAdminCompany(res.data.companies))
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAllcompany()

    }, [dispatch])

}

export default useGetAdminCompanies