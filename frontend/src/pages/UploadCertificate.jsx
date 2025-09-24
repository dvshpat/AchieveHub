import { useState } from "react";
import API from "../utils/api";

export default function UploadCertificate() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("certificate", file);

    try {
      await API.post("/certificates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Certificate uploaded successfully!");
    } catch (err) {
      alert("Upload failed: " + err.response.data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Upload Certificate</h2>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Upload
        </button>
      </form>
    </div>
  );
}
