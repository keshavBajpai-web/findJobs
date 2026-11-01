
import Api from '@/api/axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const CreateJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    jobType: "",
    position: "",
    companyId: "",
    requirements: "",
    experienceLevel:""
  })
  const { adminCompany } = useSelector((store) => store.company)
  // console.log(adminCompany);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(form);   
    try {
      const res = await Api.post(`/job/postJob`, form)
      if (res.data.success) {
        alert(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            RECRUITER DASHBOARD
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            Create a New Job
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Share an opportunity and find the right talent for your company.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name='title'
                value={form.title}
                onChange={changeHandler}
                placeholder="e.g. Full Stack Developer"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Job Description
              </label>
              <textarea
                rows={3}
                name='description'
                value={form.description}
                onChange={changeHandler}
                placeholder="Describe the role, responsibilities and requirements..."
                className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Job Requirements
              </label>
              <textarea
                rows={2}
                name='requirements'
                value={form.requirements}
                onChange={changeHandler}
                placeholder="Enter required skills, qualifications, experience and technical knowledge..."
                className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-400">
                Mention the skills, education and experience candidates should have.
              </p>
            </div>


            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name='location'
                  value={form.location}
                  onChange={changeHandler}
                  placeholder="e.g. Noida, India"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Job Type
                </label>
                <select

                  name='jobType'
                  value={form.jobType}
                  onChange={changeHandler}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="" disabled>Select job type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Salary (LPA)
                </label>
                <input
                  type="number"
                  name='salary'
                  value={form.salary}
                  onChange={changeHandler}
                  placeholder="e.g. 6"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Number of Positions
                </label>
                <input
                  type="number"
                  name='position'
                  value={form.position}
                  onChange={changeHandler}
                  placeholder="e.g. 3"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  experience Level
                </label>
                <input
                  type="number"
                  name='experienceLevel'
                  value={form.experienceLevel}
                  onChange={changeHandler}
                  placeholder="e.g. 3"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Company
              </label>
              <select

                name='companyId'
                value={form.companyId}
                onChange={changeHandler}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled>Select your company</option>
                {
                  adminCompany?.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company?.companyName}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                Publish Job
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateJob
