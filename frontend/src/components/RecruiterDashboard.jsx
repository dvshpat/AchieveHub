import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecruiterDashboard() {
  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [filters, setFilters] = useState({ usn: "", name: "", department: "" });
  const [loading, setLoading] = useState(true);
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [expandedSection, setExpandedSection] = useState({}); // Track dropdowns
  const [searchTerm, setSearchTerm] = useState("");
  const [studentProfiles, setStudentProfiles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, certsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/"),
          axios.get("http://localhost:5000/api/certificates")
        ]);

        const allStudents = usersRes.data.users.filter(user => user.role === "student");
        setStudents(allStudents);
        setCertificates(certsRes.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredStudents = students.filter(student =>
    student.usn?.toLowerCase().includes(filters.usn.toLowerCase()) &&
    student.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
    student.department?.toLowerCase().includes(filters.department.toLowerCase()) &&
    (student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.usn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.department?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCertificatesForStudent = (studentId) => {
    return certificates.filter(cert => cert.owner && cert.owner._id === studentId);
  };

  const toggleSection = async (studentId, section) => {
    if (!studentProfiles[studentId]) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${studentId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setStudentProfiles(prev => ({ ...prev, [studentId]: res.data.profile }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    setExpandedSection(prev => ({
      ...prev,
      [studentId]: prev[studentId] === section ? null : section
    }));
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      verified: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800"
    };
    const color = statusColors[status?.toLowerCase()] || statusColors.default;
    return `px-2 py-1 rounded-full text-xs font-medium ${color}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover talented students and verify their achievements with our comprehensive certificate tracking system.
            </p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filtered Results</p>
                <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Quick Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name, USN, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-2">Filter by USN</label>
                <input type="text" id="usn" name="usn" value={filters.usn} onChange={handleFilterChange} placeholder="Enter USN..." className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Filter by Name</label>
                <input type="text" id="name" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Enter name..." className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">Filter by Department</label>
                <input type="text" id="department" name="department" value={filters.department} onChange={handleFilterChange} placeholder="Enter department..." className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="space-y-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center bg-white rounded-2xl shadow-sm p-12 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredStudents.map(student => {
              const studentCerts = getCertificatesForStudent(student._id);
              return (
                <div key={student._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                            {studentCerts.length} {studentCerts.length === 1 ? 'Certificate' : 'Certificates'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-gray-600">
                          <p><strong className="text-gray-700">USN:</strong> {student.usn}</p>
                          <p><strong className="text-gray-700">Department:</strong> {student.department}</p>
                          <p><strong className="text-gray-700">Email:</strong> {student.email}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => toggleSection(student._id, "certificates")} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                          {expandedSection[student._id] === "certificates" ? "Hide Certificates" : "View Certificates"}
                        </button>
                        <button onClick={() => toggleSection(student._id, "coding")} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                          {expandedSection[student._id] === "coding" ? "Hide Coding Stats" : "View Coding Stats"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Certificates Dropdown */}
                  {expandedSection[student._id] === "certificates" && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                      <h3 className="text-xl font-bold text-gray-800">Certificates ({studentCerts.length})</h3>
                      {studentCerts.length === 0 ? (
                        <p>No certificates found.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                          {studentCerts.map(cert => (
                            <div key={cert._id} className="bg-white p-4 rounded-lg shadow-sm border">
                              <img src={cert.imageUrl || "/placeholder-certificate.png"} alt={cert.certificateTitle} className="w-full h-40 object-cover rounded-lg mb-3" />
                              <h4 className="font-bold text-lg">{cert.certificateTitle}</h4>
                              <p><strong>Authority:</strong> {cert.issuingAuthority}</p>
                              <p><strong>Status:</strong> <span className={getStatusBadge(cert.status)}>{cert.status}</span></p>
                              {cert.verificationInfo?.verificationUrl && (
                                <a href={cert.verificationInfo.verificationUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Verify Certificate</a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                 {/* Coding Stats Dropdown */}
{expandedSection[student._id] === "coding" && studentProfiles[student._id] && (
  <div className="border-t border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50/30">
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Coding & Development Profiles</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* LeetCode Card */}
        {studentProfiles[student._id].leetcode?.handle && (
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">LC</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">LeetCode</h4>
                <p className="text-sm text-gray-500">@{studentProfiles[student._id].leetcode.handle}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {studentProfiles[student._id].leetcode.contestRating && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Contest Rating</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                    {studentProfiles[student._id].leetcode.contestRating}
                  </span>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Solved Problems</span>
                  <span className="text-lg font-bold text-gray-900">
                    {studentProfiles[student._id].leetcode.solvedProblems || 0}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center mb-3">
                  <div className="bg-green-50 rounded p-2">
                    <div className="text-green-600 font-bold text-lg">{studentProfiles[student._id].leetcode.easySolved || 0}</div>
                    <div className="text-xs text-green-600 font-medium">Easy</div>
                  </div>
                  <div className="bg-yellow-50 rounded p-2">
                    <div className="text-yellow-600 font-bold text-lg">{studentProfiles[student._id].leetcode.mediumSolved || 0}</div>
                    <div className="text-xs text-yellow-600 font-medium">Medium</div>
                  </div>
                  <div className="bg-red-50 rounded p-2">
                    <div className="text-red-600 font-bold text-lg">{studentProfiles[student._id].leetcode.hardSolved || 0}</div>
                    <div className="text-xs text-red-600 font-medium">Hard</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, ((studentProfiles[student._id].leetcode.solvedProblems || 0) / 1000) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              <a 
  href={`https://leetcode.com/${studentProfiles[student._id].leetcode.handle}`}
  target="_blank"
  rel="noreferrer"
  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
>
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.374 1.374 0 0 0-.1 1.763l3.854 4.127 5.406 5.788a1.374 1.374 0 0 0 1.922 0l5.406-5.788 3.854-4.127a1.374 1.374 0 0 0-.1-1.763l-3.854-4.126L14.445.438A1.374 1.374 0 0 0 13.483 0zm-2.866 12.841a1.374 1.374 0 0 0-.192.24l-1.47 2.57a1.374 1.374 0 0 0 .48 1.922l2.57 1.47a1.374 1.374 0 0 0 1.922-.48l1.47-2.57a1.374 1.374 0 0 0-.48-1.922l-2.57-1.47a1.374 1.374 0 0 0-.73-.2z"/>
  </svg>
  View LeetCode Profile
</a>
            </div>
          </div>
        )}

        {/* Competitive Programming Platforms */}
        <div className="space-y-6">
          {/* Codeforces Card */}
          {studentProfiles[student._id].codeforces?.handle && (
            <div className="bg-white rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">CF</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Codeforces</h4>
                  <p className="text-sm text-gray-500">@{studentProfiles[student._id].codeforces.handle}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {studentProfiles[student._id].codeforces.rating && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Rating</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {studentProfiles[student._id].codeforces.rating}
                    </span>
                  </div>
                )}
                {studentProfiles[student._id].codeforces.rank && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Rank</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {studentProfiles[student._id].codeforces.rank}
                    </span>
                  </div>
                )}
              </div>
              <a 
  href={`https://codeforces.com/profile/${studentProfiles[student._id].codeforces.handle}`}
  target="_blank"
  rel="noreferrer"
  className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
>
  <span className="font-bold text-white">CF</span>
  View Codeforces Profile
</a>
            </div>
          )}

          {/* CodeChef Card */}
          {studentProfiles[student._id].codechef?.handle && (
            <div className="bg-white rounded-xl border border-brown-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brown-100 rounded-lg flex items-center justify-center">
                  <span className="text-brown-600 font-bold text-sm">CC</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">CodeChef</h4>
                  <p className="text-sm text-gray-500">@{studentProfiles[student._id].codechef.handle}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {studentProfiles[student._id].codechef.rating && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Rating</span>
                    <span className="px-3 py-1 bg-brown-100 text-brown-800 text-sm font-medium rounded-full">
                      {studentProfiles[student._id].codechef.rating}
                    </span>
                  </div>
                )}
                {studentProfiles[student._id].codechef.stars && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Stars</span>
                    <span className="text-yellow-500 font-bold">
                      {'★'.repeat(studentProfiles[student._id].codechef.stars)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Development & Social Profiles */}
        <div className="space-y-6">
          {/* GitHub Card */}
          {studentProfiles[student._id].github?.username && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">GitHub</h4>
                  <p className="text-sm text-gray-500">@{studentProfiles[student._id].github.username}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{studentProfiles[student._id].github.repoCount || 0}</div>
                  <div className="text-xs text-gray-500">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{studentProfiles[student._id].github.followers || 0}</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
              </div>
              <a 
                href={`https://github.com/${studentProfiles[student._id].github.username}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View GitHub Profile
              </a>
            </div>
          )}

          {/* Social Links Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <h4 className="font-bold text-gray-900 mb-4">Social Profiles</h4>
            <div className="space-y-3">
              {studentProfiles[student._id].linkedin && (
                <a 
                  href={studentProfiles[student._id].linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">in</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">LinkedIn</p>
                    <p className="text-xs text-gray-500 truncate">{studentProfiles[student._id].linkedin}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {studentProfiles[student._id].portfolio && (
                <a 
                  href={studentProfiles[student._id].portfolio} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Portfolio</p>
                    <p className="text-xs text-gray-500 truncate">{studentProfiles[student._id].portfolio}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {!studentProfiles[student._id].linkedin && !studentProfiles[student._id].portfolio && (
                <div className="text-center py-4">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-500">No social profiles added</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
