// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
  };

  const getLinkClass = (path) => {
    return `px-4 py-2 rounded-md transition-colors hover:bg-[#c0392b] text-gray-100 hover:shadow-lg shadow-black hover:text-white hover:font-medium transition-transform duration-300 hover:scale-105 ${
      location.pathname === path ? "text-white font-bold" : ""
    }`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#E74C3C] rounded-sm mt-2 text-white shadow-2xl w-full">
      <div className="container flex items-center justify-between p-4 mx-auto">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          AchieveHub
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block w-full">
          <NavigationMenuList className="flex gap-4 w-full items-center">
            {!isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/" className={getLinkClass("/")}>
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/register" className={getLinkClass("/register")}>
                      Register
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}

            {role === "student" && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/student"
                      className={getLinkClass("/student")}
                    >
                      Student Portal
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/upload" className={getLinkClass("/upload")}>
                      Upload Certificate
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/analytics"
                      className={getLinkClass("/analytics")}
                    >
                      Analytics
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}
              </>
            )}

            {role === "recruiter" && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/recruiter"
                    className={getLinkClass("/recruiter")}
                  >
                    Recruiter Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}

            {role === "admin" && (
              <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/admin" className={getLinkClass("/admin")}>
                    Admin Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/admin/register" className={getLinkClass("/admin/register")}>
                    Register Users
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
              </>
            )}

            {/* Logout / Login button */}
            <div className="ml-auto flex items-center gap-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 ml-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#E74C3C] z-50 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/"
                    className={getLinkClass("/")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={getLinkClass("/register")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}

              {role === "student" && (
                <>
                  <Link
                    to="/dashboard"
                    className={getLinkClass("/dashboard")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/upload"
                    className={getLinkClass("/upload")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Upload Certificate
                  </Link>
                  <Link
                    to="/analytics"
                    className={getLinkClass("/analytics")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                </>
              )}

              {role === "recruiter" && (
                <Link
                  to="/recruiter"
                  className={getLinkClass("/recruiter")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Recruiter Dashboard
                </Link>
              )}

              {role === "admin" && (
                <Link
                  to="/admin"
                  className={getLinkClass("/admin")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
