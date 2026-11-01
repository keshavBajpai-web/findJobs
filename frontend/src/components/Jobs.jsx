import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Jobs = ({ job }) => {
  // console.log(job);

  const { allJob } = useSelector((store) => store.job)
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
        <div
          key={job._id}
          className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-200 transition flex flex-col"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 shrink-0 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
              {job.company.companyName.charAt(0)}
            </div>

            <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
              {job.jobType}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-4">
            {job.title}
          </h3>

          <p className="text-gray-600 mt-1">{job.company.companyName}</p>

          <p className="text-sm text-gray-500 mt-3">
            📍 {job.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
              💰 {job.salary}
            </span>
            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
              {job.experienceLevel}
            </span>
          </div>

          <button
            onClick={() => navigate(`/description/${job._id}`)}
            className="w-full mt-5 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            View Details
          </button>
        </div>

    
    </div>
  )
}

export default Jobs