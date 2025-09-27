// src/pages/Placement.jsx
import React, { useEffect, useState } from "react";

export default function Placement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    title: "",
    type: "Internship",
    company: "",
    techStack: "",
    eligibility: "",
    description: "",
  });

  const userRole = localStorage.getItem("role") || "student"; // default student

  // Mock data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "Frontend Developer",
        type: "Internship",
        company: "Google",
        techStack: "React, Tailwind, JS",
        eligibility: "CGPA > 7.0, No backlogs",
        description: "Work on scalable UI systems.",
      },
      {
        id: 2,
        title: "Backend Engineer",
        type: "Job",
        company: "Microsoft",
        techStack: "Node.js, Express, MongoDB",
        eligibility: "Final year students only",
        description: "Build APIs and scalable services.",
      },
      {
        id: 3,
        title: "Data Scientist",
        type: "Internship",
        company: "Amazon",
        techStack: "Python, TensorFlow, SQL",
        eligibility: "Strong ML background",
        description: "Develop ML models for product insights.",
      },
      {
        id: 4,
        title: "Blockchain Developer",
        type: "Job",
        company: "Polygon",
        techStack: "Solidity, Hardhat, Web3.js",
        eligibility: "Experience with smart contracts",
        description: "Work on Layer-2 blockchain scaling.",
      },
      {
        id: 5,
        title: "DevOps Engineer",
        type: "Internship",
        company: "Netflix",
        techStack: "AWS, Docker, Kubernetes",
        eligibility: "Good Linux & cloud knowledge",
        description: "Automate deployments and infra.",
      },
      {
        id: 6,
        title: "AI Engineer",
        type: "Job",
        company: "OpenAI",
        techStack: "Python, PyTorch, LLMs",
        eligibility: "Passion for AI research",
        description: "Build next-gen AI systems.",
      },
      {
        id: 7,
        title: "Cybersecurity Analyst",
        type: "Internship",
        company: "Cisco",
        techStack: "Networking, Kali Linux, Python",
        eligibility: "Knowledge of security protocols",
        description: "Work on enterprise security audits.",
      },
      {
        id: 8,
        title: "Mobile Developer",
        type: "Job",
        company: "Flipkart",
        techStack: "React Native, Firebase",
        eligibility: "Good app dev projects",
        description: "Develop and maintain mobile apps.",
      },
      {
        id: 9,
        title: "UI/UX Designer",
        type: "Internship",
        company: "Adobe",
        techStack: "Figma, Adobe XD",
        eligibility: "Strong design portfolio",
        description: "Design intuitive user experiences.",
      },
      {
        id: 10,
        title: "Cloud Engineer",
        type: "Job",
        company: "IBM",
        techStack: "Azure, Terraform, Docker",
        eligibility: "Final year, cloud knowledge",
        description: "Work on hybrid cloud solutions.",
      },
    ];
    setRoles(mockData);
  }, []);

  // Recruiter adds new role
  const handleAddRole = () => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
    setNewRole({
      title: "",
      type: "Internship",
      company: "",
      techStack: "",
      eligibility: "",
      description: "",
    });
  };

  // Student applies
  const handleApply = (role) => {
    alert(`✅ Applied to ${role.title} at ${role.company}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8">
      <div className="container mx-auto space-y-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 drop-shadow-lg">
            Placement Portal
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            {userRole === "recruiter"
              ? "📢 Post internships and job opportunities."
              : "🚀 Explore and apply for internships and jobs."}
          </p>
        </header>

        {/* Add Job/Internship Form (Only Recruiter) */}
        {userRole === "recruiter" && (
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              ➕ Add a New Role
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Role Title"
                value={newRole.title}
                onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={newRole.type}
                onChange={(e) => setNewRole({ ...newRole, type: e.target.value })}
                className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
              >
                <option>Internship</option>
                <option>Job</option>
              </select>
              <input
                type="text"
                placeholder="Company"
                value={newRole.company}
                onChange={(e) => setNewRole({ ...newRole, company: e.target.value })}
                className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Tech Stack"
                value={newRole.techStack}
                onChange={(e) => setNewRole({ ...newRole, techStack: e.target.value })}
                className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Eligibility"
                value={newRole.eligibility}
                onChange={(e) => setNewRole({ ...newRole, eligibility: e.target.value })}
                className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 md:col-span-2"
              />
              <textarea
                placeholder="Role Description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 md:col-span-2"
              />
            </div>
            <button
              onClick={handleAddRole}
              className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Add Role
            </button>
          </div>
        )}

        {/* Roles List */}
        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {role.title}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        role.type === "Job"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {role.type}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{role.company}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Tech Stack:</strong> {role.techStack}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Eligibility:</strong> {role.eligibility}
                  </p>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {role.description}
                  </p>
                </div>
                {userRole === "student" && (
                  <button
                    onClick={() => handleApply(role)}
                    className="mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
