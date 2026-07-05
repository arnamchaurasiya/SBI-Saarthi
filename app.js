/* ════════════════════════════════════════════════════════
   SBI Saarthi — Demo Application Logic
   Full prototype for all features discussed in pitch deck
════════════════════════════════════════════════════════ */

'use strict';

// ─── Global State ─────────────────────────────────────
let currentLang = 'en';
let currentCustomer = 'rajesh';
let waConvPlaying = false;
let waConvIndex = 0;
let waConvTimer = null;
let liveInterval = null;
let agentBarInterval = null;
let kpiInterval = null;

// ─── DATA STORE ───────────────────────────────────────

const CUSTOMERS = {
  rajesh: {
    name: 'Rajesh Kumar',
    avatar: '👨‍💼',
    age: 32,
    city: 'Patna, Bihar',
    occupation: 'Government Teacher',
    income: '₹42,000 → ₹54,000/mo',
    tenureSBI: '7 years',
    phone: '+91 98765 43210',
    lang: 'Hindi',
    accounts: 'Savings + FD',
    cibilScore: 742,
    balances: { savings: '₹1,24,000', fd: '₹2,50,000', loan: 'None' },
    lifeEvent: 'MARRIAGE',
    lifeEventConf: 94,
    txPattern: [
      { label: 'UPI Payments', val: 82, color: '#F5A623' },
      { label: 'Gold/Jewellery', val: 67, color: '#FF8C42' },
      { label: 'Wedding Venue', val: 55, color: '#FF6B6B' },
      { label: 'Salary Credit', val: 100, color: '#06D6A0' },
      { label: 'ATM Withdraw', val: 38, color: '#00B4D8' },
    ],
    predictions: [
      { emoji: '💍', text: 'Marriage within 3 months', conf: '94%' },
      { emoji: '🏠', text: 'Home loan inquiry (6 months)', conf: '76%' },
      { emoji: '💳', text: 'Credit card upgrade needed', conf: '68%' },
    ],
    transactions: [
      { date: 'Jul 3', desc: 'WEDDING VENUE UPI', amount: '-₹85,000', type: 'debit', flag: '🎯 Event Signal' },
      { date: 'Jul 2', desc: 'SALARY CREDIT TREASURY', amount: '+₹54,000', type: 'credit', flag: '📈 Hike Detected' },
      { date: 'Jul 1', desc: 'TANISHQ JEWELLERS UPI', amount: '-₹42,000', type: 'debit', flag: '💍 Marriage Signal' },
      { date: 'Jun 28', desc: 'HDFC LIFE INSURANCE', amount: '-₹3,500', type: 'debit', flag: '' },
      { date: 'Jun 25', desc: 'GROCERY STORE UPI', amount: '-₹2,100', type: 'debit', flag: '' },
      { date: 'Jun 24', desc: 'LIC PREMIUM', amount: '-₹8,000', type: 'debit', flag: '' },
    ]
  },
  priya: {
    name: 'Priya Sharma',
    avatar: '👩‍💻',
    age: 28,
    city: 'Mumbai, Maharashtra',
    occupation: 'IT Professional',
    income: '₹85,000/mo',
    tenureSBI: '4 years',
    phone: '+91 87654 32109',
    lang: 'English',
    accounts: 'Savings + RD',
    cibilScore: 798,
    balances: { savings: '₹3,40,000', fd: 'None', loan: '₹15L Home Loan' },
    lifeEvent: 'HOME PURCHASE',
    lifeEventConf: 88,
    txPattern: [
      { label: 'EMI Payments', val: 90, color: '#F5A623' },
      { label: 'Registry Fee', val: 78, color: '#FF8C42' },
      { label: 'Stamp Duty', val: 72, color: '#FF6B6B' },
      { label: 'Salary Credit', val: 100, color: '#06D6A0' },
      { label: 'Online Shopping', val: 45, color: '#00B4D8' },
    ],
    predictions: [
      { emoji: '🏠', text: 'Home insurance (immediate)', conf: '96%' },
      { emoji: '🔨', text: 'Interior top-up loan (1 month)', conf: '82%' },
      { emoji: '💰', text: 'Tax advisory (Section 24)', conf: '91%' },
    ],
    transactions: [
      { date: 'Jul 4', desc: 'STAMP DUTY GOVT TREASURY', amount: '-₹1,50,000', type: 'debit', flag: '🏠 Home Signal' },
      { date: 'Jul 3', desc: 'REGISTRATION FEE TREASURY', amount: '-₹45,000', type: 'debit', flag: '🏠 Home Signal' },
      { date: 'Jul 2', desc: 'SALARY CREDIT', amount: '+₹85,000', type: 'credit', flag: '' },
      { date: 'Jul 1', desc: 'INTERIOR DESIGN UPI', amount: '-₹12,000', type: 'debit', flag: '🔨 Renovation' },
      { date: 'Jun 29', desc: 'SBI HOME LOAN EMI', amount: '-₹22,500', type: 'debit', flag: '' },
    ]
  },
  vikram: {
    name: 'Vikram Patel',
    avatar: '👨‍💼',
    age: 41,
    city: 'Ahmedabad, Gujarat',
    occupation: 'Business Owner',
    income: '₹1,20,000/mo',
    tenureSBI: '12 years',
    phone: '+91 76543 21098',
    lang: 'Gujarati',
    accounts: 'Current + Savings',
    cibilScore: 765,
    balances: { savings: '₹8,50,000', fd: '₹15,00,000', loan: 'Business OD' },
    lifeEvent: 'SALARY HIKE',
    lifeEventConf: 79,
    txPattern: [
      { label: 'Business Payments', val: 95, color: '#F5A623' },
      { label: 'MF Investments', val: 60, color: '#00B4D8' },
      { label: 'Travel', val: 42, color: '#FF8C42' },
      { label: 'Revenue Credit', val: 100, color: '#06D6A0' },
      { label: 'Insurance', val: 35, color: '#7B2FBE' },
    ],
    predictions: [
      { emoji: '📈', text: 'Wealth management upgrade', conf: '87%' },
      { emoji: '💳', text: 'Premium business credit card', conf: '82%' },
      { emoji: '🏢', text: 'Commercial property loan', conf: '65%' },
    ],
    transactions: [
      { date: 'Jul 5', desc: 'BUSINESS REVENUE CREDIT', amount: '+₹1,20,000', type: 'credit', flag: '📈 Income Hike' },
      { date: 'Jul 3', desc: 'SUPPLIER PAYMENT RTGS', amount: '-₹85,000', type: 'debit', flag: '' },
      { date: 'Jul 2', desc: 'AXIS MF SIP', amount: '-₹25,000', type: 'debit', flag: '' },
      { date: 'Jun 30', desc: 'GST PAYMENT', amount: '-₹32,000', type: 'debit', flag: '' },
      { date: 'Jun 28', desc: 'INTERNATIONAL TRAVEL', amount: '-₹45,000', type: 'debit', flag: '' },
    ]
  },
  meena: {
    name: 'Meena Devi',
    avatar: '👩',
    age: 29,
    city: 'Jaipur, Rajasthan',
    occupation: 'Homemaker',
    income: '₹0 (Household)',
    tenureSBI: '5 years',
    phone: '+91 65432 10987',
    lang: 'Hindi',
    accounts: 'Savings (Joint)',
    cibilScore: 0,
    balances: { savings: '₹45,000', fd: 'None', loan: 'None' },
    lifeEvent: 'CHILD BIRTH',
    lifeEventConf: 96,
    txPattern: [
      { label: 'Maternity Hosp.', val: 88, color: '#FF6B6B' },
      { label: 'Baby Products', val: 65, color: '#FF8C42' },
      { label: 'Pharmacy', val: 72, color: '#F5A623' },
      { label: 'Husband Transfer', val: 100, color: '#06D6A0' },
      { label: 'ATM', val: 30, color: '#00B4D8' },
    ],
    predictions: [
      { emoji: '👶', text: 'Sukanya Samriddhi Yojana', conf: '98%' },
      { emoji: '📚', text: 'Child education plan', conf: '91%' },
      { emoji: '🛡', text: 'Family health insurance', conf: '86%' },
    ],
    transactions: [
      { date: 'Jul 5', desc: 'FORTIS HOSPITAL PAYMENT', amount: '-₹28,000', type: 'debit', flag: '👶 Birth Signal' },
      { date: 'Jul 4', desc: 'FIRST CRY ONLINE', amount: '-₹8,500', type: 'debit', flag: '👶 Baby Products' },
      { date: 'Jul 3', desc: 'HUSBAND TRANSFER', amount: '+₹35,000', type: 'credit', flag: '' },
      { date: 'Jul 2', desc: 'APOLLO PHARMACY', amount: '-₹3,200', type: 'debit', flag: '' },
      { date: 'Jun 30', desc: 'GROCERY UPI', amount: '-₹4,500', type: 'debit', flag: '' },
    ]
  }
};

