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
    return `px-4 py-2 rounded-md transition-colors hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 text-white hover:text-gray-200 hover:shadow-lg shadow-purple-200 hover:font-medium transition-transform duration-300 hover:scale-105 ${
      location.pathname === path ? "text-purple-700 font-bold bg-blue" : ""
    }`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg w-full">
      <div className="container flex items-center justify-between p-4 mx-auto">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none hover:text-purple-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl mr-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          AchieveHub
        </Link>
 
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block w-full">
          <NavigationMenuList className="flex gap-4 w-full items-center">
            <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/placement" className={getLinkClass("/placement")}>
                      Placement
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
            {!isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/login" className={getLinkClass("/login")}>
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
              </>
            )}

            {/* Logout / Login button */}
            <div className="ml-auto flex items-center gap-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 ml-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-lg border-b border-gray-200">
            <div className="flex flex-col p-4 space-y-4">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className={getLinkClass("/login")}
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
                <Link
                  to="/student"
                  className={getLinkClass("/student")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Student Portal
                </Link>
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
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-left"
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