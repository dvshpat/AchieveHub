// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaPhone, 
  FaHeart,
  FaCode,
  FaUniversity,
  FaUserTie
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Branding Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <FaCode className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Achievement Hub
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Empowering students to showcase their achievements while helping recruiters 
              discover exceptional talent through verified credentials and AI-powered insights.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                <FaGithub className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition-all duration-300 hover:scale-110">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-sky-400 transition-all duration-300 hover:scale-110">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-500 transition-all duration-300 hover:scale-110">
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUniversity className="text-blue-400" />
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Help Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUserTie className="text-purple-400" />
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FaEnvelope className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">support@aiachievementhub.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FaPhone className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-300">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-700">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-3">
              <FaUniversity className="text-blue-400 text-xl" />
            </div>
            <h4 className="font-semibold mb-2">For Students</h4>
            <p className="text-sm text-gray-400">Showcase your achievements and get discovered by top recruiters</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-3">
              <FaUserTie className="text-green-400 text-xl" />
            </div>
            <h4 className="font-semibold mb-2">For Recruiters</h4>
            <p className="text-sm text-gray-400">Find verified talent with AI-powered matching</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-3">
              <FaCode className="text-purple-400 text-xl" />
            </div>
            <h4 className="font-semibold mb-2">AI Powered</h4>
            <p className="text-sm text-gray-400">Smart verification and recommendation system</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-400 animate-pulse" />
              <span>for the developer community</span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
            
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} AI Achievement Hub. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}