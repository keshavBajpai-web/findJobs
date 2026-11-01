import { setSearchJob } from '@/redux/jobSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchJob(query))
    navigate("/browse")
  }



  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          No. 1 Job Search Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Find Your <span className="text-indigo-600">Dream Job</span>
          <br className="hidden sm:block" /> Today
        </h1>

        <p className="text-gray-600 text-base md:text-lg mt-6 max-w-2xl mx-auto">
          Discover exciting opportunities, connect with top companies,
          and take the next step in your career.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <input
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search your dream job..."
            className="w-full sm:w-96 px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
          onClick={searchJobHandler}
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection