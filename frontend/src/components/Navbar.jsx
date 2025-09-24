import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../utils/api";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user (from localStorage or API)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-400">
        AchieveHub
      </Link>

      {/* Nav Links */}
      <div className="flex space-x-6">
        {!user && (
          <>
            <Link to="/" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}

        {user?.role === "student" && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/upload" className="hover:text-blue-400">
              Upload Certificate
            </Link>
            <Link to="/analytics" className="hover:text-blue-400">
              Analytics
            </Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:text-blue-400">
              Admin Dashboard
            </Link>
          </>
        )}

        {user?.role === "recruiter" && (
          <>
            <Link to="/recruiter" className="hover:text-blue-400">
              Recruiter Dashboard
            </Link>
          </>
        )}
      </div>

      {/* User Actions */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}
