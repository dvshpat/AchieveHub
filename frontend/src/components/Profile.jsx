import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/users/profile");
        if (data.success) setProfile(data.profile);
        else setError("Failed to fetch profile");
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            My Profile
          </h2>
          <p className="text-gray-600 mt-2">
            View and manage your professional profile
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <strong className="block text-sm text-gray-600">Name:</strong>
              <span className="text-lg font-medium">{profile.name}</span>
            </div>

            {profile.email && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong className="block text-sm text-gray-600">Email:</strong>
                <span className="text-lg font-medium">{profile.email}</span>
              </div>
            )}

            <div className="p-4 bg-green-50 rounded-lg">
              <strong className="block text-sm text-gray-600">Role:</strong>
              <span className="text-lg font-medium">{profile.role}</span>
            </div>

            {profile.usn && (
              <div className="p-4 bg-pink-50 rounded-lg">
                <strong className="block text-sm text-gray-600">USN:</strong>
                <span className="text-lg font-medium">{profile.usn}</span>
              </div>
            )}

            {profile.recruiterId && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <strong className="block text-sm text-gray-600">Recruiter ID:</strong>
                <span className="text-lg font-medium">{profile.recruiterId}</span>
              </div>
            )}

            {profile.company && (
              <div className="p-4 bg-indigo-50 rounded-lg">
                <strong className="block text-sm text-gray-600">Company:</strong>
                <span className="text-lg font-medium">{profile.company}</span>
              </div>
            )}

            {profile.department && (
              <div className="p-4 bg-teal-50 rounded-lg">
                <strong className="block text-sm text-gray-600">Department:</strong>
                <span className="text-lg font-medium">{profile.department}</span>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <strong className="block text-sm text-gray-600">Joined At:</strong>
              <span className="text-lg font-medium">
                {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <strong className="block text-sm text-gray-600">Last Updated:</strong>
              <span className="text-lg font-medium">
                {new Date(profile.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Call-to-Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition duration-200 shadow-md">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
