import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Jobs from './Jobs'
import useGetAllJobs from './hook/useGetAllJobs'
import { useSelector } from 'react-redux'

const Job = () => {
  useGetAllJobs()
  const { allJob, searchJob } = useSelector((store) => store.job)

  const [filterJob, setFilterJob] = useState(allJob)
  // console.log(filterJob);
  
useEffect(() => {
  if (searchJob) {
    const filteredJob = allJob.filter((job)=>{
      return(
        job.title.toLowerCase().includes(searchJob.toLowerCase())||
        job.location.toLowerCase().includes(searchJob.toLowerCase())||
        job.salary.toLowerCase().includes(searchJob.toLowerCase())
      )
    })
    setFilterJob(filteredJob)
  }else{
    setFilterJob(allJob)
  }
}, [searchJob,allJob])


 

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-500">
          Explore opportunities that match your skills.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0 bg-white border border-gray-200 rounded-xl p-5 h-fit shadow-sm">
          <FilterCard />
        </aside>

        <div>
           {filterJob.length <= 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Job not found
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Try searching with different keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                {filterJob?.map((job) => (
                  <Jobs key={job._id} job={job} />
                ))}
              </div>
            )}
        </div>

      </div>
    </div>
  )
}

export default Job