const LIFE_EVENTS = [
  { emoji: '💍', name: 'Marriage', category: 'Family', signal: 'Wedding venue UPI + jewellery purchase' },
  { emoji: '🏠', name: 'Home Purchase', category: 'Asset', signal: 'Stamp duty + registry fee payment' },
  { emoji: '👶', name: 'Child Birth', category: 'Family', signal: 'Maternity hospital + baby products' },
  { emoji: '📈', name: 'Salary Hike', category: 'Income', signal: 'Monthly credit increase > 20%' },
  { emoji: '🧓', name: 'Retirement', category: 'Milestone', signal: 'Age 58 + pension credit begins' },
  { emoji: '🪔', name: 'Diwali Bonus', category: 'Festival', signal: 'Large withdrawal in Oct-Nov' },
  { emoji: '🎓', name: 'Child Admission', category: 'Education', signal: 'School/college fee payment' },
  { emoji: '✈️', name: 'Foreign Travel', category: 'Lifestyle', signal: 'Forex card + IRCTC/airport' },
  { emoji: '📊', name: 'Investment Start', category: 'Finance', signal: 'First MF/SIP transaction' },
  { emoji: '🚗', name: 'Vehicle Purchase', category: 'Asset', signal: 'Auto showroom UPI + insurance' },
  { emoji: '🔨', name: 'Home Renovation', category: 'Asset', signal: 'Hardware store + contractor UPI' },
  { emoji: '💒', name: 'Child Marriage', category: 'Family', signal: 'Large venue + gold purchase' },
  { emoji: '🌾', name: 'Harvest Season', category: 'Rural', signal: 'Large cash credit (Kharif/Rabi)' },
  { emoji: '🏭', name: 'Business Start', category: 'Business', signal: 'GST registration + bulk purchases' },
  { emoji: '📦', name: 'Business Expansion', category: 'Business', signal: 'Large RTGS + new accounts' },
  { emoji: '🏥', name: 'Medical Emergency', category: 'Health', signal: 'Hospital UPI spike' },
  { emoji: '🎂', name: 'Birthday Milestone', category: 'Lifestyle', signal: 'Age-based: 18, 25, 40, 60' },
  { emoji: '📍', name: 'City Relocation', category: 'Lifestyle', signal: 'New city UPI transactions' },
  { emoji: '💸', name: 'Inheritance', category: 'Finance', signal: 'Large one-time credit' },
  { emoji: '🎪', name: 'Holi/Navratri', category: 'Festival', signal: 'Seasonal spend pattern' },
  { emoji: '👴', name: 'Parent Aging', category: 'Family', signal: 'Medical + pension transfers' },
  { emoji: '📡', name: 'Digital First Use', category: 'Digital', signal: 'First UPI/YONO transaction' },
  { emoji: '💰', name: 'FD Maturity', category: 'Finance', signal: 'FD maturity credit received' },
  { emoji: '🛡', name: 'Insurance Expiry', category: 'Finance', signal: '30 days before policy renewal' },
  { emoji: '🏗️', name: 'Plot Purchase', category: 'Asset', signal: 'Land registry payment' },
  { emoji: '🌐', name: 'NRI Return', category: 'Milestone', signal: 'Foreign credit stops, domestic starts' },
  { emoji: '🎯', name: 'Loan Closure', category: 'Finance', signal: 'Final EMI payment' },
  { emoji: '📱', name: 'Smartphone First', category: 'Digital', signal: 'First online purchase after UPI' },
  { emoji: '🌿', name: 'Eid/Onam', category: 'Festival', signal: 'Festive seasonal spend pattern' },
  { emoji: '👨‍🎓', name: 'Education Loan', category: 'Education', signal: 'College fee + education UPI' },
  { emoji: '🏦', name: 'PPF/EPF Withdrawal', category: 'Finance', signal: 'Govt portal withdrawal' },
  { emoji: '🚀', name: 'Job Change', category: 'Income', signal: 'New employer NEFT credit' },
  { emoji: '💡', name: 'Energy Upgrade', category: 'Lifestyle', signal: 'Solar/EV company payment' },
  { emoji: '🛒', name: 'E-commerce Spike', category: 'Lifestyle', signal: '5x usual online shopping' },
  { emoji: '🌍', name: 'International Student', category: 'Education', signal: 'Forex transfer + visa fee' },
  { emoji: '🏋️', name: 'Health Awareness', category: 'Health', signal: 'Gym + health app subscriptions' },
  { emoji: '💎', name: 'Gold Accumulation', category: 'Finance', signal: 'Regular gold shop payments' },
  { emoji: '🏨', name: 'Second Home', category: 'Asset', signal: 'Second property registry' },
  { emoji: '🔑', name: 'EMI Initiation', category: 'Finance', signal: 'First home/auto loan EMI' },
  { emoji: '🧘', name: 'Pre-retirement', category: 'Milestone', signal: 'Age 55 + investment increases' },
];

