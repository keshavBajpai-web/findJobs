import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-indigo-400">
          JobPortal
        </h2>

        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm">
          <a href="/" className="text-gray-400 hover:text-white transition">
            Home
          </a>
          <a href="/jobs" className="text-gray-400 hover:text-white transition">
            Jobs
          </a>
          <a href="/login" className="text-gray-400 hover:text-white transition">
            Login
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer