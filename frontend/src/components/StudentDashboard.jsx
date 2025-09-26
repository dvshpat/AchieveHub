import { useState, useEffect } from "react";
import API from "../utils/api";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    try {
      const { data } = await API.get("/certificates/my-certificates");
      setCertificates(data);
    } catch (err) {
      console.error(err);
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

    if (!title || !type || !issuer || !file) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // Upload to Cloudinary
      const fileURL = await uploadToCloudinary(file);

      // Send certificate data to backend
      const { data } = await API.post(
        "/certificates/upload",
        { title, type, issuer, fileURL },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Certificate uploaded successfully!");
      setTitle("");
      setType("");
      setIssuer("");
      setFile(null);
      setPreviewURL(null);
      fetchCertificates();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
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
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          className="w-full p-2 mb-4 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Issuer"
          className="w-full p-2 mb-4 border rounded"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleFileChange}
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
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Certificates List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">My Certificates</h2>
        {certificates.length === 0 ? (
          <p>No certificates uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert._id} className="bg-white p-4 rounded shadow">
                <img
                  src={cert.fileURL}
                  alt={cert.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="font-bold text-lg">{cert.title}</h3>
                <p><strong>Type:</strong> {cert.type}</p>
                <p><strong>Issuer:</strong> {cert.issuer}</p>
                <p><strong>Status:</strong> {cert.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