const SCENARIOS = {
  rajesh: {
    name: 'Rajesh Kumar — Marriage Event',
    steps: [
      { type: 'info', delay: 200, text: '[2026-07-05 14:23:01] System: New transaction batch received from CBS Kafka topic' },
      { type: 'info', delay: 600, text: '[14:23:01] Data: UPI_TXN | WEDDING VENUE PATNA | ₹85,000 | CustomerID: RK_7892' },
      { type: 'agent', delay: 1000, text: '[14:23:02] Context Agent → Processing transaction vector...' },
      { type: 'agent', delay: 1400, text: '[14:23:02] Context Agent → Cross-referencing with historical vectors in FAISS DB...' },
      { type: 'info', delay: 1800, text: '[14:23:02] Context Agent → Previous signals: TANISHQ_JEWELLERS (3 days ago), FLOWER_VENDOR (2 days ago)' },
      { type: 'warn', delay: 2200, text: '[14:23:03] Context Agent → LIFE EVENT DETECTED: MARRIAGE | Confidence: 94.2%' },
      { type: 'agent', delay: 2800, text: '[14:23:03] Financial Intelligence Agent → Loading customer financial profile...' },
      { type: 'info', delay: 3200, text: '[14:23:03] Financial Intel → Balance: ₹1.24L savings | CIBIL: 742 | Income: ₹54K/mo' },
      { type: 'info', delay: 3600, text: '[14:23:04] Financial Intel → Eligibility Check: Home Loan ✓ | Health Insurance ✓ | SIP ✓' },
      { type: 'agent', delay: 4200, text: '[14:23:04] Strategy Agent → Matching life event to product catalog...' },
      { type: 'warn', delay: 4800, text: '[14:23:04] Strategy Agent → Recommendations: [FAMILY_HEALTH_INSURANCE, JOINT_ACCOUNT, HOME_LOAN_PRE_APPROVAL]' },
      { type: 'agent', delay: 5400, text: '[14:23:05] Guardrail Agent → Validating all recommendations against RBI guidelines...' },
      { type: 'success', delay: 5900, text: '[14:23:05] Guardrail Agent → ✓ COMPLIANT | Disclosure added | Suitability verified' },
      { type: 'agent', delay: 6400, text: '[14:23:05] Outreach Agent → Selecting optimal channel: WhatsApp (last active 4h ago)' },
      { type: 'agent', delay: 6900, text: '[14:23:06] Outreach Agent → Composing message in Hindi (preferred language: hi)...' },
      { type: 'success', delay: 7400, text: '[14:23:06] Outreach Agent → ✓ MESSAGE SENT via WhatsApp | Status: Delivered' },
      { type: 'success', delay: 8000, text: '─────────────────────────────────────────────────────────' },
      { type: 'success', delay: 8100, text: '✅ PIPELINE COMPLETE | 1 event → 3 products queued | Latency: 5.2s | Customer: Rajesh Kumar' },
    ]
  },
  priya: {
    name: 'Priya Sharma — Home Purchase Event',
    steps: [
      { type: 'info', delay: 200, text: '[2026-07-05 10:11:05] CBS: STAMP_DUTY_PAYMENT | GOI_TREASURY | ₹1,50,000 | CustomerID: PS_4421' },
      { type: 'agent', delay: 700, text: '[10:11:06] Context Agent → Stamp duty detected. Checking for correlated signals...' },
      { type: 'info', delay: 1200, text: '[10:11:06] Context Agent → Correlated: REGISTRATION_FEE (₹45K, 2 days ago) | HOME_LOAN_EMI_START (new)' },
      { type: 'warn', delay: 1800, text: '[10:11:07] Context Agent → LIFE EVENT: HOME PURCHASE CONFIRMED | Confidence: 88.7%' },
      { type: 'agent', delay: 2400, text: '[10:11:07] Financial Intel → Income ₹85K/mo | Home Loan ₹15L | EMI/Income ratio: 26% (healthy)' },
      { type: 'agent', delay: 3000, text: '[10:11:08] Strategy Agent → Products matched: HOME_INSURANCE, INTERIOR_LOAN, TAX_ADVISORY_SEC24' },
      { type: 'agent', delay: 3600, text: '[10:11:08] Guardrail Agent → Checking IRDAI regulations for home insurance offer...' },
      { type: 'success', delay: 4200, text: '[10:11:09] Guardrail Agent → ✓ ALL COMPLIANT | Regulatory disclosures attached' },
      { type: 'success', delay: 4800, text: '[10:11:09] Outreach → WhatsApp sent in English | Open rate predicted: 94%' },
      { type: 'success', delay: 5400, text: '✅ HOME PURCHASE JOURNEY INITIATED for Priya Sharma | 3 products | Revenue potential: ₹4.2L' },
    ]
  },
  vikram: {
    name: 'Vikram Patel — Salary/Income Hike',
    steps: [
      { type: 'info', delay: 200, text: '[2026-07-05 09:15:00] CBS: SALARY_CREDIT | SALARY | ₹1,20,000 (prev: ₹82,000) | +46.3%' },
      { type: 'agent', delay: 700, text: '[09:15:01] Financial Intel Agent → Income delta: +46.3% month-on-month. Significant hike detected.' },
      { type: 'agent', delay: 1300, text: '[09:15:01] Context Agent → Cross-checking: LinkedIn signal not available. Payslip NEFT pattern changed.' },
      { type: 'warn', delay: 1900, text: '[09:15:02] Context Agent → LIFE EVENT: MAJOR INCOME HIKE | Confidence: 79.1%' },
      { type: 'agent', delay: 2500, text: '[09:15:02] Financial Intel → Current Portfolio: FD ₹15L, No MF, Business OD active' },
      { type: 'agent', delay: 3100, text: '[09:15:03] Strategy Agent → Recommendations: WEALTH_MANAGEMENT_UPGRADE, PREMIUM_BUSINESS_CARD, SIP_START' },
      { type: 'agent', delay: 3700, text: '[09:15:03] Strategy Agent → Surplus ₹38,000/mo available for investment after all commitments' },
      { type: 'success', delay: 4300, text: '[09:15:04] Guardrail → ✓ SEBI suitability verified | Investment risk disclosed | Compliant' },
      { type: 'success', delay: 4900, text: '[09:15:04] Outreach → WhatsApp in Gujarati | Phygital flag: Relationship Manager alert triggered' },
      { type: 'success', delay: 5500, text: '✅ WEALTH MANAGEMENT JOURNEY for Vikram Patel | AUM potential: ₹30L | Revenue: ₹1.2L/yr' },
    ]
  },
  meena: {
    name: 'Meena Devi — Child Birth Event',
    steps: [
      { type: 'info', delay: 200, text: '[2026-07-05 15:30:00] UPI: FORTIS_HOSPITAL_JAIPUR | ₹28,000 | Pattern: MATERNITY_WARD' },
      { type: 'agent', delay: 700, text: '[15:30:01] Context Agent → Medical payment to maternity ward. Checking age profile...' },
      { type: 'info', delay: 1300, text: '[15:30:01] Context Agent → Customer age: 29F. Pattern: FIRST_CRY_ONLINE ₹8,500 (2 days later)' },
      { type: 'warn', delay: 1900, text: '[15:30:02] Context Agent → LIFE EVENT: CHILD BIRTH CONFIRMED | Confidence: 96.4% | HIGH PRIORITY' },
      { type: 'agent', delay: 2500, text: '[15:30:02] Financial Intel → Balance: ₹45,000 | Joint account with spouse ₹2.8L | Stable' },
      { type: 'agent', delay: 3100, text: '[15:30:03] Strategy Agent → Recommendations: SUKANYA_SAMRIDDHI_YOJANA, CHILD_EDUCATION_SIP, FAMILY_HEALTH_INSURANCE' },
      { type: 'warn', delay: 3700, text: '[15:30:03] Strategy Agent → NOTE: Sukanya Samriddhi available only for girl child. Gender unknown. Offering both options.' },
      { type: 'agent', delay: 4300, text: '[15:30:04] Guardrail → Validating govt scheme eligibility | Post Office MoU check...' },
      { type: 'success', delay: 4900, text: '[15:30:04] Guardrail → ✓ COMPLIANT | SSY + HDFC Life child plan recommended' },
      { type: 'success', delay: 5500, text: '[15:30:05] Outreach → Hindi WhatsApp | Empathetic tone template selected | Congratulations message' },
      { type: 'success', delay: 6100, text: '✅ CHILD BIRTH JOURNEY for Meena Devi | Govt scheme + insurance | ₹500 Cr SSY potential nationwide' },
    ]
  }
};

const WA_CONVERSATIONS = {
  rajesh_marriage_hi: {
    messages: [
      { role: 'saarthi', text: '🎊 *राजेश भाई, शादी मुबारक हो!*\n\nमैं SBI सारथी हूँ — आपका AI वित्तीय साथी।\n\nहमने देखा कि आपने हाल ही में वेडिंग वेन्यू के लिए ₹85,000 का UPI भुगतान किया है।', delay: 1000 },
      { role: 'saarthi', text: 'शादी के बाद आपके परिवार की सुरक्षा के लिए, मैं आपके लिए 3 खास सुझाव लाया हूँ:', delay: 2500 },
      { role: 'saarthi', text: '1️⃣ *परिवार स्वास्थ्य बीमा* — ₹5L coverage, ₹680/माह\n2️⃣ *ज्वाइंट अकाउंट* — शेयर्ड खर्च के लिए\n3️⃣ *होम लोन प्री-अप्रूवल* — ₹25L तक, 30 सेकंड में', delay: 4000 },
      { role: 'saarthi', text: 'क्या आप इनमें से किसी के बारे में अधिक जानकारी चाहेंगे?\n\n*1* - हाँ, स्वास्थ्य बीमा के बारे में बताएं\n*2* - होम लोन की जानकारी चाहिए\n*3* - तीनों के बारे में', delay: 5500 },
      { role: 'user', text: '1', delay: 7000 },
      { role: 'saarthi', text: '✅ बढ़िया!\n\n*SBI परिवार स्वास्थ्य बीमा* की मुख्य बातें:\n\n💊 ₹5 लाख का कवरेज (पति-पत्नी दोनों)\n🏥 7,500+ नेटवर्क अस्पताल\n💰 प्रीमियम: मात्र ₹680/माह\n📋 *कोई मेडिकल जांच नहीं* (शादी के 3 महीने के भीतर)\n\nक्या मैं आपके लिए आवेदन शुरू करूँ?', delay: 8500 },
      { role: 'user', text: 'हाँ, करो', delay: 10000 },
      { role: 'saarthi', text: '🎉 *आवेदन शुरू हो गया!*\n\nआपका पॉलिसी नंबर जल्द ही SMS से आएगा।\n\nSBI YONO पर पूरी जानकारी देखें 👉\n\n*आपकी मदद करके खुशी हुई, राजेश भाई!* 🙏', delay: 11500 },
    ]
  },
  rajesh_marriage_en: {
    messages: [
      { role: 'saarthi', text: '🎊 *Congratulations Rajesh ji!*\n\nI\'m SBI Saarthi, your AI financial companion.\n\nWe noticed your payment to the wedding venue — congratulations on your upcoming marriage!', delay: 1000 },
      { role: 'saarthi', text: 'I have 3 personalized recommendations for your new family:', delay: 2500 },
      { role: 'saarthi', text: '1️⃣ *Family Health Insurance* — ₹5L coverage, ₹680/month\n2️⃣ *Joint Account* — For shared family expenses\n3️⃣ *Home Loan Pre-approval* — Up to ₹25L in 30 seconds', delay: 4000 },
      { role: 'user', text: 'Tell me about home loan', delay: 5500 },
      { role: 'saarthi', text: '🏠 *SBI Home Loan Pre-Approval*\n\nBased on your income of ₹54,000/month:\n\n✅ Eligible amount: *₹25–35 Lakhs*\n📊 Interest rate: 8.5% (floating)\n📅 Tenure: Up to 30 years\n💳 EMI: ₹19,500/month approx\n\nWould you like me to initiate the application?', delay: 7000 },
      { role: 'user', text: 'Yes please', delay: 8500 },
      { role: 'saarthi', text: '✅ *Home Loan journey initiated!*\n\nYou will receive a call from your SBI branch within 2 hours.\n\nReference: *SBI/HL/2026/RAJESH/001*\n\nIs there anything else I can help with? 🙏', delay: 10000 },
    ]
  },
  priya_home_en: {
    messages: [
      { role: 'saarthi', text: '🏠 *Congratulations on your new home, Priya!*\n\nSBI Saarthi here. We noticed your stamp duty and registration payment — how exciting!', delay: 1000 },
      { role: 'saarthi', text: '3 important things every new homeowner needs:\n\n🛡 *Home Insurance* — Protect your investment\n🔨 *Interior Top-up Loan* — For furnishing & renovation\n📊 *Tax Advisory* — Save up to ₹2L under Section 24', delay: 2500 },
      { role: 'user', text: 'Home insurance sounds good', delay: 4000 },
      { role: 'saarthi', text: '✅ *SBI Home Shield Insurance*\n\nFor your property value of ₹75L approx:\n\n🏗 Structure coverage: ₹75L\n🛋 Contents: ₹5L\n💰 Annual premium: ₹3,200\n\nShall I initiate the policy?', delay: 5500 },
      { role: 'user', text: 'Yes!', delay: 7000 },
      { role: 'saarthi', text: '🎉 *Policy Initiated!*\n\nPolicy No: SBI/HOME/2026/PRI/042\nCoverage starts: Today\n\nYour policy documents will be emailed within 2 hours.\n\nEnjoy your new home! 🏠✨', delay: 8500 },
    ]
  },
  meena_baby_hi: {
    messages: [
      { role: 'saarthi', text: '👶 *बधाई हो मीना जी!*\n\nSBI सारथी की ओर से आपके परिवार के नए सदस्य का स्वागत है! 🎉\n\nआपकी बेटी/बेटे की सुरक्षित भविष्य के लिए मेरे पास 3 सुझाव हैं:', delay: 1000 },
      { role: 'saarthi', text: '1️⃣ *सुकन्या समृद्धि योजना* (बेटी के लिए)\n   → सरकारी योजना | 8.2% ब्याज\n\n2️⃣ *बाल शिक्षा SIP* \n   → ₹500/माह से शुरू | 18 वर्ष में ₹5L+\n\n3️⃣ *परिवार स्वास्थ्य बीमा*\n   → नवजात कवर | ₹850/माह', delay: 2500 },
      { role: 'user', text: 'सुकन्या के बारे में बताओ', delay: 4000 },
      { role: 'saarthi', text: '🌸 *सुकन्या समृद्धि योजना*\n\n✅ बेटियों के लिए सरकारी योजना\n💰 ब्याज दर: 8.2% (टैक्स-फ्री)\n📅 मासिक जमा: ₹250 से ₹1.5L तक\n🎂 परिपक्वता: बेटी के 21 वर्ष पर\n\n*न्यूनतम ₹500/माह जमा करने पर 21 साल में ₹4.2 लाख!*\n\nखाता खुलवाने के लिए हाँ लिखें 🙏', delay: 5500 },
      { role: 'user', text: 'हाँ', delay: 7000 },
      { role: 'saarthi', text: '✅ *SSY खाता शुरू!*\n\nआपके नजदीकी SBI शाखा में कल 10 बजे अपॉइंटमेंट बुक किया गया है।\n\nजरूरी दस्तावेज:\n📄 बच्चे का जन्म प्रमाण पत्र\n🆔 माता-पिता का आधार कार्ड\n\n*आपकी बेटी का भविष्य सुरक्षित है!* 🌸', delay: 8500 },
    ]
  }
};

const FEED_EVENTS = [
  { icon: '💍', name: 'Arun Mehta', city: 'Delhi', event: 'MARRIAGE DETECTED', detail: 'Wedding venue UPI ₹1.2L', color: 'gold', products: 3 },
  { icon: '🏠', name: 'Kavita Singh', city: 'Pune', event: 'HOME PURCHASE', detail: 'Stamp duty ₹90K detected', color: 'teal', products: 2 },
  { icon: '👶', name: 'Ramesh Nair', city: 'Kochi', event: 'CHILD BIRTH', detail: 'Maternity hospital payment', color: 'green', products: 3 },
  { icon: '📈', name: 'Deepak Verma', city: 'Bangalore', event: 'SALARY HIKE +38%', detail: 'Income jump detected', color: 'coral', products: 2 },
  { icon: '🪔', name: 'Sunita Patel', city: 'Surat', event: 'DIWALI BONUS', detail: 'Large withdrawal + gold', color: 'gold', products: 2 },
  { icon: '🧓', name: 'Mohan Rao', city: 'Chennai', event: 'RETIREMENT SIGNAL', detail: 'Age 58 + pension begins', color: 'purple', products: 4 },
  { icon: '🎓', name: 'Anjali Sharma', city: 'Jaipur', event: 'CHILD ADMISSION', detail: 'School fee ₹85K detected', color: 'teal', products: 2 },
  { icon: '🚗', name: 'Vikas Jain', city: 'Indore', event: 'VEHICLE PURCHASE', detail: 'Auto showroom payment', color: 'coral', products: 2 },
];

