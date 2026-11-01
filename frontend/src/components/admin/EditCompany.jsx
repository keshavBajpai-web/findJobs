
import Api from '@/api/axios'
import { setSingleCompany } from '@/redux/companySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

const EditCompany = () => {
  
const {singleCompany} = useSelector((store)=>store.company)
// console.log(singleCompany);
const {id} = useParams()
const dispatch = useDispatch()
useEffect(() => {
  const fetchSingleCompany = async() => {
    try {
      const res = await Api.get(`/company/getCompanyById/${id}`)
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company))
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  fetchSingleCompany()
}, [id,dispatch])


  const [form , setForm] = useState({
    companyName:"",
    description:"",
    website:"",
    location:"",
    file:null
  })

  useEffect(() => {
    if (!singleCompany) return; 
    setForm({
      companyName:singleCompany.companyName || "",
      description:singleCompany.description || "",
      website:singleCompany.website || "",
      location:singleCompany.location ||"",
      file:null
    })
  }, [singleCompany])
  

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const fileChangeHandler = async(e) => {
    setForm({
      ...form,
      file:e.target.files?.[0]
    })
  }
  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("companyName",form.companyName)
    formData.append("description",form.description)
    formData.append("website",form.website)
    formData.append("location",form.location)
    if (form.file) {
      formData.append("file",form.file)
    }
    try {
      const res = await Api.put(`/company/updateCompany/${id}`,formData)
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.updatedCompany))
        alert(res.data.message)
        navigate(`/admin/companies`)
      }

    } catch (error) {
      alert(error.response.data.message)
    }
  }


  

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Edit Company
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Update your company information and keep your profile up to date.
          </p>
        </div>

        <form 
        onSubmit={handleSubmit}
        className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              name='companyName'
              value={form.companyName}
              onChange={changeHandler}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe your company"
              name='description'
              value={form.description}
              onChange={changeHandler}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Website
              </label>
              <input
                type="string"
                placeholder="https://example.com"
                name='website'
                value={form.website}
                onChange={changeHandler}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>
              <input
                type="text"
                name='location'
                value={form.location}
                onChange={changeHandler}
                placeholder="Enter location"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              className="w-full cursor-pointer rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100"
            />
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
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Update Company
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCompany
