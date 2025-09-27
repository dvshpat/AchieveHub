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
    alert(`Applied to ${role.title} at ${role.company}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6">
      <div className="container mx-auto space-y-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            Placement Portal
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {userRole === "recruiter"
              ? "List internships and job opportunities."
              : "Explore and apply for internships and jobs."}
          </p>
        </header>

        {/* Add Job/Internship Form (Only Recruiter) */}
        {userRole === "recruiter" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newRole.title}
                onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                className="p-2 border rounded-lg"
              />
              <select
                value={newRole.type}
                onChange={(e) => setNewRole({ ...newRole, type: e.target.value })}
                className="p-2 border rounded-lg"
              >
                <option>Internship</option>
                <option>Job</option>
              </select>
              <input
                type="text"
                placeholder="Company"
                value={newRole.company}
                onChange={(e) => setNewRole({ ...newRole, company: e.target.value })}
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Tech Stack"
                value={newRole.techStack}
                onChange={(e) => setNewRole({ ...newRole, techStack: e.target.value })}
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Eligibility"
                value={newRole.eligibility}
                onChange={(e) => setNewRole({ ...newRole, eligibility: e.target.value })}
                className="p-2 border rounded-lg md:col-span-2"
              />
              <textarea
                placeholder="Description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                className="p-2 border rounded-lg md:col-span-2"
              />
            </div>
            <button
              onClick={handleAddRole}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Add Role
            </button>
          </div>
        )}

        {/* Roles List */}
        <div className="space-y-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{role.title}</h2>
                  <p className="text-gray-600">
                    {role.type} • {role.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Tech Stack:</strong> {role.techStack}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Eligibility:</strong> {role.eligibility}
                  </p>
                  <p className="text-gray-700 mt-2">{role.description}</p>
                </div>
                {userRole === "student" && (
                  <button
                    onClick={() => handleApply(role)}
                    className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
                  >
                    Apply
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
