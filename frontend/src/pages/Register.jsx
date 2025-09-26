import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { name, email, password };

      await API.post("/auth/admin/signup", payload);

      alert("✅ Admin account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError("❌ " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>

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

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button className="bg-green-500 text-white p-2 rounded w-full">
          Register as Admin
        </button>
      </form>
    </div>
  );
}
