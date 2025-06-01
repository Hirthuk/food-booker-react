import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-12 relative">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-blue-100 text-lg">Full Stack Developer | DevOps and Cloud Enthusiast</p>
          </div>
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        {/* Developer Info Section */}
        <div className="px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Personal Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">About Developer</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="text-lg text-gray-800">Sharankumar P</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg text-gray-800">sharanclouddev@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-lg text-gray-800">Bangalore, India</p>
                </div>
              </div>
            </div>

            {/* Right Column - Skills & Social */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills & Connect</h2>
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'AWS', 'Java'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Hirthuk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sharankumar-p-g3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/Sharankuma61629"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">About This Project</h2>
            <p className="text-gray-600 leading-relaxed">
              FoodBooker is a modern food ordering platform built with React, Node.js, and Pg. 
              It features real-time order tracking, secure payments, and a responsive design for the best user experience.
              Feel free to reach out for any queries or collaboration opportunities!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
