import axios from 'axios';

export const processWithAI = async (certificate) => {
  const n8nWebhookUrl = "https://deavnshpateriya.app.n8n.cloud/webhook-test/data-extractor";
  const webhookPayload = {
    image_url: certificate.imageUrl || certificate.fileURL,
    Requirement: "Analyze the professional certificate and extract key metadata and skills.",
    properties: {
      recipientName: {
        type: "string",
        description: "The full name of the person who received the certificate."
      },
      issuingAuthority: {
        type: "string",
        description: "The company or organization that issued the certificate (e.g., 'Postman', 'AWS','CS50x','infosys')."
      },
      certificateTitle: {
        type: "string",
        description: "The official title or name of the certificate with the issuing authority first put the issuing authority and then the title if the issuing authority ."
      },
      verificationInfo: {
        type: "object",
        description: "An object containing any verifiable links or IDs found on the certificate. If no information is found, the values should be null.",
        properties: {
          verificationUrl: {
            type: "string",
            format: "uri",
            description: "The full URL from a QR code or link on the certificate used for verification. Set to null if not present."
          },
          credentialId: {
            type: "string",
            description: "Any unique credential ID, certificate number, or serial number found on the certificate. Set to null if not present."
          }
        }
      },
      keywords: {
        type: "array",
        description: "An array of high-level, categorical keywords describing the certificate's domain and type. The issuing authority (e.g., 'Infosys', 'AWS') MUST be the first keyword. Generate 3-5 additional keywords by selecting the most relevant terms from the examples provided. Examples of Achievement Types: 'Internship', 'Course', 'Hackathon', 'CTF', 'Workshop', 'Professional Certification'. Examples of Technical Domains: 'API', 'Backend', 'Frontend', 'Web Development', 'Cloud Computing', 'DevOps', 'Cybersecurity', 'Networking', 'Data Science', 'Machine Learning', 'AI', 'Software Testing', 'Database', 'Mobile Development', 'UI/UX', 'Game Development', 'Blockchain'.",
        items: {
          "type": "string"
        }
      }
    }
  };

  try {
    const resp = await axios.post(n8nWebhookUrl, webhookPayload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Received from n8n:", JSON.stringify(resp.data, null, 2));

    let extractedData = resp.data.result;
    
    // Parse JSON string if needed
    if (typeof extractedData === 'string') {
      try {
        extractedData = JSON.parse(extractedData);
        console.log("Successfully parsed JSON string:", extractedData);
      } catch (parseError) {
        console.error("Failed to parse JSON string from n8n:", parseError.message);
        console.error("Raw string was:", extractedData);
        return { error: parseError.message, rawData: extractedData };
      }
    }

    return { success: true, data: extractedData, rawResponse: resp.data };
  } catch (error) {
    console.error("AI processing failed:", error.message);
    if (error.response) {
      console.error("n8n response status:", error.response.status);
      console.error("n8n response data:", error.response.data);
    }
    return { error: error.message, rawError: error.response?.data };
  }
};