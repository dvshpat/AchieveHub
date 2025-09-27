import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";   // ✅ import footer
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Recruiter from "./pages/Recruiter";
import Home from "./pages/Home";
import HelpDesk from "./components/HelpDesk";   // ✅ import HelpDesk
import Placement from "./pages/Placement";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/help" element={<HelpDesk />} />   {/* ✅ new help route */}
        <Route path="/" element={<Home />} />
        <Route path="/placement" element={<Placement />} />
      </Routes>
      <Footer />   {/* ✅ footer always visible */}
    </Router>
  );
}

export default App;
