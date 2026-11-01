

import { MapPin, BriefcaseBusiness, IndianRupee, Clock } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Api from '@/api/axios'
import { useNavigate, useParams } from 'react-router'
import { setSingleJob } from '@/redux/jobSlice'
import { useEffect } from 'react'

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job)
  // console.log(singleJob);

  const { user } = useSelector((store) => store.auth)
  // console.log(user);

  const initiallyApplied = singleJob?.application?.some((app) => app?.applicant?._id === user?._id)
  // console.log(initiallyApplied)

  const dispatch = useDispatch()
  const { id } = useParams()
 
  useEffect(() => {
    const fetchSingleJob = async() => {
      try {
        const res = await Api.get(`/job/getJobById/${id}`)
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchSingleJob()
  }, [dispatch,id])
  
  
  const navigate = useNavigate()
  const applyHandler = async () => {
    try {
      const res = await Api.post(`/application/userApply/${id}`)
      if (res.data.success) {
        const updateSingleJob = { ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
        dispatch(setSingleJob(updateSingleJob))
        alert(res.data.message)
        navigate("/")
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Job Header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <BriefcaseBusiness className="text-indigo-600" size={30} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {singleJob.title}
                </h1>


                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> {singleJob.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} /> {singleJob?.createdAt?.split("T")[0]}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={applyHandler}
              disabled={initiallyApplied}
              className={`h-fit rounded-xl px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 active:scale-95 ${initiallyApplied
                ? "cursor-not-allowed bg-gray-400 shadow-gray-200"
                : "bg-indigo-600 shadow-indigo-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                }`}
            >
              {initiallyApplied ? "✓ Already Applied" : "Apply Now →"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-4">
              <IndianRupee size={20} className="text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-semibold text-gray-900 mt-1">{singleJob.salary}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <BriefcaseBusiness size={20} className="text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold text-gray-900 mt-1">{singleJob.experienceLevel} Year</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <Clock size={20} className="text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Employment Type</p>
              <p className="font-semibold text-gray-900 mt-1">{singleJob.jobType}</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mt-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Job Description
          </h2>

          <p className="text-gray-600 leading-7 mt-4">
            {singleJob.description}
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {singleJob?.requirements?.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                Interested in this opportunity?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Apply now and take the next step in your career.
              </p>
            </div>
            <button
              onClick={applyHandler}
              disabled={initiallyApplied}
              className={`h-fit rounded-xl px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 active:scale-95 ${initiallyApplied
                  ? "cursor-not-allowed bg-gray-400 shadow-gray-200"
                  : "bg-indigo-600 shadow-indigo-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                }`}
            >
              {initiallyApplied ? "✓ Already Applied" : "Apply Now →"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default JobDescription