const SMS_RESPONSES = {
  'balance': ['Namaste! Aapka SBI savings balance: ₹1,24,500. Kuch aur chahiye? Reply 1 for mini statement, 2 for recent transactions.', 'Account: XXXX4521 | Balance: ₹1,24,500 | Last updated: 5 Jul 2026'],
  'help': ['SBI Saarthi SMS Seva:\n1 - Account balance\n2 - Mini statement\n3 - Nearest branch\n4 - Insurance options\n5 - Loan information\nReply with number.'],
  '1': ['Mini Statement:\n+54,000 SALARY 02-Jul\n-85,000 UPI 03-Jul\n+1,24,500 Current Balance\nFor full statement: 99584 00000'],
  '2': ['Recent 5 transactions sent to registered email. For instant view, use YONO app or call 1800 11 2211 (toll free).'],
  '3': ['Nearest SBI Branch: Boring Road Branch, Patna - 0.8 km\nTimings: 10am-4pm (Mon-Fri)\nATM: 24x7 at Branch'],
  '4': ['SBI Health Insurance: ₹5L cover @ ₹680/month\nSBI Life Insurance: From ₹500/month\nReply HEALTH or LIFE for details.'],
  'health': ['Family Health Insurance:\n- Coverage: ₹5 Lakh\n- Premium: ₹680/month\n- Network: 7500+ hospitals\n- Call: 1800 22 9090 or reply YES to initiate.'],
  'haan': ['Dhanyavaad! Aapka Health Insurance application shuru ho gaya. Policy no. SBI/HI/2026/001. 48 ghante mein confirmation aayega.'],
  'yes': ['Thank you! Your application has been initiated. Reference: SBI/2026/07/001. You will receive a confirmation within 48 hours.'],
  'default': ['Saarthi samajh gaya. Kripya 1-5 ke beech ek number reply karein, ya customer care ke liye call karein: 1800 11 2211 (Free)']
};

const IVR_LANGUAGES = {
  hi: {
    greeting: ['नमस्ते! मैं SBI सारथी हूँ। मैं आपकी सहायता के लिए यहाँ हूँ।',
               'आपके खाते में इस महीने वेतन में वृद्धि देखी गई है।',
               'क्या आप अपनी बचत को SIP में निवेश करना चाहेंगे?'],
    option1: ['बहुत अच्छा! ₹2,000 प्रति माह SIP शुरू करते हैं। YONO पर विवरण भेजा जा रहा है।'],
    option2: ['ठीक है। आपको बाद में जब जरूरत हो, SBI सारथी को MESSAGE करें।'],
    option0: ['मुख्य मेनू पर वापस जा रहे हैं...'],
  },
  ta: {
    greeting: ['வணக்கம்! நான் SBI சாரதி. உங்களுக்கு உதவ இங்கே இருக்கிறேன்.',
               'இந்த மாதம் உங்கள் வருமானம் அதிகரித்துள்ளது.',
               'உங்கள் சேமிப்பை SIP-ல் முதலீடு செய்ய விரும்புகிறீர்களா?'],
    option1: ['சரி! ₹2,000 SIP தொடங்கப்படுகிறது. விவரங்கள் YONO-ல் கிடைக்கும்.'],
    option2: ['பரவாயில்லை. பின்னர் SBI சாரதியை தொடர்பு கொள்ளுங்கள்.'],
    option0: ['முதல் மெனுவிற்கு செல்கிறோம்...'],
  },
  mr: {
    greeting: ['नमस्कार! मी SBI सारथी आहे. मी तुमच्या मदतीसाठी इथे आहे.',
               'या महिन्यात तुमचे वेतन वाढले आहे.',
               'तुम्हाला SIP मध्ये गुंतवणूक करायची आहे का?'],
    option1: ['छान! ₹2,000 प्रति महिना SIP सुरू होत आहे.'],
    option2: ['ठीक आहे. नंतर SBI सारथीशी संपर्क करा.'],
    option0: ['मुख्य मेनूवर परत जात आहे...'],
  },
  bn: {
    greeting: ['নমস্কার! আমি SBI সারথি। আমি আপনাকে সাহায্য করতে এখানে আছি।',
               'এই মাসে আপনার বেতন বেড়েছে।',
               'আপনি কি SIP-এ বিনিয়োগ করতে চান?'],
    option1: ['চমৎকার! ₹2,000 মাসিক SIP শুরু হচ্ছে।'],
    option2: ['ঠিক আছে। পরে SBI সারথিকে মেসেজ করুন।'],
    option0: ['মূল মেনুতে ফিরে যাচ্ছি...'],
  },
  te: {
    greeting: ['నమస్కారం! నేను SBI సారథి. మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను.',
               'ఈ నెల మీ జీతం పెరిగింది.',
               'మీరు SIP లో పెట్టుబడి పెట్టాలనుకుంటున్నారా?'],
    option1: ['చాలా మంచిది! ₹2,000 నెలవారీ SIP ప్రారంభమవుతోంది.'],
    option2: ['సరే. తర్వాత SBI సారథిని సంప్రదించండి.'],
    option0: ['ప్రధాన మెనూకు తిరిగి వెళ్తున్నాను...'],
  },
  gu: {
    greeting: ['નમસ્તે! હું SBI સારથી છું. હું તમારી સહાય માટે અહીં છું.',
               'આ મહિને તમારો પગાર વધ્યો છે.',
               'શું તમે SIP માં રોકાણ કરવા ઇચ્છો છો?'],
    option1: ['ઉત્તમ! ₹2,000 માસિક SIP શરૂ થઈ રહ્યું છે.'],
    option2: ['ઠીક છે. પછી SBI સારથીને સંપર્ક કરો.'],
    option0: ['મુખ્ય મેનૂ પર પાછા ફરી રહ્યા છીએ...'],
  }
};

const PRODUCT_RECS = {
  marriage: [
    { icon: '🛡', name: 'Family Health Insurance', reason: 'Marriage detected → Family coverage needed' },
    { icon: '🏦', name: 'Joint Account', reason: 'Shared expense management' },
    { icon: '🏠', name: 'Home Loan Pre-approval', reason: 'Income supports ₹25-35L eligibility' },
  ],
  home: [
    { icon: '🏡', name: 'Home Shield Insurance', reason: 'Property protection required' },
    { icon: '🔨', name: 'Interior Top-up Loan', reason: 'Renovation/furnishing need predicted' },
    { icon: '📊', name: 'Tax Advisory (Sec 24)', reason: 'Save up to ₹2L on interest' },
  ],
  baby: [
    { icon: '🌸', name: 'Sukanya Samriddhi Yojana', reason: 'Child birth → Govt scheme eligibility' },
    { icon: '📚', name: 'Child Education SIP', reason: 'Long-term education planning' },
    { icon: '💊', name: 'Family Health Insurance', reason: 'Newborn cover inclusion' },
  ],
  salary: [
    { icon: '📈', name: 'Wealth Management Upgrade', reason: 'Income hike → Higher investable surplus' },
    { icon: '💳', name: 'Premium Credit Card', reason: 'Lifestyle upgrade opportunity' },
    { icon: '💰', name: 'SIP Start/Increase', reason: 'Extra ₹20K+ available for investment' },
  ],
  diwali: [
    { icon: '✨', name: 'Gold Loan', reason: 'Gold purchase detected → Liquidity option' },
    { icon: '🛍', name: 'Festival Personal Loan', reason: 'Festive expenditure bridge' },
    { icon: '💳', name: 'EMI on Shopping', reason: 'Convert purchases to 0% EMI' },
  ]
};

// ─── INITIALIZATION ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initEventsGrid();
  initEventsLibrary();
  initAgentsDetailGrid();
  loadCustomer('rajesh', document.getElementById('cust-rajesh'));
  loadWAScenario();
  startLiveFeed();
  startAgentBarAnimation();
  startKPIAnimation();
  runScenario('rajesh', document.querySelector('.scenario-btn'));
  animateAfterStats();
  setIVRLang('hi', document.querySelector('.ivr-lang-btn'));

  // Auto toast on load
  setTimeout(() => showToast('🎯', 'Life Event Detected', 'Rajesh Kumar — Marriage signal (94% confidence)', 'gold'), 2000);
  setTimeout(() => showToast('📨', 'Message Sent', 'Hindi WhatsApp sent to Rajesh Kumar', 'green'), 4500);
  setTimeout(() => showToast('💰', 'Revenue Generated', '₹2.4L revenue from 3 products — Rajesh Kumar', 'teal'), 7000);
});

