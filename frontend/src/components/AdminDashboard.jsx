import { useEffect, useState } from "react";
import API from "../utils/api";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      const { data } = await API.get("/admin/pending-certificates");
      setPending(data);
    };
    fetchPending();
  }, []);

  const verifyCert = async (id) => {
    await API.post(`/admin/verify/${id}`);
    setPending(pending.filter((c) => c._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {pending.map((c) => (
          <div key={c._id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <p><strong>{c.title}</strong></p>
              <p>Status: Pending</p>
            </div>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => verifyCert(c._id)}
            >
              Verify
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
