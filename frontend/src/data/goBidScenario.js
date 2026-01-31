/**
 * GO BID Scenario - Good Fit for Startup
 * Tender with ₹5 Crore turnover requirement
 */

export const GO_BID_SCENARIO = {
  fileName: "Tender_Good_Fit.pdf",
  eligibility: {
    status: "GO",
    score: 88,
    reason: "Company meets all technical & financial criteria. Low-risk opportunity."
  },
  client: "Department of Telecommunications, Govt. of India",
  projectValue: "₹ 2.5 Cr - ₹ 3.0 Cr",
  deadline: "Feb 15, 2026 (14 Days left)",
  requirements: [
    { id: 1, text: "Must have ISO 27001 Certification", met: true },
    { id: 2, text: "Experience in React & Node.js (3+ Projects)", met: true },
    { id: 3, text: "Minimum Annual Turnover: ₹5 Crore in FY 2024-25", met: true },
    { id: 4, text: "Must have local office in Delhi NCR", met: true },
  ],
  risks: [
    { id: 1, level: "Medium", text: "Penalty Clause: 5% deduction for >1 week delay." },
    { id: 2, level: "Low", text: "Payment Terms: Net 60 Days (Manageable for cash flow)." }
  ],
  proposalDraft: `Subject: Proposal for Digital Transformation Initiative

Dear Hiring Committee,

We are pleased to submit our proposal for the Digital Transformation Initiative. Having reviewed the RFP documents, we confirm that [Your Company Name] meets all eligibility criteria, including ISO 27001 certification and extensive experience in the MERN stack.

Our approach focuses on rapid deployment using modern React-based frontend architecture and Node.js microservices. With our proven track record of 5+ government projects and ₹8 Crore turnover in FY 2024-25, we are well-positioned to deliver this project successfully.

Key Deliverables:
- Scalable web application with responsive design
- Secure API integration with government databases
- Complete documentation and training
- 24/7 technical support for 12 months

We look forward to contributing to India's digital transformation journey.

Best Regards,
[Your Company Name]`
};