// ─── TAB SWITCHING ─────────────────────────────────────
function switchTab(tabId, el) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  if (el) el.classList.add('active');

  const labels = {
    dashboard: 'Live Dashboard',
    detector: 'Event Detector',
    agents: 'Agent Pipeline',
    whatsapp: 'WhatsApp Engagement',
    customers: 'Customer 360°',
    metrics: 'Impact Metrics',
    bharat: 'Bharat Mode'
  };
  document.getElementById('breadcrumb').textContent = labels[tabId] || tabId;

  // Tab-specific init
  if (tabId === 'metrics') animateAfterStats();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ─── LANGUAGE ──────────────────────────────────────────
function setLang(lang, btn) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset['en'];
  });
}

// ─── DASHBOARD ─────────────────────────────────────────
function initDashboard() {
  const feed = document.getElementById('eventFeed');
  FEED_EVENTS.slice(0, 5).forEach((ev, i) => {
    setTimeout(() => {
      const mins = Math.floor(Math.random() * 45) + 1;
      const item = document.createElement('div');
      item.className = 'feed-item';
      item.innerHTML = `
        <div class="feed-icon">${ev.icon}</div>
        <div class="feed-content">
          <div class="feed-name">${ev.name} <span style="color:var(--muted);font-weight:400;font-size:10.5px">${ev.city}</span></div>
          <div class="feed-event">${ev.event}</div>
          <div class="feed-detail">${ev.detail} — ${ev.products} products queued</div>
        </div>
        <div class="feed-time">${mins}m ago</div>`;
      feed.appendChild(item);
    }, i * 300);
  });
}

function initEventsGrid() {
  const grid = document.getElementById('eventsGrid');
  const today = [
    { emoji: '💍', name: 'Marriage', count: 42 },
    { emoji: '🏠', name: 'Home Purchase', count: 31 },
    { emoji: '👶', name: 'Child Birth', count: 18 },
    { emoji: '📈', name: 'Salary Hike', count: 87 },
    { emoji: '🪔', name: 'Festival', count: 24 },
    { emoji: '🧓', name: 'Retirement', count: 9 },
    { emoji: '🎓', name: 'Child Admission', count: 36 },
    { emoji: '🚗', name: 'Vehicle', count: 14 },
  ];
  today.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'ev-item';
    div.innerHTML = `<div class="ev-emoji">${ev.emoji}</div><div class="ev-name">${ev.name}</div><div class="ev-count">${ev.count} detected</div>`;
    div.onclick = () => { switchTab('detector', document.querySelector('[data-tab="detector"]')); };
    grid.appendChild(div);
  });
}

// ─── LIVE FEED ANIMATION ───────────────────────────────
function startLiveFeed() {
  let idx = 0;
  liveInterval = setInterval(() => {
    const feed = document.getElementById('eventFeed');
    const ev = FEED_EVENTS[idx % FEED_EVENTS.length];
    const mins = Math.floor(Math.random() * 3);
    const item = document.createElement('div');
    item.className = 'feed-item';
    item.innerHTML = `
      <div class="feed-icon">${ev.icon}</div>
      <div class="feed-content">
        <div class="feed-name">${ev.name} <span style="color:var(--muted);font-weight:400;font-size:10.5px">${ev.city}</span></div>
        <div class="feed-event">${ev.event}</div>
        <div class="feed-detail">${ev.detail} — ${ev.products} products queued</div>
      </div>
      <div class="feed-time">${mins === 0 ? 'Just now' : mins + 'm ago'}</div>`;
    feed.insertBefore(item, feed.firstChild);
    if (feed.children.length > 8) feed.removeChild(feed.lastChild);

    // Update KPI
    const kpiEvEl = document.getElementById('kpi-events');
    const current = parseInt(kpiEvEl.textContent.replace(',', ''));
    kpiEvEl.textContent = (current + Math.floor(Math.random() * 3) + 1).toLocaleString('en-IN');

    idx++;
  }, 4000);
}

function startAgentBarAnimation() {
  agentBarInterval = setInterval(() => {
    const bars = [
      { bar: 'context', pct: 'pct-context', min: 70, max: 95 },
      { bar: 'fin', pct: 'pct-fin', min: 55, max: 88 },
      { bar: 'strat', pct: 'pct-strat', min: 45, max: 80 },
      { bar: 'guard', pct: 'pct-guard', min: 30, max: 65 },
      { bar: 'out', pct: 'pct-out', min: 75, max: 98 },
    ];
    bars.forEach(b => {
      const val = Math.floor(Math.random() * (b.max - b.min) + b.min);
      const barEl = document.getElementById('bar-' + b.bar);
      const pctEl = document.getElementById('pct-' + b.bar);
      if (barEl) barEl.style.width = val + '%';
      if (pctEl) pctEl.textContent = val + '%';
    });
  }, 3000);
}

function startKPIAnimation() {
  kpiInterval = setInterval(() => {
    const msgEl = document.getElementById('kpi-messages');
    if (msgEl) {
      const cur = parseInt(msgEl.textContent.replace(',', ''));
      msgEl.textContent = (cur + Math.floor(Math.random() * 2) + 1).toLocaleString('en-IN');
    }
    const revEl = document.getElementById('kpi-revenue');
    if (revEl) {
      const parts = revEl.textContent.replace('₹', '').replace(' Cr', '').split('.');
      const val = parseFloat(parts[0] + '.' + (parts[1] || '0'));
      revEl.textContent = '₹' + (val + 0.1).toFixed(1) + ' Cr';
    }
  }, 5000);
}

// ─── EVENT DETECTOR ────────────────────────────────────
function initEventsLibrary() {
  const lib = document.getElementById('eventsLibrary');
  LIFE_EVENTS.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'lib-item';
    div.innerHTML = `<span class="lib-emoji">${ev.emoji}</span>${ev.name}<div style="font-size:9px;color:var(--muted);margin-top:2px">${ev.category}</div>`;
    div.title = ev.signal;
    lib.appendChild(div);
  });
}

