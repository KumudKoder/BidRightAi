# BidRightAI - Demo Data Scenarios

This folder contains two mock data scenarios for demonstrating the AI-powered tender analysis functionality.

## Scenarios

### 1. GO BID Scenario (`goBidScenario.js`)
**File:** `Tender_Good_Fit.pdf`
**Status:** ✅ GO - Score 88/100

**Use Case:** Perfect fit for a startup
- ₹5 Crore turnover requirement (achievable)
- ₹2.5-3 Cr project value (manageable)
- Low to medium risks
- All requirements met

**When to show:** Demonstrate how the AI identifies good opportunities that match your company profile.

---

### 2. NO-GO Scenario (`noBidScenario.js`)
**File:** `Tender_High_Risk.pdf`
**Status:** ❌ NO-GO - Score 32/100

**Use Case:** Hidden trap for startups
- ₹500 Crore turnover requirement (unqualified)
- ₹12-15 Cr project value (too large)
- High penalty clauses and financial risks
- Multiple unmet requirements

**When to show:** Demonstrate how the AI saves time by detecting disqualifying requirements and high-risk clauses that could bankrupt a small firm.

---

## Video Demo Strategy

### Scene 1: Upload "Good Fit" Tender
1. Click **"Good Fit Tender"** button
2. Show AI processing with IBM watsonx
3. Result: 🟢 **GO BID** - 88/100
4. Highlight: "Perfect match for our startup profile"

### Scene 2: Upload "High Risk" Tender  
1. Click **"High Risk Tender"** button
2. Show AI processing
3. Result: 🔴 **NO-GO** - 32/100
4. Highlight: "AI detected ₹500 Cr requirement - saved us from wasting 40+ hours"

---

## Key Differentiators

- **Turnover Detection:** GO scenario = ₹5 Cr | NO-GO scenario = ₹500 Cr
- **Risk Analysis:** GO = 2 medium risks | NO-GO = 4 high risks with bank guarantee
- **Proposal Quality:** GO = Professional draft | NO-GO = Warning message
- **Decision Support:** Clear GO/NO-GO recommendations with reasoning

---

## Technical Implementation

Both scenarios export a consistent data structure:
\`\`\`javascript
{
  fileName: string,
  eligibility: { status, score, reason },
  client: string,
  projectValue: string,
  deadline: string,
  requirements: Array<{ id, text, met }>,
  risks: Array<{ id, level, text }>,
  proposalDraft: string
}
\`\`\`

Import both using:
\`\`\`javascript
import { GO_BID_SCENARIO, NO_BID_SCENARIO } from './data';
\`\`\`
