
import { Input } from '@base-ui/react'
import React from 'react'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable'
import useGetAdminJobs from '../hook/useGetAdminJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const AdminJobs = () => {
  useGetAdminJobs()
 
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Manage Jobs
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Create, search and manage your job postings.
            </p>
          </div>

          <Button
          onClick={()=>navigate(`/admin/createJob`)}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Create Job
          </Button>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="relative max-w-md">
            <Input
              placeholder="Search job by title..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Posted Jobs
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage all your job listings.
            </p>
          </div>

          <div className="overflow-x-auto p-4 sm:p-6">
            <AdminJobsTable />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminJobs
