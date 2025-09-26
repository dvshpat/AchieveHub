import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Added role selection
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", { email, password, role });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      alert(`Login successful! with ${data.role} role and email: ${email}`);
      console.log("Login successful:", data);
      console.log("role", localStorage.getItem("role"));
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
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Role Selector */}
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
