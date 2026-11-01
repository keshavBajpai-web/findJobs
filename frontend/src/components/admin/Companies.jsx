
import { Button, Input } from '@base-ui/react'
import React from 'react'
import CompaniesTable from './CompaniesTable'
import { Search, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'

const Companies = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Company List
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view all your registered companies.
            </p>
          </div>

          <Button
          onClick={()=>navigate(`/admin/createCompany`)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            <Plus size={18} />
            Create Company
          </Button>
        </div>

        {/* Search */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Search company..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Companies Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <CompaniesTable />
        </div>

      </div>
    </div>
  )
}

export default Companies
