import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminRegisterUser() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usn, setUsn] = useState("");
  const [recruiterId, setRecruiterId] = useState("");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { name, email, password, role };

      if (role === "student") payload.usn = usn;
      if (role === "recruiter") payload.recruiterId = recruiterId;

      if (department) payload.department = department;
      if (company) payload.company = company;

      await API.post("/auth/admin/register", payload);

      alert(`${role} registered successfully!`);
      setName("");
      setEmail("");
      setPassword("");
      setUsn("");
      setRecruiterId("");
      setDepartment("");
      setCompany("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register Student or Recruiter</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {role === "student" && (
          <>
            <input
              type="text"
              placeholder="USN"
              className="w-full p-2 mb-4 border rounded"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Department"
              className="w-full p-2 mb-4 border rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </>
        )}

        {role === "recruiter" && (
          <>
            <input
              type="text"
              placeholder="Recruiter ID"
              className="w-full p-2 mb-4 border rounded"
              value={recruiterId}
              onChange={(e) => setRecruiterId(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 mb-4 border rounded"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button className="bg-green-500 text-white p-2 rounded w-full">
          Register {role}
        </button>
      </form>
    </div>
  );
}
