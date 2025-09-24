import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

export default function RecruiterDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await API.get("/recruiters/students");
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {students.map((s) => (
          <div key={s._id} className="p-4 bg-white rounded shadow">
            <p><strong>{s.name}</strong></p>
            <p>Skills: {s.skills.join(", ")}</p>
            <Link
              to={`/portfolio/${s._id}`}
              className="text-blue-600 underline"
            >
              View Portfolio
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
