import React from 'react'
import useGetAppliedJob from './hook/useGetAppliedJob'
import { useSelector } from 'react-redux'

const AppliedTable = () => {
    useGetAppliedJob()
    const { allAppliedJob } = useSelector((store) => store.job)
    // console.log(allAppliedJob);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                <div className="px-6 py-5 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">
                        Applied Jobs
                    </h1>
                    <p className={allAppliedJob.length <= 0 ? "text-sm text-red-500 mt-1" : "text-sm text-gray-500 mt-1"}>
                        {allAppliedJob.length <= 0 ? "you haven't applied for any job" : " you have applied for job"}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Job Role</th>
                                <th className="px-6 py-4 font-semibold">Company</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {allAppliedJob?.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-5 text-sm text-gray-600">
                                        {job.createdAt.split("T")[0]}
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-gray-800">
                                        {job?.job?.title}
                                    </td>
                                    <td className="px-6 py-5 text-sm text-gray-600">
                                        {job?.job?.company?.companyName}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default AppliedTable