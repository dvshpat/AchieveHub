import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/students/analytics");
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Analytics</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Verified Certificates:</strong> {analytics.verifiedCount}</p>
        <p><strong>Skills Extracted:</strong> {analytics.skills.join(", ")}</p>
        <p><strong>Portfolio Score:</strong> {analytics.score}</p>
      </div>
    </div>
  );
}
