
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Pencil, FileText, BriefcaseBusiness, Biohazard } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import UpdateProfile from './UpdateProfile'
import AppliedTable from './AppliedTable'

const Profile = () => {
  const { user } = useSelector((store) => store.auth)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Account Settings
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your personal information and career details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-lg shadow-indigo-100/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-100/50">

          {/* Banner */}


          {/* User Info */}
          <div className="px-5 pb-8 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex h-24 mt-12 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-100 to-purple-100 text-3xl font-extrabold text-indigo-700 shadow-lg">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>

              <div className="flex items-center">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                    <Pencil size={16} />
                    Edit Profile
                  </DialogTrigger>

                  <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white p-6 shadow-2xl sm:max-w-lg">
                    <DialogHeader>
                      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Edit <span className="text-indigo-600">Profile</span>
                      </h1>
                      <p className="text-sm text-gray-500">
                        Update your personal and professional details.
                      </p>
                    </DialogHeader>
                    <UpdateProfile />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {user?.fullName}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                {user?.profile?.bio || 'Add a professional bio to introduce yourself.'}
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group flex min-w-0 items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50">
                <div className="shrink-0 rounded-xl bg-indigo-100 p-3 text-indigo-600 transition-transform group-hover:scale-105">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Email Address
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="group flex min-w-0 items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50">
                <div className="shrink-0 rounded-xl bg-indigo-100 p-3 text-indigo-600 transition-transform group-hover:scale-105">
                  <Biohazard />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Bio
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>

              <div className="group flex min-w-0 items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50">
                <div className="shrink-0 rounded-xl bg-emerald-100 p-3 text-emerald-600 transition-transform group-hover:scale-105">
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Phone Number
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                    {user?.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-7 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-md shadow-gray-100/70 transition-shadow duration-300 hover:shadow-lg sm:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-3.5 text-indigo-600">
              <BriefcaseBusiness size={23} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                My Skills
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Technical expertise and professional strengths
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS']?.map((skill) => (
              <span
                key={skill}
                className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-7 flex flex-col gap-5 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-md shadow-gray-100/70 transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 p-4 text-rose-600">
              <FileText size={27} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                My Resume
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View your uploaded resume and career details
              </p>
            </div>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-3 text-sm font-bold text-indigo-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200 active:scale-95">
            <FileText size={17} />
            View Resume
          </button>
        </div>
        <div>
          <AppliedTable />
        </div>
      </div>
    </div>
  )
}

export default Profile
