
import React from 'react'
import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Avatar, AvatarImage, AvatarFallback } from '../avatar'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, User2, BriefcaseBusiness } from 'lucide-react'
import Api from '@/api/axios'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
// console.log(user);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Logout = async() => {
    try {
      const res = await Api.post("/user/logout")
      if (res.data.success) {
        dispatch(setUser(null))
        alert(res.data.message)
        if (user && user.role === "student") {
          navigate("/")
        }
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
  

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <BriefcaseBusiness size={22} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Job<span className="text-indigo-600">Portal</span>
            </h1>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-5 sm:gap-8">
            <ul className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link className="hover:text-indigo-600 transition-colors" to="/admin/companies">
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-indigo-600 transition-colors" to="/admin/jobs">
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="hover:text-indigo-600 transition-colors" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-indigo-600 transition-colors" to="/jobs">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-indigo-600 transition-colors" to="/browse">
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Auth Buttons / Profile */}
            {!user ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  <Link to="/signup">Signup</Link>
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-indigo-500">
                  <Avatar className="h-10 w-10 border-2 border-indigo-100 hover:border-indigo-400 transition-colors cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-64 p-3 rounded-xl shadow-xl border border-gray-100">
                      <div className="flex items-center gap-3 pb-3 border-b">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={user?.profile?.profilePhoto} />
                          <AvatarFallback className="bg-indigo-100 text-indigo-700">
                            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                  {user.role === "student" && (
                    <>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 p-3 mt-2 rounded-lg text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <User2 size={18} />
                        View Profile
                      </Link>
                    </>
                  )}

                  <button
                  onClick={Logout}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
