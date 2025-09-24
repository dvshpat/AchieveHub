import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      const { data } = await API.get("/certificates/my");
      setCerts(data);
    };
    fetchCerts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <Link
        to="/upload"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Certificate
      </Link>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {certs.map((c, idx) => (
          <div key={idx} className="p-4 bg-white rounded shadow">
            <p><strong>Title:</strong> {c.title}</p>
            <p><strong>Status:</strong> {c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
