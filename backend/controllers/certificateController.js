import Certificate from "../models/Certificate.js";
import cloudinary from "../config/cloudinary.js";
import { processWithAI } from "../services/aiService.js";

// Upload certificate with file upload + AI processing (Original functionality)
// Upload certificate with file upload + AI processing (Updated to use buffer stream)
export const uploadCertificateWithFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { title, description } = req.body;

    // ⬇️ Upload the file buffer to Cloudinary manually
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "certificates", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Step 1: Save the initial certificate data to get an ID
    const newCertificate = new Certificate({
      title: title || 'Untitled Certificate',
      description: description || '',
      imageUrl: uploadResult.secure_url,      // ✅ from Cloudinary
      publicId: uploadResult.public_id,       // ✅ from Cloudinary
      fileSize: uploadResult.bytes,
      format: uploadResult.format,
      owner: req.user?._id || null,
    });

    const savedCertificate = await newCertificate.save();

    // Step 2: Process with AI
    const aiResult = await processWithAI(savedCertificate);
    let finalCertificate = savedCertificate;
    let n8nResponse = aiResult;

    // Step 3: Update certificate with AI data if successful
    if (aiResult.success && aiResult.data && typeof aiResult.data === 'object' && Object.keys(aiResult.data).length > 0) {
      console.log("Updating certificate with extracted data:", aiResult.data);
      
      finalCertificate = await Certificate.findByIdAndUpdate(
        savedCertificate._id,
        {
          $set: {
            recipientName: aiResult.data.recipientName || null,
            issuingAuthority: aiResult.data.issuingAuthority || null,
            certificateTitle: aiResult.data.certificateTitle || null,
            verificationInfo: {
              verificationUrl: aiResult.data.verificationInfo?.verificationUrl || null,
              credentialId: aiResult.data.verificationInfo?.credentialId || null,
            },
            keywords: Array.isArray(aiResult.data.keywords) ? aiResult.data.keywords : [],
            status: 'verified'
          },
        },
        { new: true }
      );
      
      console.log("Successfully updated certificate in DB with ID:", finalCertificate._id);
    } else {
      console.warn("No valid data received from n8n to update the certificate.");
      console.warn("aiResult:", aiResult);
    }

    // Final response to client
    res.json({
      success: true,
      message: 'Certificate uploaded and processed successfully.',
      data: finalCertificate,
      certificate: finalCertificate,
      n8n: n8nResponse,
    });
  } catch (error) {
    console.error('Error in upload process:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading certificate', 
      error: error.message 
    });
  }
};


// Upload certificate with URL only (New functionality)
export const uploadCertificate = async (req, res) => {
  try {
    const { title, type, issuer, fileURL, description } = req.body;
    const owner = req.user?._id;

    if (!fileURL) {
      return res.status(400).json({ error: "Certificate URL is required" });
    }

    const certificate = await Certificate.create({
      title,
      type,
      issuer,
      fileURL,
      imageUrl: fileURL,
      description,
      owner,
      publicId: `external_${Date.now()}`, // Generate a unique ID for external URLs
    });

    res.status(201).json({
      success: true,
      message: "Certificate uploaded successfully",
      certificate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get user's certificates
export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: certificates,
      certificates: certificates
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('owner', 'name email')
      .sort({ uploadedAt: -1, createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: certificates.length, 
      data: certificates 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching certificates', 
      error: error.message 
    });
  }
};

// Get single certificate
export const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('owner', 'name email');
    
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    
    res.json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete certificate
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    // Only delete from Cloudinary if it's not an external URL
    if (certificate.publicId && !certificate.publicId.startsWith('external_')) {
      try {
        await cloudinary.uploader.destroy(certificate.publicId);
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError.message);
      }
    }

    await Certificate.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Certificate deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting certificate', 
      error: error.message 
    });
  }
};
