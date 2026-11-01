import Api from '@/api/axios'
import { setUser } from '@/redux/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const Login = () => {
  const [form, setForm] = useState({
    email:"",
    password: "",
    role: ""
  })

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const dispatch = useDispatch()
const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Api.post("/user/login",form)
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        alert(res.data.message)
        navigate("/")
      }
    } catch (error) {
      alert(error?.response?.data?.message || "login failed")
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            J
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to continue your job search
          </p>
        </div>

        <form 
        onSubmit={handleSubmit}
        className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name='email'
              value={form.email}
              onChange={changeHandler}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <input
              type="password"
              name='password'
              value={form.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-indigo-500 transition">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={form.role === "student"}
                  onChange={changeHandler}
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-700">Student</span>
              </label>

              <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-indigo-500 transition">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form.role === "recruiter"}
                  onChange={changeHandler}
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-700">Recruiter</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-100 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login