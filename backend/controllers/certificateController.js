import Certificate from "../models/Certificate.js";

export const uploadCertificate = async (req, res) => {
  try {
    const { title, type, issuer, fileURL } = req.body;
    const owner = req.user._id;

    if (!fileURL) {
      return res.status(400).json({ error: "Certificate URL is required" });
    }

    const certificate = await Certificate.create({
      title,
      type,
      issuer,
      fileURL,
      owner,
    });

    res.status(201).json({
      message: "Certificate uploaded successfully",
      certificate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ owner: req.user._id });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