async function runDetector() {
  const cust = document.getElementById('simCustomer').value;
  const evType = document.getElementById('simEventType').value;
  const amount = document.getElementById('simAmount').value;

  const pipeline = document.getElementById('detectionPipeline');
  const result = document.getElementById('detectionResult');
  pipeline.style.display = 'block';
  result.style.display = 'none';

  const steps = ['pip1', 'pip2', 'pip3', 'pip4', 'pip5'];
  const details = {
    pip1: `₹${parseInt(amount).toLocaleString('en-IN')} transaction ingested`,
    pip2: 'Event pushed to CBS_EVENTS topic',
    pip3: 'Analyzing behavioral vectors...',
    pip4: 'Historical pattern: 94.2% match',
    pip5: 'CONFIRMED — Action queued',
  };

  // Reset
  steps.forEach(s => {
    const el = document.getElementById(s);
    el.classList.remove('active', 'done');
    document.getElementById(s + '-detail').textContent = '—';
  });

  for (let i = 0; i < steps.length; i++) {
    await sleep(600 + i * 300);
    const el = document.getElementById(steps[i]);
    if (i > 0) {
      document.getElementById(steps[i-1]).classList.remove('active');
      document.getElementById(steps[i-1]).classList.add('done');
    }
    el.classList.add('active');
    document.getElementById(steps[i] + '-detail').textContent = details[steps[i]];
  }

  await sleep(500);
  document.getElementById('pip5').classList.remove('active');
  document.getElementById('pip5').classList.add('done');

  // Show result
  const eventData = {
    marriage: { event: 'MARRIAGE', confidence: 94, products: ['Family Health Insurance', 'Joint Account', 'Home Loan Pre-Approval'], channel: 'WhatsApp (Hindi)' },
    home: { event: 'HOME PURCHASE', confidence: 88, products: ['Home Shield Insurance', 'Interior Top-up Loan', 'Tax Advisory Section 24'], channel: 'WhatsApp + YONO' },
    baby: { event: 'CHILD BIRTH', confidence: 96, products: ['Sukanya Samriddhi Yojana', 'Child Education SIP', 'Family Health Insurance'], channel: 'WhatsApp (Hindi)' },
    salary: { event: 'SALARY HIKE', confidence: 79, products: ['Wealth Management', 'Premium Credit Card', 'SIP Start'], channel: 'WhatsApp + Branch Alert' },
    diwali: { event: 'FESTIVAL BONUS', confidence: 82, products: ['Gold Loan', 'Festival Personal Loan', 'EMI Option'], channel: 'WhatsApp (Regional Lang)' },
    retire: { event: 'RETIREMENT SIGNAL', confidence: 91, products: ['Senior Citizen FD', 'Health Insurance', 'Will Management Advisory'], channel: 'Voice IVR + Branch' },
  };

  const data = eventData[evType] || eventData.marriage;
  result.style.display = 'block';
  result.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px">
        <div style="font-size:11px;color:var(--muted);font-weight:600;letter-spacing:.05em">LIFE EVENT DETECTED</div>
        <div style="font-size:22px;font-weight:800;color:var(--green);margin:6px 0">${data.event}</div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="font-size:13px;color:var(--muted)">AI Confidence:</div>
          <div style="font-size:18px;font-weight:700;color:var(--gold)">${data.confidence}%</div>
        </div>
        <div style="margin-top:10px;font-size:12px;color:var(--muted)">
          Outreach Channel: <span style="color:var(--teal)">${data.channel}</span>
        </div>
      </div>
      <div style="flex:1;min-width:200px">
        <div style="font-size:11px;color:var(--muted);font-weight:600;letter-spacing:.05em;margin-bottom:8px">PRODUCTS QUEUED</div>
        ${data.products.map(p => `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--green)">✓</span><span style="font-size:12px;color:var(--off-white)">${p}</span></div>`).join('')}
      </div>
    </div>`;

  showToast('🎯', 'Event Detected!', `${data.event} — ${data.confidence}% confidence`, 'gold');
}

// ─── AGENT PIPELINE ────────────────────────────────────
function initAgentsDetailGrid() {
  const grid = document.getElementById('agentsDetailGrid');
  const agents = [
    { icon: '🔍', name: 'Context Agent', role: 'Event Detection', color: 'var(--gold)',
      tasks: ['Analyzes transaction vectors', 'Cross-references behavioral DB', 'Detects 40+ life events', 'Confidence scoring'] },
    { icon: '📊', name: 'Financial Intelligence', role: 'Pattern Analysis', color: 'var(--teal)',
      tasks: ['Reads 24-month history', 'Computes income patterns', 'Checks CIBIL scores', 'Eligibility analysis'] },
    { icon: '🎯', name: 'Strategy Agent', role: 'Product Matching', color: 'var(--coral)',
      tasks: ['Maps events to products', 'Personalizes offer value', 'Ranks by relevance score', 'Prevents over-selling'] },
    { icon: '🛡', name: 'Guardrail Agent', role: 'RBI Compliance', color: 'var(--green)',
      tasks: ['Validates RBI guidelines', 'SEBI suitability check', 'Adds mandatory disclosures', 'Blocks non-compliant offers'] },
    { icon: '📣', name: 'Outreach Agent', role: 'Channel Delivery', color: 'var(--purple)',
      tasks: ['Selects optimal channel', 'Composes vernacular message', 'Schedules delivery time', 'Tracks open & response'] },
  ];

  agents.forEach(ag => {
    const div = document.createElement('div');
    div.className = 'agent-detail-card';
    div.style.borderTopColor = ag.color;
    div.style.borderTopWidth = '3px';
    div.innerHTML = `
      <div class="ag-icon">${ag.icon}</div>
      <div class="ag-name">${ag.name}</div>
      <div class="ag-role" style="color:${ag.color}">${ag.role}</div>
      <div class="ag-tasks">${ag.tasks.map(t => `<div>${t}</div>`).join('')}</div>`;
    grid.appendChild(div);
  });
}

async function runScenario(key, btn) {
  // Update button states
  document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Reset architecture visual
  document.querySelectorAll('.arch-source, .arch-agent, .arch-output').forEach(el => {
    el.classList.remove('active', 'done');
  });
  document.querySelectorAll('.kafka, .orchestrator').forEach(el => el.classList.remove('active'));

  const scenario = SCENARIOS[key];
  const log = document.getElementById('agentLog');
  log.innerHTML = `<div class="log-line warn">▶ Running scenario: ${scenario.name}</div>`;

  // Animate architecture
  setTimeout(() => highlightArch(), 500);

  for (const step of scenario.steps) {
    await sleep(step.delay);
    const line = document.createElement('div');
    line.className = `log-line ${step.type}`;
    line.textContent = step.text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }
}

async function highlightArch() {
  const sources = ['src-cbs', 'src-upi', 'src-yono', 'src-card'];
  sources.forEach(s => document.getElementById(s)?.classList.add('active'));
  await sleep(800);

  document.getElementById('kafka-box')?.classList.add('active');
  await sleep(800);

  document.getElementById('orch-box')?.classList.add('active');
  await sleep(800);

  const agents = ['agent-context', 'agent-fin', 'agent-strat', 'agent-guard', 'agent-out'];
  for (const ag of agents) {
    document.getElementById(ag)?.classList.add('active');
    await sleep(400);
    if (ag !== 'agent-out') {
      document.getElementById(ag)?.classList.remove('active');
      document.getElementById(ag)?.classList.add('done');
    }
  }

  await sleep(600);
  const outputs = ['out-wa', 'out-yono', 'out-sms', 'out-voice'];
  outputs.forEach(o => document.getElementById(o)?.classList.add('active'));
}

// ─── WHATSAPP SIMULATOR ────────────────────────────────
function loadWAScenario() {
  const cust = document.getElementById('waCustomer').value;
  const event = document.getElementById('waEvent').value;
  const lang = document.getElementById('waLang').value;

  // Update product recommendations
  const recs = PRODUCT_RECS[event] || PRODUCT_RECS.marriage;
  const recEl = document.getElementById('productRecs');
  recEl.innerHTML = recs.map(r => `
    <div class="prod-item">
      <div class="prod-icon">${r.icon}</div>
      <div>
        <div class="prod-name">${r.name}</div>
        <div class="prod-reason">${r.reason}</div>
      </div>
    </div>`).join('');

  // Clear chat
  document.getElementById('waBody').innerHTML = '';
  waConvIndex = 0;
}

async function playWAConversation() {
  if (waConvPlaying) return;
  waConvPlaying = true;

  const cust = document.getElementById('waCustomer').value;
  const event = document.getElementById('waEvent').value;
  const lang = document.getElementById('waLang').value;

  // Pick conversation
  const key = `${cust}_${event}_${lang}`;
  const altKey = `${cust}_${event}_en`;
  const conversation = WA_CONVERSATIONS[key] || WA_CONVERSATIONS[altKey] || WA_CONVERSATIONS['rajesh_marriage_hi'];

  const body = document.getElementById('waBody');
  body.innerHTML = '';

  for (const msg of conversation.messages) {
    await sleep(msg.delay - (conversation.messages[0]?.delay || 0));

    // Show typing indicator for saarthi
    if (msg.role === 'saarthi') {
      const typing = document.createElement('div');
      typing.className = 'wa-typing';
      typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      await sleep(800);
      body.removeChild(typing);
    }

    const div = document.createElement('div');
    div.className = `wa-msg ${msg.role}`;
    div.innerHTML = formatWAText(msg.text) + `<div class="wa-msg-time">${getTime()}</div>`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;

    if (msg.role === 'saarthi') {
      document.getElementById('waStatus').textContent = 'online';
    }
  }

  waConvPlaying = false;
}

function formatWAText(text) {
  return text
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function sendWAMessage() {
  const input = document.getElementById('waInput');
  const text = input.value.trim();
  if (!text) return;

  const body = document.getElementById('waBody');
  const div = document.createElement('div');
  div.className = 'wa-msg user';
  div.innerHTML = text + `<div class="wa-msg-time">${getTime()}</div>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  input.value = '';

  // Auto reply
  setTimeout(() => {
    const typing = document.createElement('div');
    typing.className = 'wa-typing';
    typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      body.removeChild(typing);
      const reply = document.createElement('div');
      reply.className = 'wa-msg saarthi';
      reply.innerHTML = formatWAText('Dhanyavaad! Aapka request process ho raha hai. Kuch hi minutes mein update milega. 🙏') + `<div class="wa-msg-time">${getTime()}</div>`;
      body.appendChild(reply);
      body.scrollTop = body.scrollHeight;
    }, 1500);
  }, 500);
}

