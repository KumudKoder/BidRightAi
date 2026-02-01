// API Service for connecting to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Check if backend server is online
 */
export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Server status check failed:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Analyze RFP document using IBM watsonx
 * @param {File} file - PDF file to analyze
 * @returns {Promise} Analysis result
 */
export const analyzeRFP = async (file) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("RFP Analysis failed:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Analyze RFP text directly (without file upload)
 * @param {string} text - RFP text content
 * @returns {Promise} Analysis result
 */
export const analyzeRFPText = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("RFP Text Analysis failed:", error);
    return { success: false, error: error.message };
  }
};

export default {
  checkServerStatus,
  analyzeRFP,
  analyzeRFPText,
};
