import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useGetAllJobs from './hook/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchJob } from '@/redux/jobSlice'

const LatestJobs = () => {
  useGetAllJobs()
  const { allJob } = useSelector((store) => store.job)
  // console.log(allJob);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJob(""))
  }, [])

  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Latest Jobs
          </h2>
          <p className="text-gray-500 mt-2">
            Find your next career opportunity
          </p>
        </div>

        <button className="text-indigo-600 font-semibold hover:underline self-start sm:self-auto">
          View All Jobs →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allJob?.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                {job.company.companyName.charAt(0)}
              </div>

              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {job.jobType}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-4">
              {job.title}
            </h3>

            <p className="text-gray-600 mt-1">{job?.company?.companyName}</p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-4">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
            </div>

            <button onClick={() => navigate(`/description/${job._id}`)} className="w-full mt-5 border border-indigo-600 text-indigo-600 font-semibold py-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LatestJobs