/**
 * NO BID Scenario - High Risk / Unqualified
 * Tender with ₹500 Crore turnover requirement (Hidden trap for startups)
 */

export const NO_BID_SCENARIO = {
  fileName: "Tender_High_Risk.pdf",
  eligibility: {
    status: "NO-GO",
    score: 32,
    reason: "Critical financial requirement mismatch. High penalty clauses detected."
  },
  client: "Ministry of Electronics & IT, Govt. of India",
  projectValue: "₹ 12 Cr - ₹ 15 Cr",
  deadline: "Feb 20, 2026 (19 Days left)",
  requirements: [
    { id: 1, text: "Must have ISO 27001 Certification", met: true },
    { id: 2, text: "Experience in React & Node.js (3+ Projects)", met: true },
    { id: 3, text: "Minimum Annual Turnover: ₹500 Crore in FY 2024-25", met: false },
    { id: 4, text: "Must have local office in Delhi NCR", met: true },
    { id: 5, text: "Prior experience with Ministry of Electronics projects", met: false },
  ],
  risks: [
    { id: 1, level: "High", text: "Penalty Clause: 15% deduction for >3 days delay. Could bankrupt small firms." },
    { id: 2, level: "High", text: "Payment Terms: Net 180 Days. Severe cash flow risk for SMEs." },
    { id: 3, level: "High", text: "Bank Guarantee Required: ₹2 Crore upfront. High financial barrier." },
    { id: 4, level: "Medium", text: "Liquidated Damages: ₹50,000 per day delay after deadline." }
  ],
  proposalDraft: `⚠️ RECOMMENDATION: DO NOT BID

Our AI analysis reveals critical mismatches:

FINANCIAL BARRIER:
Required: ₹500 Crore annual turnover
Your Profile: ₹8 Crore turnover
Status: ❌ UNQUALIFIED

HIGH-RISK CLAUSES DETECTED:
1. Bank Guarantee of ₹2 Cr required upfront
2. Payment delayed by 180 days (6 months)
3. Penalty of 15% for minor delays
4. Liquidated damages: ₹50k/day

VERDICT:
This tender is designed for large enterprises (L&T, TCS, Infosys-scale). 

Our AI saved you from:
- Wasting 40+ hours on a rejected proposal
- Potential financial penalties
- Damage to company reputation

SUGGESTED ACTION:
Look for tenders with <₹10 Cr turnover requirements.`
};
