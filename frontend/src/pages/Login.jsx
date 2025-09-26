import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email / usn / recruiterId
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { password, role };

      // Identify login type
      if (identifier.includes("@")) {
        payload.email = identifier;
      } else {
        payload.usn = identifier; // students login with USN
        payload.recruiterId = identifier; // recruiters login with recruiterId
      }

      const { data } = await API.post("/auth/login", payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert(`Login successful! Role: ${data.role}`);
      if (data.role === "student") navigate("/student-dashboard");
      else if (data.role === "admin") navigate("/admin-dashboard");
      else navigate("/recruiter-dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <input
          type="text"
          placeholder="Email / USN / Recruiter ID"
          className="w-full p-2 mb-4 border rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
