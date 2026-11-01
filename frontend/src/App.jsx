import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Navbar from './components/ui/shared/Navbar'
import Home from './components/Home'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Job from './components/Job'
import Browse from './components/Browse'
import JobDescription from './components/JobDescription'
import Profile from './components/Profile'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import AdminJobs from './components/admin/AdminJobs'
import EditCompany from './components/admin/EditCompany'
import CreateJob from './components/admin/CreateJob'
import Applicant from './components/admin/Applicant'
import ProtectedRoute from './components/admin/ProtectedRoute'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/jobs", element: <Job /> },
        { path: "/browse", element: <Browse /> },
        { path: "/description/:id", element: <JobDescription /> },
        { path: "/profile", element: <Profile /> },

        // admin

        { path: "/admin/companies", element: <ProtectedRoute><Companies /></ProtectedRoute> },
        { path: "/admin/createCompany", element: <ProtectedRoute> <CreateCompany /> </ProtectedRoute> },
        { path: "/admin/editCompany/:id", element: <ProtectedRoute><EditCompany /> </ProtectedRoute> },
        { path: "/admin/jobs", element: <ProtectedRoute><AdminJobs /> </ProtectedRoute> },
        { path: "/admin/createJob", element: <ProtectedRoute><CreateJob /> </ProtectedRoute> },
        { path: "/admin/applicant/:id", element: <ProtectedRoute><Applicant /></ProtectedRoute> }

      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App