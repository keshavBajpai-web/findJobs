
import React, { useState } from 'react'
import { ArrowLeft, Building2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import Api from '@/api/axios'

const CreateCompany = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    companyName: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const crateCompany = async (e) => {
    e.preventDefault()
    // console.log(form);

    try {
      const res = await Api.post(`/company/registerCompany`, form)
      if (res.data.success) {
        alert(res.data.message)
        navigate("/admin/companies")
      }
    } catch (error) {
      alert(error.response.data.message)
      console.log(error.response.data.message);

    }
  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                <Building2 size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">

                  Create Company
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Add your company to start posting jobs.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={crateCompany}
            className="space-y-6 p-6 sm:p-8">
            <div className="space-y-2">
              <label
                htmlFor="companyName"
                className="text-sm font-semibold text-gray-700"
              >
                Company Name <span className="text-red-500">*</span>
              </label>

              <input
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your company name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <p className="text-xs text-gray-400">
                Enter the official name of your company.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100"
              >
                Create Company
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default CreateCompany
