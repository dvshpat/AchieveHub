import React, { useEffect, useState } from "react";
import API from "../utils/api"; // your configured axios instance
// import API from "../utils/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/users/profile");

        if (data.success) {
          setProfile(data.profile);
        } else {
          setError("Failed to fetch profile");
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="space-y-3">
        <div><strong>Name:</strong> {profile.name}</div>
        {profile.email && <div><strong>Email:</strong> {profile.email}</div>}
        <div><strong>Role:</strong> {profile.role}</div>
        {profile.usn && <div><strong>USN:</strong> {profile.usn}</div>}
        {profile.recruiterId && <div><strong>Recruiter ID:</strong> {profile.recruiterId}</div>}
        {profile.company && <div><strong>Company:</strong> {profile.company}</div>}
        {profile.department && <div><strong>Department:</strong> {profile.department}</div>}
        <div><strong>Joined At:</strong> {new Date(profile.createdAt).toLocaleDateString()}</div>
        <div><strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
