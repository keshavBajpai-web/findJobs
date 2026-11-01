
import { Eye, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const AdminJobsTable = () => {
  const { allAdminJob } = useSelector((store) => store.job)
  // console.log(allAdminJob);

 const navigate = useNavigate()
  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">All Job Listings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your posted jobs and applications.
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
          {allAdminJob?.length} Jobs
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Job Title
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Date Posted
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Salary
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Job Type
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {allAdminJob?.map((job) => (
              <tr key={job._id} className="transition hover:bg-gray-50/80">
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">{job.title}</p>
                  <p className="mt-1 text-xs text-gray-400">Job ID: #{job._id}</p>
                </td>

                <td className="px-6 py-5 text-sm text-gray-600">
                  {job.createdAt.split("T")[0]}
                </td>

                <td className="px-6 py-5 text-sm font-medium text-gray-700">
                  {job.salary} Lpa
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                    {job.jobType}
                  </span>
                </td>



                <td className="px-6 py-5">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className='flex items-center gap-2'>
                        <span>
                        <Eye className='h-5' />
                        </span>
                        <button onClick={()=>navigate(`/admin/applicant/${job._id}`)}>
                          applicant
                        </button>
                      </div>
                      <div>
                        Edit Job
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminJobsTable
