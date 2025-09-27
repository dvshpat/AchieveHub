import { useState, useEffect } from "react";
import API from "../utils/api";

export default function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const fetchCertificates = async () => {
    try {
      const { data } = await API.get("/certificates/my-certificates");
      setCertificates(data.certificates || data.data || data);
    } catch (err) {
      console.error("Fetch error:", err);
      try {
        const { data } = await API.get("/certificates");
        setCertificates(data.data || data);
      } catch (fallbackErr) {
        console.error("Fallback fetch error:", fallbackErr);
      }
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewURL(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewURL(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !file) {
      setError("Title and file are required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('certificate', file);
      formData.append('title', title);
      if (description) formData.append('description', description);
      if (verificationUrl) formData.append('verificationUrl', verificationUrl);
      if (credentialId) formData.append('credentialId', credentialId);

      const { data } = await API.post("/certificates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        alert("Certificate uploaded and processed successfully!");
        setTitle("");
        setDescription("");
        setVerificationUrl("");
        setCredentialId("");
        setFile(null);
        setPreviewURL(null);
        fetchCertificates();
        setActiveTab("certificates");
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const config = {
      verified: { 
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: "✅"
      },
      pending: { 
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: "⏳"
      },
      rejected: { 
        color: "bg-red-50 text-red-700 border-red-200",
        icon: "❌"
      }
    };
    return config[status?.toLowerCase()] || { 
      color: "bg-gray-50 text-gray-700 border-gray-200",
      icon: "📄"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Certificate Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and showcase your achievements with AI-powered verification
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: "upload", label: "Upload Certificate", icon: "📤" },
                { id: "certificates", label: "My Certificates", icon: "📋", count: certificates.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-6 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Upload Tab */}
            {activeTab === "upload" && (
              <form onSubmit={handleUpload} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Certificate Information
                      </label>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Title *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Advanced JavaScript Certification"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Description
                          </label>
                          <textarea
                            placeholder="Optional description about this achievement"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all h-32 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        {/* Verification Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                          <h3 className="font-semibold text-purple-700 mb-4">Verification Information (Optional)</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">
                                Verification URL
                              </label>
                              <input
                                type="url"
                                placeholder="https://example.com/verify/credential-id"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                value={verificationUrl}
                                onChange={(e) => setVerificationUrl(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">
                                Credential ID
                              </label>
                              <input
                                type="text"
                                placeholder="e.g., CERT-12345-ABCD"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                value={credentialId}
                                onChange={(e) => setCredentialId(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - File Upload */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Certificate File
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-all duration-300 bg-gray-50/50">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileChange}
                          required
                        />
                        <label htmlFor="file-upload" className="cursor-pointer block">
                          <div className="text-purple-500 text-4xl mb-4">📎</div>
                          <p className="text-gray-700 font-semibold text-lg mb-2">
                            {file ? file.name : "Select certificate file"}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Drag and drop or click to browse
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Supports: PNG, JPG, PDF (Max. 10MB)
                          </p>
                        </label>
                      </div>
                    </div>

                    {previewURL && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold text-purple-700">Preview</span>
                          <button
                            type="button"
                            onClick={() => setPreviewURL(null)}
                            className="text-purple-400 hover:text-purple-600"
                          >
                            ✕
                          </button>
                        </div>
                        <img
                          src={previewURL}
                          alt="Preview"
                          className="w-full max-h-64 object-contain rounded-lg border border-purple-200"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500">⚠️</span>
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Uploading & Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        <span>Upload Certificate</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-600">🤖</span>
                    <span className="text-purple-700 text-sm">
                      <strong>AI Processing:</strong> Certificate details will be automatically extracted using AI technology
                    </span>
                  </div>
                </div>
              </form>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">My Certificates</h3>
                    <p className="text-gray-600">Manage and view your uploaded achievements</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>+</span>
                    <span>Add New</span>
                  </button>
                </div>

                {certificates.length === 0 ? (
                  <div className="text-center py-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-dashed border-purple-200">
                    <div className="text-6xl text-purple-300 mb-4">📜</div>
                    <h4 className="text-lg font-semibold text-purple-600 mb-2">No certificates yet</h4>
                    <p className="text-purple-500 mb-6">Start by uploading your first achievement</p>
                    <button
                      onClick={() => setActiveTab("upload")}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                    >
                      Upload First Certificate
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {certificates.map((cert) => {
                      const statusConfig = getStatusConfig(cert.status);
                      return (
                        <div key={cert._id} className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 flex items-center justify-center">
                              <img 
                                src={cert.imageUrl || cert.fileURL} 
                                alt={cert.title}
                                className="w-full h-full object-cover rounded-xl"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="text-center hidden">
                                <div className="text-2xl text-purple-500 mb-1">📄</div>
                                <span className="text-xs text-gray-600 font-medium">Certificate</span>
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-lg mb-1">{cert.title}</h4>
                                  <p className="text-gray-600 text-sm">
                                    {cert.issuingAuthority || cert.issuer || "Not specified"}
                                  </p>
                                </div>
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                  <span>{statusConfig.icon}</span>
                                  <span className="capitalize">{cert.status || "pending"}</span>
                                </span>
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                {cert.recipientName && (
                                  <p className="text-sm text-gray-600">
                                    <strong>Recipient:</strong> {cert.recipientName}
                                  </p>
                                )}
                                {cert.certificateTitle && cert.certificateTitle !== cert.title && (
                                  <p className="text-sm text-gray-600">
                                    <strong>Certificate:</strong> {cert.certificateTitle}
                                  </p>
                                )}
                              </div>

                              {cert.keywords && cert.keywords.length > 0 && (
                                <div className="mb-4">
                                  <div className="flex flex-wrap gap-2">
                                    {cert.keywords.slice(0, 3).map((keyword, index) => (
                                      <span 
                                        key={index}
                                        className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium"
                                      >
                                        {keyword}
                                      </span>
                                    ))}
                                    {cert.keywords.length > 3 && (
                                      <span className="text-gray-500 text-xs">+{cert.keywords.length - 3} more</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {new Date(cert.uploadedAt || cert.createdAt).toLocaleDateString()}
                                </span>
                                <div className="flex items-center space-x-3">
                                  {cert.verificationInfo?.verificationUrl && (
                                    <a
                                      href={cert.verificationInfo.verificationUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
                                    >
                                      <span>🔗</span>
                                      <span>Verify</span>
                                    </a>
                                  )}
                                  <a
                                    href={cert.imageUrl || cert.fileURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1"
                                  >
                                    <span>📥</span>
                                    <span>Download</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}