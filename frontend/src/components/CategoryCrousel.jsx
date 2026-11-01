import React from 'react'

const CategoryCrousel = () => {
  const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack',
    'Data Analyst',
    'UI/UX Designer',
    'Digital Marketing',
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Explore Categories
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories?.map((category, index) => (
          <div
            key={index}
            className="min-w-48 bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md hover:border-indigo-500 transition cursor-pointer"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
              {category.charAt(0)}
            </div>

            <h3 className="font-semibold text-gray-800 whitespace-nowrap">
              {category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoryCrousel