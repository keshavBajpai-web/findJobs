import React, { useEffect } from 'react'
import Footer from './ui/shared/Footer'
import HeroSection from './HeroSection'
import CategoryCrousel from './CategoryCrousel'
import LatestJobs from './LatestJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchJob } from '@/redux/jobSlice'
import { useNavigate } from 'react-router'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((store)=>store.auth)
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies")
    }
  }, [])
  

 
  return (
    <>
    <HeroSection/>
    <CategoryCrousel/>
    <LatestJobs/>
    <Footer/>
    </>
  )
}

export default Home