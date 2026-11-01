
import React, { useEffect } from 'react'
import { MoreHorizontal, Check, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import Api from '@/api/axios'
import { useParams } from 'react-router'
import { setApplicant } from '@/redux/applicationSlice'

const Applicant = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const { applicant } = useSelector((store) => store.application)

  useEffect(() => {
    const fetchApplicant = async () => {
      const res = await Api.get(`/application/getApplicant/${id}`)
      if (res.data.success) {
        dispatch(setApplicant(res.data.job))
      }
    }
    fetchApplicant()
  }, [dispatch, id,applicant])

  // console.log(applicant);


  const stausHandler = async (applicationId, status) => {
    try {
      const res = await Api.put(`/application/updateStatus/${applicationId}`, {status})
      if (res.data.success) {
        dispatch(setApplicant(res.data.application))
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message)
    }

  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className='flex justify-between items-center'>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Applicants
          </h1>
          <h1 className='pr-15'>
            Total applicant <span>{applicant?.application?.length}</span>
          </h1>
        </div>
        <p className="mb-6 text-sm text-gray-500">
          Manage applicants for your job postings.
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {applicant?.application?.map((app) => (

                <tr key={app._id} className="hover:bg-gray-50">
                  {/* {console.log(applicant)} */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {app.applicant.fullName}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.applicant.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${app.status === 'Accepted'
                      ? 'bg-green-100 text-green-700'
                      : app.status === 'Rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {app.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Popover>
                      <PopoverTrigger >
                        <MoreHorizontal className="h-5 w-5" />
                      </PopoverTrigger>

                      <PopoverContent align="end" className="w-40 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                        <div className="mb-2 border-b border-gray-100 px-2 py-2">
                          <p className="text-xs font-semibold text-gray-500">
                            Update Status
                          </p>
                        </div>

                        <button
                          disabled={applicant.status === 'Accepted'}
                          onClick={() => stausHandler(app._id, "accepted")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </button>

                        <button
                          disabled={applicant.status === 'Rejected'}
                          onClick={() => stausHandler(app._id, "rejected")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </button>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Applicant