// ─── CUSTOMER 360 ──────────────────────────────────────
function loadCustomer(key, el) {
  document.querySelectorAll('.cust-card').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  currentCustomer = key;

  const c = CUSTOMERS[key];
  if (!c) return;

  // Profile
  const profile = document.getElementById('custProfile');
  profile.innerHTML = `
    <div style="text-align:center;margin-bottom:14px">
      <div style="font-size:40px;margin-bottom:6px">${c.avatar}</div>
      <div style="font-size:16px;font-weight:700;color:var(--white)">${c.name}</div>
      <div style="font-size:12px;color:var(--muted)">${c.city}</div>
      <div style="margin-top:8px;display:inline-block;background:rgba(245,166,35,.15);color:var(--gold);border:1px solid rgba(245,166,35,.3);border-radius:999px;padding:3px 12px;font-size:11px;font-weight:700">
        ${c.lifeEvent} — ${c.lifeEventConf}% confidence
      </div>
    </div>
    <div>
      ${[
        ['Age', c.age],
        ['Occupation', c.occupation],
        ['Income', c.income],
        ['SBI Tenure', c.tenureSBI],
        ['Language', c.lang],
        ['Accounts', c.accounts],
        ['Savings', c.balances.savings],
        ['FD', c.balances.fd],
        ['CIBIL Score', c.cibilScore || 'N/A'],
      ].map(([k, v]) => `<div class="cust-detail-row"><span class="cust-detail-label">${k}</span><span class="cust-detail-val">${v}</span></div>`).join('')}
    </div>`;

  // Transaction Pattern
  const txPattern = document.getElementById('txPattern');
  txPattern.innerHTML = c.txPattern.map(t => `
    <div class="tx-bar-row">
      <span class="label">${t.label}</span>
      <div class="tx-bar-wrap"><div class="tx-bar-fill" style="width:${t.val}%;background:${t.color}"></div></div>
      <span class="val" style="color:${t.color}">${t.val}%</span>
    </div>`).join('');

  // Predictions
  const preds = document.getElementById('custPredictions');
  preds.innerHTML = c.predictions.map(p => `
    <div class="pred-item">
      <div class="pred-emoji">${p.emoji}</div>
      <div>
        <div class="pred-text">${p.text}</div>
        <div class="pred-conf">${p.conf} confidence</div>
      </div>
    </div>`).join('');

  // Transaction table
  document.getElementById('custName-tag').textContent = c.name;
  const txTable = document.getElementById('txTable');
  txTable.innerHTML = `<table>
    <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>AI Flag</th></tr></thead>
    <tbody>
      ${c.transactions.map(t => `<tr>
        <td>${t.date}</td>
        <td>${t.desc}</td>
        <td class="tx-${t.type}">${t.amount}</td>
        <td>${t.flag ? `<span class="tx-flag">${t.flag}</span>` : '<span style="color:var(--muted)">—</span>'}</td>
      </tr>`).join('')}
    </tbody>
  </table>`;
}

// ─── METRICS ───────────────────────────────────────────
function animateAfterStats() {
  const vals = document.querySelectorAll('.ba-val.green[data-target]');
  vals.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + (prefix ? '' : '%');
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ─── BHARAT MODE ───────────────────────────────────────
function sendSMS() {
  const input = document.getElementById('smsInput');
  const text = input.value.trim().toLowerCase();
  if (!text) return;

  const messages = document.getElementById('phoneMessages');
  const userMsg = document.createElement('div');
  userMsg.className = 'sms-msg user';
  userMsg.textContent = input.value;
  messages.appendChild(userMsg);
  input.value = '';

  setTimeout(() => {
    const response = SMS_RESPONSES[text] || SMS_RESPONSES['default'];
    const reply = document.createElement('div');
    reply.className = 'sms-msg saarthi';
    reply.textContent = Array.isArray(response) ? response[0] : response;
    messages.appendChild(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);

  messages.scrollTop = messages.scrollHeight;
}

const USSD_MENUS = {
  main: ['1. Account Balance', '2. Mini Statement', '3. My Savings Plan', '4. Insurance Options', '5. Talk to Saarthi'],
  '1': ['Balance: ₹1,24,500', 'Savings A/C XXXX4521', 'As of: 5 Jul 2026 21:19', '', '0. Back to main menu'],
  '2': ['Mini Statement:', '+54,000 SALARY 02-Jul', '-85,000 UPI 03-Jul', '-42,000 UPI 01-Jul', '0. Main Menu'],
  '3': ['My Savings Plan:', 'Goal: Home Loan', 'Monthly SIP: ₹5,000', 'Progress: 34%', '1. Increase SIP | 0. Back'],
  '4': ['Insurance Options:', '1. Health Insurance', '2. Life Insurance', '3. Motor Insurance', '0. Back to main'],
  '5': ['SBI Saarthi says:', 'Rajesh ji, aapki', 'shaadi ke liye badhai!', 'Health Insurance: ₹680/mo', '1. Apply | 0. Main Menu'],
};

function ussdSelect(num) {
  const screen = document.getElementById('ussdMenu');
  const menu = USSD_MENUS[num] || USSD_MENUS.main;
  screen.innerHTML = menu.map(m => `<div>${m}</div>`).join('');
}

function ussdReset() {
  document.getElementById('ussdMenu').innerHTML = USSD_MENUS.main.map(m => `<div>${m}</div>`).join('');
}

let currentIVRLang = 'hi';
function setIVRLang(lang, btn) {
  currentIVRLang = lang;
  document.querySelectorAll('.ivr-lang-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const data = IVR_LANGUAGES[lang];
  const transcript = document.getElementById('ivrTranscript');
  if (data && transcript) {
    transcript.innerHTML = data.greeting.map(t => `<div class="ivr-line saarthi">${t}</div>`).join('');
  }
}

function ivrSay(option) {
  const data = IVR_LANGUAGES[currentIVRLang];
  const transcript = document.getElementById('ivrTranscript');
  if (!data || !transcript) return;

  const optKey = 'option' + option;
  const response = data[optKey];
  if (response) {
    const userLine = document.createElement('div');
    userLine.className = 'ivr-line user';
    userLine.textContent = `[आपने चुना: ${option}]`;
    transcript.appendChild(userLine);

    setTimeout(() => {
      response.forEach(line => {
        const el = document.createElement('div');
        el.className = 'ivr-line saarthi';
        el.textContent = line;
        transcript.appendChild(el);
      });
      transcript.scrollTop = transcript.scrollHeight;
    }, 500);
  }
}

// ─── TOAST NOTIFICATIONS ────────────────────────────────
function showToast(icon, title, msg, type) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type || ''}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
    <div class="toast-close" onclick="this.parentElement.remove()">✕</div>`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 5000);
}

// ─── UTILS ─────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
