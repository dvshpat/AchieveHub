import { useState, useEffect } from "react";
import API from "../utils/api";

export default function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    try {
      // Updated to match backend response structure
      const { data } = await API.get("/certificates/my-certificates");
      setCertificates(data.certificates || data.data || data);
    } catch (err) {
      console.error("Fetch error:", err);
      // Fallback to get all certificates if user-specific fails
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

    // Preview
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

      // Create FormData for file upload with AI processing
      const formData = new FormData();
      formData.append('certificate', file);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }

      // Send to the original upload endpoint with AI processing
      const { data } = await API.post("/certificates/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", data);

      if (data.success) {
        alert("Certificate uploaded and processed successfully!");
        setTitle("");
        setDescription("");
        setFile(null);
        setPreviewURL(null);
        fetchCertificates();
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to get display value safely
  const getDisplayValue = (cert, field) => {
    return cert[field] || "Not specified";
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Upload Certificate Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Upload Certificate</h2>

        <input
          type="text"
          placeholder="Certificate Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <textarea
          placeholder="Description (optional)"
          className="w-full p-2 mb-4 border rounded h-20 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,.pdf"
          className="w-full mb-4"
          onChange={handleFileChange}
          required
        />

        {/* Preview */}
        {previewURL && (
          <div className="mb-4">
            <p className="mb-2 font-semibold">Certificate Preview:</p>
            <img
              src={previewURL}
              alt="Preview"
              className="w-full max-h-64 object-contain border rounded"
            />
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {loading ? "Uploading & Processing..." : "Upload Certificate"}
        </button>
        
        <p className="text-sm text-gray-600 mt-2">
          * AI will automatically extract certificate details
        </p>
      </form>

      {/* Certificates List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">My Certificates</h2>
        {certificates.length === 0 ? (
          <p className="text-gray-600">No certificates uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert._id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={cert.imageUrl || cert.fileURL}
                  alt={cert.title}
                  className="w-full h-48 object-cover rounded mb-3"
                  onError={(e) => {
                    e.target.src = '/placeholder-certificate.png';
                  }}
                />
                
                {/* Basic Info */}
                <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
                
                {/* AI Extracted Data */}
                {cert.certificateTitle && cert.certificateTitle !== cert.title && (
                  <p className="text-sm mb-1">
                    <strong>Certificate:</strong> {cert.certificateTitle}
                  </p>
                )}
                
                {cert.recipientName && (
                  <p className="text-sm mb-1">
                    <strong>Recipient:</strong> {cert.recipientName}
                  </p>
                )}
                
                {cert.issuingAuthority && (
                  <p className="text-sm mb-1">
                    <strong>Issued by:</strong> {cert.issuingAuthority}
                  </p>
                )}
                
                {/* Fallback to manual fields if AI data not available */}
                {!cert.issuingAuthority && cert.issuer && (
                  <p className="text-sm mb-1">
                    <strong>Issuer:</strong> {cert.issuer}
                  </p>
                )}
                
                {!cert.certificateTitle && cert.type && (
                  <p className="text-sm mb-1">
                    <strong>Type:</strong> {cert.type}
                  </p>
                )}

                {/* Status */}
                <p className="text-sm mb-2">
                  <strong>Status:</strong> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    cert.status === 'verified' ? 'bg-green-100 text-green-800' :
                    cert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cert.status || 'pending'}
                  </span>
                </p>

                {/* Keywords */}
                {cert.keywords && cert.keywords.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold mb-1">Skills/Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.keywords.map((keyword, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Info */}
                {cert.verificationInfo && (cert.verificationInfo.verificationUrl || cert.verificationInfo.credentialId) && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs font-semibold mb-1">Verification:</p>
                    {cert.verificationInfo.credentialId && (
                      <p className="text-xs text-gray-600">
                        ID: {cert.verificationInfo.credentialId}
                      </p>
                    )}
                    {cert.verificationInfo.verificationUrl && (
                      <a 
                        href={cert.verificationInfo.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Verify Certificate
                      </a>
                    )}
                  </div>
                )}

                {/* Upload Date */}
                <p className="text-xs text-gray-500 mt-2">
                  Uploaded: {new Date(cert.uploadedAt || cert.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}