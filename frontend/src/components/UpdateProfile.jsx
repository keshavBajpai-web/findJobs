
import React, { useEffect, useState } from 'react'
import { Upload, FileText } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Api from '@/api/axios'
import { setUser } from '@/redux/authSlice'

const UpdateProfile = () => {
    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null
    })

    const { user } = useSelector((store) => store.auth)

    useEffect(() => {
        if (!user) return;
        setForm({
            fullName: user.fullName || "",
            phoneNumber: user.phoneNumber || "",
            bio: user.profile.bio || "",
            skills: user.profile.skills.join(",") || "",
            file: null
        })
    }, [])

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const fileChangeHandler = (e) => {
        setForm({
            ...form,
            file: e.target.files[0]
        })
    }

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullName", form.fullName)
        formData.append("phoneNumber", form.phoneNumber)
        formData.append("bio", form.bio)
        formData.append("skills", form.skills)
        if (form.file) {
            formData.append("file", form.file)
        }
        try {
            const res = await Api.put(`/user/updateProfile`,formData)
            if (res.data.success) {
                dispatch(setUser(res.data.updatedUser))
                alert(res.data.message)
            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }




    return (
        <form onSubmit={handleSubmit} className="space-y-4 py-2">

            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={changeHandler}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={changeHandler}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Bio
                </label>
                <textarea
                    rows={3}
                    name="bio"
                    value={form.bio}
                    onChange={changeHandler}
                    placeholder="Write something about yourself"
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Skills
                </label>
                <input
                    type="text"
                    name="skills"
                    value={form.skills}
                    onChange={changeHandler}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
            </div>

            {/* Resume Upload */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Upload Resume
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition hover:border-indigo-400 hover:bg-indigo-50">
                    <Upload className="mb-2 text-indigo-600" size={26} />

                    <span className="text-sm font-semibold text-gray-700">
                        Choose your resume
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                        PDF files recommended
                    </span>

                    <input
                        type="file"
                        name="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={fileChangeHandler}
                    />
                </label>
            </div>

            <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
            >
                <FileText size={17} />
                Update Profile
            </button>

        </form>
    )
}

export default UpdateProfile
