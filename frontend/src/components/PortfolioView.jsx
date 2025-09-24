import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

export default function PortfolioView() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await API.get(`/students/${id}`);
      setStudent(data);
    };
    fetchPortfolio();
  }, [id]);

  if (!student) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{student.name}'s Portfolio</h1>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Skills:</strong> {student.skills.join(", ")}</p>

      <h2 className="text-xl font-bold mt-6">Certificates</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {student.certificates.map((c) => (
          <div key={c._id} className="p-4 bg-white rounded shadow">
            <p><strong>{c.title}</strong></p>
            <p>Status: {c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
