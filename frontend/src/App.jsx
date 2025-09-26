import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import UploadCertificate from "./pages/UploadCertificate";
// import Analytics from "./pages/Analytics";
// import StudentDashboard from "./components/StudentDashboard";
// import AdminDashboard from "./components/AdminDashboard";
// import RecruiterDashboard from "./components/RecruiterDashboard";
// import PortfolioView from "./components/PortfolioView";
// import AdminRegisterUser from "./components/AdminRegisterUser";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Recruiter from "./pages/Recruiter";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/recruiter" element={<Recruiter />} />
        {/* <Route path="/admin/register" element={<AdminRegisterUser />} />
        <Route path="/upload" element={<UploadCertificate />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/portfolio/:id" element={<PortfolioView />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
