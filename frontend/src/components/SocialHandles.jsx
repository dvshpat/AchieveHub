import { useState, useEffect } from "react";
import API from "../utils/api";
import { motion } from "framer-motion";

export default function SocialHandles() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    codeforces: { handle: "" },
    codechef: { handle: "" },
    leetcode: { handle: "" },
    github: { username: "" },
    linkedin: "",
    portfolio: "",
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const initializeProfileData = async () => {
      try {
        const { data } = await API.get("/profile/ratings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data.profile);
        setFormData({
          codeforces: { handle: data.profile?.codeforces?.handle || "" },
          codechef: { handle: data.profile?.codechef?.handle || "" },
          leetcode: { handle: data.profile?.leetcode?.handle || "" },
          github: { username: data.profile?.github?.username || "" },
          linkedin: data.profile?.linkedin || "",
          portfolio: data.profile?.portfolio || "",
        });
      } catch (error) {
        console.error("Profile data initialization error:", error);
      }
    };
    initializeProfileData();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (["codeforces", "codechef", "leetcode", "github"].includes(name)) {
      setFormData(prevData => ({
        ...prevData,
        [name]: { handle: value, username: value }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await API.post("/profile/save", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Profile configuration saved successfully");
    } catch (error) {
      console.error("Profile save operation failed:", error);
      alert("Profile save operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingsUpdate = async () => {
    setUpdating(true);
    try {
      const { data } = await API.get("/profile/ratings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data.profile);
      alert("✅ Platform ratings updated successfully");
    } catch (error) {
      console.error("Ratings update operation failed:", error);
      alert("Failed to refresh platform ratings");
    } finally {
      setUpdating(false);
    }
  };

  const PlatformStatisticsCard = ({ platform, data }) => {
    if (!data?.handle && !data?.username) return null;

    const platformConfigurations = {
      codeforces: { displayName: "Codeforces", icon: "⚡" },
      codechef: { displayName: "CodeChef", icon: "🍳" },
      leetcode: { displayName: "LeetCode", icon: "💻" },
      github: { displayName: "GitHub", icon: "📱" },
    };

    const platformConfig = platformConfigurations[platform];

    return (
      <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-md hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-9 h-9 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center text-lg">
              {platformConfig.icon}
            </span>
            <h4 className="font-semibold text-gray-900">{platformConfig.displayName}</h4>
          </div>
          <span className="bg-gray-50 px-3 py-1 rounded text-sm text-gray-700 border border-gray-200">
            {data.handle || data.username}
          </span>
        </div>

        {platform === 'leetcode' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Problems Solved</span>
              <span className="font-bold text-blue-600">{data.solvedProblems || 0}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-100 text-green-800 p-2 rounded text-center text-xs">
                <div className="font-bold">{data.easySolved || 0}</div>
                <div>Easy</div>
              </div>
              <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-center text-xs">
                <div className="font-bold">{data.mediumSolved || 0}</div>
                <div>Medium</div>
              </div>
              <div className="bg-red-100 text-red-800 p-2 rounded text-center text-xs">
                <div className="font-bold">{data.hardSolved || 0}</div>
                <div>Hard</div>
              </div>
            </div>
            {data.contestRating && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Contest Rating</span>
                <span className="font-bold text-blue-600">{data.contestRating}</span>
              </div>
            )}
          </div>
        )}

        {platform === 'github' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Repository Count</span>
              <span className="font-bold text-blue-600">{data.repoCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Followers</span>
              <span className="font-bold text-blue-600">{data.followers || 0}</span>
            </div>
          </div>
        )}

        {(platform === 'codeforces' || platform === 'codechef') && data.rating && (
          <div className="text-center py-2">
            <div className="text-2xl font-bold text-blue-600">{data.rating}</div>
            <div className="text-xs text-gray-600">Current Rating</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <span className="text-white text-lg">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Professional Developer Profile</h2>
            <p className="text-blue-100 text-sm">Integrate coding platforms and professional profiles</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Configuration Form */}
        <form onSubmit={handleProfileSave} className="mb-10">
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {[
              { name: "codeforces", placeholder: "Codeforces Handle", icon: "⚡" },
              { name: "codechef", placeholder: "CodeChef Handle", icon: "🍳" },
              { name: "leetcode", placeholder: "LeetCode Username", icon: "💻" },
              { name: "github", placeholder: "GitHub Username", icon: "📱" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  {field.icon}
                </div>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]?.handle || formData[field.name]?.username || ""}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 bg-white shadow-sm"
                />
              </div>
            ))}
            
            <div className="md:col-span-2 relative">
              <div className="absolute left-3 top-3 text-gray-400">💼</div>
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 bg-white shadow-sm"
              />
            </div>
            
            <div className="md:col-span-2 relative">
              <div className="absolute left-3 top-3 text-gray-400">🌐</div>
              <input
                type="text"
                name="portfolio"
                placeholder="Portfolio Website URL"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Saving Configuration...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save Profile Configuration</span>
              </>
            )}
          </button>
        </form>

        {/* Platform Statistics Section */}
        {profile && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Platform Performance Metrics</h3>
              <button
                onClick={handleRatingsUpdate}
                disabled={updating}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-2xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 text-sm font-medium flex items-center space-x-2 shadow-sm"
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span>🔄</span>
                    <span>Refresh Metrics</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <PlatformStatisticsCard platform="codeforces" data={profile.codeforces} />
              <PlatformStatisticsCard platform="codechef" data={profile.codechef} />
              <PlatformStatisticsCard platform="leetcode" data={profile.leetcode} />
              <PlatformStatisticsCard platform="github" data={profile.github} />
            </div>

            {/* Professional Links Section */}
            {(profile.linkedin || profile.portfolio) && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border border-gray-200 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🔗</span>
                  Professional Links
                </h4>
                <div className="space-y-2">
                  {profile.linkedin && (
                    <a 
                      href={profile.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors duration-200"
                    >
                      <span>📌</span>
                      <span className="text-sm">LinkedIn Professional Profile</span>
                    </a>
                  )}
                  {profile.portfolio && (
                    <a 
                      href={profile.portfolio} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors duration-200"
                    >
                      <span>📌</span>
                      <span className="text-sm">Professional Portfolio</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
