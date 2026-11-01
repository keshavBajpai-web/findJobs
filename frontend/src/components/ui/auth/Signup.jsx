import Api from '@/api/axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Signup = () => {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        file: null
    })

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullName", form.fullName)
        formData.append("email", form.email)
        formData.append("password", form.password)
        formData.append("phoneNumber", form.phoneNumber)
        formData.append("role", form.role)
        if (form.file) {
            formData.append("file", form.file)
        }
        try {
            const res = await Api.post("/user/signup", formData)
            if (res.data.success) {
                alert(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }

    const fileChangeHandler = (e) => {
        setForm({
            ...form,
            file: e.target.files?.[0]
        })
    }





    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        J
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Join us and find your dream job
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name='fullName'
                            value={form.fullName}
                            onChange={changeHandler}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>

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
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name='phoneNumber'
                            value={form.phoneNumber}
                            onChange={changeHandler}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            value={form.password}
                            onChange={changeHandler}
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            I am a
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-indigo-500 transition">
                                <input
                                    type="radio" name="role" value="student"
                                    checked={form.role === "student"}
                                    onChange={changeHandler}
                                    className="accent-indigo-600" />
                                <span className="text-sm text-gray-700">Student</span>
                            </label>

                            <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-indigo-500 transition">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={form.role === "recruiter"}
                                    onChange={changeHandler}
                                    className="accent-indigo-600" />
                                <span className="text-sm text-gray-700">Recruiter</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Photo
                        </label>

                        <label className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-500 transition">
                            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl">
                                📷
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-700">
                                    Upload your photo
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG up to 5MB
                                </p>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={fileChangeHandler}

                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-100 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signup