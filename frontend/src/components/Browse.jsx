
import React from 'react'
import { MapPin, BriefcaseBusiness, IndianRupee, Clock } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import useGetAllJobs from './hook/useGetAllJobs'

const Browse = () => {
  useGetAllJobs()
  const {allJob} = useSelector((store)=>store.job)
  // console.log(allJob);
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            CAREER OPPORTUNITIES
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Browse Jobs
          </h1>
          <p className="mt-2 text-gray-500">
            Find the right opportunity to grow your career.
          </p>
        </div>

        {/* Search bar UI */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <input
            type="text"
            placeholder="Search by job title or company..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Job count */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Opportunities
          </h2>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
            {allJob.length} Jobs
          </span>
        </div>

        {/* Job cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allJob?.map((job) => (
            <div
              key={job._id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                  {job.company.companyName.charAt(0)}
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  {job.jobType}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-indigo-600">
                {job.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {job.company.companyName}
              </p>

              <div className="my-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={17} className="text-indigo-500" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee size={17} className="text-indigo-500" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={17} className="text-indigo-500" />
                  {job.jobType}
                </div>
              </div>

              <button
              onClick={()=>navigate(`/description/${job._id}`)}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]">
                View Details
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Browse
