import React from 'react'

const Volunteering = () => {
  return (
    <div className="flex items-center justify-center px-4">
      
      <div className="max-w-3xl w-full bg-white shadow-2xl border border-black/10 rounded-2xl p-8 md:p-12 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">
            Volunteering Opportunities
          </h1>
          <p className="text-gray-600 text-lg">
            Join us in making a difference!
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-700 leading-relaxed">
          <p>
            We are currently building a volunteering app to track your hours and 
            register for programs and events.
          </p>
          <p className="mt-3">
            In the meantime, submit your information and we&apos;ll reach out with 
            available opportunities.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text"
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400" 
              placeholder="First Name" 
            />
            <input 
              type="text"
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400" 
              placeholder="Last Name" 
            />
            <input 
              type="email"
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400" 
              placeholder="Email" 
            />
            <input 
              type="tel"
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400" 
              placeholder="Phone Number" 
            />
            <input 
              type="number"
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400" 
              placeholder="Age" 
            />
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Gender
              </label>
              
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span className="text-gray-800">Male</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span className="text-gray-800">Female</span>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Button */}
        <div className="text-center">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-black/80 transition-all duration-300">
            Submit Information
          </button>
        </div>

      </div>
    </div>
  )
}

export default Volunteering