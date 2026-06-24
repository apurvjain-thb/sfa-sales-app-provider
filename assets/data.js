/* ════════════════════════════════════════
   Shared data + helpers
   ════════════════════════════════════════ */
const TODAY=new Date(2026,5,16);
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* Doctor directory (Contacts) — intentional variance:
   - short names (Dr. Li, Dr. Bo) vs. very long ones (Dr. Lakshminarasimhan…)
   - single & multi-specialty entries
   - tiny clinic codes (CMC, BGS) vs. long official names
   - some doctors with zero prior visits (last:"Never") */
const DOCTORS=[
  /* Indian names only. Monthly visit cap is 3 — actual sales-rep visit cadence. */
  {n:"Dr. Padmavathi Krishnamurthy-Raghavendra",spec:"Nephrology, Transplant Medicine, Critical Care",clinic:"Fortis Hospital, Bannerghatta Road",tier:1,visits:3,last:"Today",created:1},
  {n:"Dr. Pal",spec:"Surgical Oncology",clinic:"HCG",tier:1,visits:0,last:"Never",created:3},
  {n:"Dr. Iyer",spec:"Pediatrics, Neonatology",clinic:"Cloudnine",tier:1,visits:1,last:"2 days ago",created:13},
  {n:"Dr. Lakshminarasimhan Venkataraman Subramanian",spec:"Endocrinology, Diabetology, Metabolic Disorders",clinic:"BGS Gleneagles Global Hospital, Kengeri Satellite Town",tier:3,visits:1,last:"1 month ago",created:14},
  {n:"Dr. Soni",spec:"Cardiology",clinic:"CMC",tier:1,visits:2,last:"Yesterday",created:2},
  {n:"Dr. Anjuli Sivaraman-Krishnaswamy",spec:"Psychiatry",clinic:"MindCare",tier:2,visits:0,last:"Never",created:25},
  {n:"Dr. Rajesh Kumar",spec:"Medical Oncology, Hematology-Oncology",clinic:"Sri Sathya Sai Institute of Higher Medical Sciences Research Foundation, Whitefield Campus",tier:1,visits:2,last:"3 days ago",created:5},
  {n:"Dr. K. Bhat",spec:"Radiation Oncology",clinic:"Indo-American Cancer Hospital and Research Institute, Banjara Hills Annexe",tier:1,visits:3,last:"4 hours ago",created:17},
  {n:"Dr. K. P.",spec:"Interventional Cardiology",clinic:"Sakra",tier:2,visits:0,last:"Never",created:8},
  {n:"Dr. Ramachandra Venkatasubramanian Iyer",spec:"Neurosurgery, Skull Base & Spine Surgery, Functional Neurosurgery",clinic:"NIMHANS Centre for Well-being, Hosur Road Annexe Block 3",tier:1,visits:1,last:"2 weeks ago",created:20},
  {n:"Dr. Aanya",spec:"Dermatology, Cosmetology",clinic:"Skin & Hair Clinic",tier:3,visits:0,last:"Never",created:15},
  {n:"Dr. Goswamy Venkatraghavan-Padmanabhan",spec:"Urology, Andrology, Robotic Reconstructive Urology, Kidney Transplant",clinic:"Manipal Hospital",tier:1,visits:2,last:"5 days ago",created:27},
  {n:"Dr. Rai",spec:"Hepato-Pancreato-Biliary Surgery",clinic:"AIG",tier:1,visits:1,last:"2 days ago",created:18},
  {n:"Dr. Suryanarayan Balasubramanian",spec:"Orthopaedics, Joint Replacement & Sports Medicine",clinic:"MS Ramaiah Memorial Hospital, MSRIT Post, Mathikere",tier:2,visits:2,last:"5 days ago",created:11},
  {n:"Dr. Mallika",spec:"Cardiothoracic & Vascular Surgery",clinic:"Jayadeva Institute of Cardiovascular Sciences and Research",tier:1,visits:3,last:"Yesterday",created:22},
  {n:"Dr. M. R. Chandrasekhara Pillai",spec:"Pulmonology, Sleep Medicine, Interventional Bronchoscopy",clinic:"Narayana Health City, Bommasandra Industrial Area",tier:2,visits:0,last:"Never",created:16},
  {n:"Dr. Joshi",spec:"General Medicine",clinic:"PHC",tier:3,visits:0,last:"Never",created:21},
  {n:"Dr. Yvette D'Souza-Fernandes",spec:"Obstetrics, Gynaecology, Reproductive Endocrinology & Infertility",clinic:"St. Philomena's Hospital",tier:2,visits:3,last:"Today",created:19},
  {n:"Dr. Aravind Iyengar-Chari",spec:"Otorhinolaryngology, Head & Neck Surgery, Cochlear Implantation",clinic:"ENT Solutions, 1st Cross, Indiranagar 100-Feet Road",tier:2,visits:1,last:"1 week ago",created:23},
  {n:"Dr. Singh",spec:"Family Medicine, Sports & Exercise Medicine, Lifestyle Counselling",clinic:"Apollo Spectra Hospital, Koramangala 6th Block, Bengaluru South",tier:3,visits:3,last:"Today",created:24},
  {n:"Dr. R. K.",spec:"Vitreo-Retinal Surgery",clinic:"Narayana Nethralaya, Rajajinagar Industrial Town West",tier:2,visits:2,last:"3 days ago",created:26},
  {n:"Dr. Banerjee",spec:"Tropical Medicine, Infectious Diseases",clinic:"Sparsh Super Speciality Hospital and Trauma Care Centre, Yeshwantpur Tumkur Road",tier:2,visits:1,last:"2 months ago",created:28},
  {n:"Dr. Rohan Bhat",spec:"Medical Oncology, Hemato-Oncology, Bone Marrow Transplant",clinic:"Manipal Hospital, Old Airport Road, HAL 2nd Stage",tier:1,visits:3,last:"Yesterday",created:4},
  {n:"Dr. Vikram Nair",spec:"Endocrinology, Diabetology",clinic:"Apollo Clinic, Koramangala 4th Block",tier:2,visits:1,last:"1 week ago",created:9},
  {n:"Dr. Manish Gupta",spec:"Gastroenterology, Hepatology",clinic:"Aster CMI",tier:3,visits:1,last:"3 weeks ago",created:12},
  {n:"Dr. Arjun Reddy",spec:"Pulmonology",clinic:"Narayana Multispecialty Hospital and Cardiac Care Institute, Electronic City Phase II",tier:2,visits:2,last:"4 days ago",created:6},
  {n:"Dr. Kavya Shetty",spec:"Rheumatology",clinic:"Columbia Asia Referral Hospital, Yeshwantpur",tier:2,visits:2,last:"6 days ago",created:7},
  {n:"Dr. Divya Krishnan",spec:"Neurology",clinic:"Apollo Clinic, Jayanagar",tier:2,visits:1,last:"8 days ago",created:10},
];

/* Tasks */
const TASKS=[
  {id:1229,title:"Share Phase-III oncology data",type:"Follow-up",status:"Open",prio:"High",doctor:"Dr. Rajesh Kumar",clinic:"Sakra World Hospital",due:"16 Jun, 10:45 AM",overdue:false,updated:6},
  {id:1230,title:"Schedule CME invitation",type:"CME opportunity",status:"Open",prio:"Med",doctor:"Dr. Ananya Iyer",clinic:"Manipal Hospital, HAL",due:"17 Jun, 02:00 PM",overdue:false,updated:5},
  {id:1231,title:"Drop sample — new formulation",type:"Sample request",status:"In Progress",prio:"High",doctor:"Dr. Priya Menon",clinic:"Fortis, Bannerghatta",due:"16 Jun, 11:00 AM",overdue:false,updated:1},
  {id:1232,title:"Collect prescription feedback",type:"Follow-up",status:"In Progress",prio:"Low",doctor:"Dr. Vikram Nair",clinic:"Apollo, Koramangala",due:"18 Jun, 09:30 AM",overdue:false,updated:3},
  {id:1233,title:"Referral discussion — HCG",type:"Referral",status:"Open",prio:"Med",doctor:"Dr. Sneha Rao",clinic:"HCG Cancer Centre",due:"15 Jun, 04:00 PM",overdue:true,updated:8},
  {id:1234,title:"Confirm next detailing slot",type:"Follow-up",status:"Completed",prio:"Low",doctor:"Dr. Rohan Bhat",clinic:"Manipal Hospital, HAL",due:"13 Jun, 10:00 AM",overdue:false,updated:9},
  {id:1235,title:"Reshare clinical evidence pack",type:"Follow-up",status:"Open",prio:"High",doctor:"Dr. Meera Pillai",clinic:"Narayana Health City",due:"16 Jun, 03:15 PM",overdue:false,updated:4},
  {id:1236,title:"Address dosage query",type:"Query",status:"Denied",prio:"Med",doctor:"Dr. Manish Gupta",clinic:"Aster CMI",due:"12 Jun, 01:00 PM",overdue:false,updated:10},
  {id:1237,title:"Plan joint patient webinar",type:"CME opportunity",status:"In Progress",prio:"Med",doctor:"Dr. Kavya Shetty",clinic:"Columbia Asia, Hebbal",due:"20 Jun, 11:30 AM",overdue:false,updated:2},
  {id:1238,title:"Verify formulary inclusion",type:"Query",status:"Completed",prio:"Low",doctor:"Dr. Sandeep Verma",clinic:"Sakra World Hospital",due:"11 Jun, 09:00 AM",overdue:false,updated:11},
];

/* Today's visits — random (non-clean) times, short durations for completed (doctors are busy),
   mx/my are mock map-grid positions used by the Map view.
   Status model:
     up      = upcoming, rep has not arrived
     active  = rep reached the location, has NOT checked in yet (wait timer counting)
     waiting = rep has checked in, still with the doctor
     done    = checked out
     miss    = missed */
const TODAY_VISITS=[
  {time:"09:08",ap:"AM",dur:"7 min",doc:"Dr. M. Krishnamurthy Iyengar",spec:"Nephrology",tier:1,clinic:"Sri Sathya Sai Institute of Higher Medical Sciences",vt:"In person",status:"done",mx:78,my:34},
  {time:"10:23",ap:"AM",dur:"5 min",doc:"Dr. Aarya",spec:"Cardiology",tier:2,clinic:"Aster CMI",vt:"In person",status:"done",mx:46,my:18},
  {time:"11:42",ap:"AM",doc:"Dr. Anjali Subramaniam",spec:"Pulmonology",tier:1,clinic:"Manipal Hospital, HAL 2nd Stage",vt:"Video call",status:"miss",mx:64,my:48},
  {time:"02:14",ap:"PM",doc:"Dr. Vikram Nair",spec:"Endocrinology",tier:2,clinic:"Apollo Clinic, Koramangala 4th Block",vt:"In person",status:"active",waitMins:7,reachedAt:"02:07 PM",mx:42,my:62},
  {time:"03:37",ap:"PM",doc:"Dr. Sneha Rao",spec:"Oncology",tier:1,clinic:"HCG Cancer Centre",vt:"In person",status:"up",mx:60,my:28},
  {time:"05:18",ap:"PM",doc:"Dr. Lakshminarayanan Subramanian",spec:"Gastroenterology",tier:2,clinic:"Narayana Multispecialty Hospital, Electronic City",vt:"Video call",status:"up",mx:52,my:86},
];

/* Backup visits — doctors on standby if the planned visit list shrinks (cancellations etc.).
   No scheduled time slot — only an availability window and a quick reason. */
const BACKUP_VISITS=[
  {doc:"Dr. Anand Pawar",spec:"Endocrinology",tier:2,clinic:"Apollo Clinic, HSR Layout 7th Sector",vt:"In person",window:"02:00 – 04:30 PM",reason:"Clinic confirmed walk-in slot available"},
  {doc:"Dr. Reema Sharma",spec:"Pulmonology",tier:1,clinic:"Fortis, Cunningham Road",vt:"In person",window:"04:00 – 06:00 PM",reason:"Open OPD window — accepts unscheduled reps"},
];

function visitsForOffset(off){
  if(off===0) return TODAY_VISITS;
  const pool=DOCTORS.slice((off*2)%8,(off*2)%8+4);
  /* Random-looking times keyed off the offset so they stay stable across re-renders */
  const seed=Math.abs(off)*7;
  const times=[
    [`${9+(seed%2)}:${String((seed*3+8)%60).padStart(2,'0')}`,"AM"],
    [`${10+(seed%2)}:${String((seed*7+12)%60).padStart(2,'0')}`,"AM"],
    [`02:${String((seed*5+19)%60).padStart(2,'0')}`,"PM"],
    [`04:${String((seed*11+8)%60).padStart(2,'0')}`,"PM"],
  ];
  return pool.map((d,i)=>({time:times[i][0],ap:times[i][1],dur:`${4+((seed+i)%6)} min`,doc:d.n,spec:d.spec,tier:d.tier,clinic:d.clinic,vt:i%3===0?"Video call":"In person",status:"done"}));
}

/* Doctor profiles (for visit detail + contact detail) */
const DOCTOR_PROFILES={
  "Dr. M. Krishnamurthy Iyengar":{
    phone:"+91 98450 12211",email:"krishnamurthy.i@sssihms.org",refNo:"RCH-0871",mob:"9845012211",
    regNo:"KMC 67856",dob:"15 Mar, 1968",exp:"22 years",area:"Whitefield",city:"Bengaluru",
    education:"MBBS, MD (Internal Medicine), DM Nephrology — AIIMS New Delhi (2002)",
    role:"Senior Consultant, HOD Nephrology",
    visitFreq:"2/3",visitFreqSub:"this month",
    nextVisit:"23 Jun '26",nextVisitSub:"10:00 AM",
    prevVisit:"13 Jun '26",prevVisitSub:"3 days ago",
    recent:[
      {date:"13 Jun",title:"In-person · Positive",sub:"Shared CREDENCE Phase-III data",dot:"pos"},
      {date:"5 Jun",title:"In-person · Neutral",sub:"Brief OPD visit, brochure left",dot:"neu"},
      {date:"28 May",title:"Video · Positive",sub:"Confirmed webinar interest",dot:"pos"},
    ],
    behavior:[
      {l:"Research Orientation",v:"Part of CREDENCE trial review board; follows outcomes data closely."},
      {l:"Scientific vs Price",v:"Science-first; price sensitivity low for Tier-1 patients."},
      {l:"Preferred Content",v:"Clinical trial outcomes, nephrology guidelines, case studies."},
      {l:"Preferred Visit Day",v:"Tuesday & Thursday · 10 AM – 1 PM"},
      {l:"Preferred Tele-call",v:"Monday · 5 PM – 7 PM"},
    ],
    topics:[
      "Follow up on CREDENCE Phase-III data you shared last visit — has she circulated it to the MDT yet?",
      "Introduce Roche nephrology pipeline — Phase-III results now available. Bring one-pager.",
      "Confirm KOL nephrology webinar interest — she was keen; share dates and speaker list.",
      "Check status of Roche product inclusion in Fortis formulary committee.",
    ],
  },
  "Dr. Aarya":{
    phone:"+91 99800 41122",email:"aarya@astercmi.in",refNo:"RCH-0912",mob:"9980041122",
    regNo:"KMC 81230",dob:"4 Sep, 1989",exp:"7 years",area:"Hebbal",city:"Bengaluru",
    education:"MBBS, MD Cardiology — St. John's Medical College (2019)",
    role:"Consultant Cardiologist",
    visitFreq:"3/4",visitFreqSub:"this month",
    nextVisit:"24 Jun '26",nextVisitSub:"11:00 AM",
    prevVisit:"10 Jun '26",prevVisitSub:"6 days ago",
    recent:[
      {date:"10 Jun",title:"In-person · Positive",sub:"Explored HFpEF pipeline interest",dot:"pos"},
      {date:"2 Jun",title:"Video · Neutral",sub:"Brief check-in, OPD running late",dot:"neu"},
    ],
    behavior:[
      {l:"Research Orientation",v:"Early adopter; excited by novel mechanisms and first-in-class agents."},
      {l:"Scientific vs Price",v:"Willing to trial new agents when safety profile is compelling."},
      {l:"Preferred Content",v:"MoA videos, innovation content, real-world evidence."},
      {l:"Preferred Visit Day",v:"Wednesday · 2 PM – 5 PM"},
      {l:"Preferred Tele-call",v:"Saturday · 10 AM – 12 PM"},
    ],
    topics:[
      "Share latest Phase-II HFpEF data deck — she flagged interest in last visit.",
      "Invite to the Roche Innovator Circle webinar on 25 Jun — perfect fit.",
      "Explore digital detailing preferences — she prefers video-first over PDFs.",
      "Discuss any adverse-reaction concerns from her recent patient cohort.",
    ],
  },
  "Dr. Anjali Subramaniam":{
    phone:"+91 96543 21009",email:"anjali.s@manipal.in",refNo:"RCH-0228",mob:"9654321009",
    regNo:"KMC 33410",dob:"3 Nov, 1981",exp:"15 years",area:"HAL 2nd Stage",city:"Bengaluru",
    education:"MBBS, MD Pulmonology — KMC Manipal (2010)",
    role:"HOD Pulmonology",
    visitFreq:"1/3",visitFreqSub:"this month",
    nextVisit:"22 Jun '26",nextVisitSub:"03:00 PM",
    prevVisit:"9 Jun '26",prevVisitSub:"7 days ago",
    recent:[
      {date:"9 Jun",title:"In-person · Positive",sub:"Reviewed COPD therapy data",dot:"pos"},
      {date:"1 Jun",title:"In-person · Negative",sub:"Adverse event flagged for one patient",dot:"neg"},
    ],
    behavior:[
      {l:"Research Orientation",v:"Methodical; needs strong evidence before altering protocol."},
      {l:"Scientific vs Price",v:"Balanced; patient affordability matters for her mixed cohort."},
      {l:"Preferred Content",v:"Head-to-head comparisons, safety data, cost-effectiveness."},
      {l:"Preferred Visit Day",v:"Wednesday · 11 AM – 1 PM"},
      {l:"Preferred Tele-call",v:"Friday · 4 PM – 6 PM"},
    ],
    topics:[
      "Today's visit was missed — open with acknowledgement and propose reschedule.",
      "Address the adverse-event concern with updated safety brief (v2.1).",
      "Share Lancet real-world evidence on the COPD inhaler comparator.",
      "Confirm her interest in the pulmonology-focused CME on 28 Jun.",
    ],
  },
  "Dr. Vikram Nair":{
    phone:"+91 95432 10098",email:"vikram.nair@apollo.in",refNo:"RCH-0389",mob:"9543210098",
    regNo:"KMC 51230",dob:"18 Aug, 1986",exp:"9 years",area:"Koramangala 4th Block",city:"Bengaluru",
    education:"MBBS, MD Endocrinology — CMC Vellore (2017)",
    role:"Endocrinologist",
    visitFreq:"1/3",visitFreqSub:"this month",
    nextVisit:"18 Jun '26",nextVisitSub:"09:30 AM",
    prevVisit:"8 Jun '26",prevVisitSub:"8 days ago",
    recent:[
      {date:"8 Jun",title:"In-person · Neutral",sub:"Dosage query raised again",dot:"neu"},
      {date:"1 Jun",title:"In-person · Neutral",sub:"Discussed patient outcomes",dot:"neu"},
      {date:"22 May",title:"Video · Negative",sub:"Skeptical about protocol switch",dot:"neg"},
    ],
    behavior:[
      {l:"Research Orientation",v:"Skeptical; needs peer-reviewed citations before altering protocol."},
      {l:"Scientific vs Price",v:"Price-sensitive; manages a mixed public-private base."},
      {l:"Preferred Content",v:"Head-to-head data, safety sheets, cost-effectiveness analyses."},
      {l:"Preferred Visit Day",v:"Tuesday & Thursday · 11 AM – 1 PM"},
      {l:"Preferred Tele-call",v:"Friday · 4 PM – 6 PM"},
    ],
    topics:[
      "He asked for prescription outcome feedback — bring documented summary.",
      "Address dosage-range query with the updated prescribing label insert (v2.1).",
      "Share Lancet Real-World Evidence paper — aligns with his preferred format.",
      "Explore a protocol trial for his highest-complexity diabetic patients.",
    ],
  },
  "Dr. Sneha Rao":{
    phone:"+91 94321 00987",email:"sneha.rao@hcg.in",refNo:"RCH-0519",mob:"9432100987",
    regNo:"KMC 62140",dob:"5 Apr, 1985",exp:"11 years",area:"Kalyan Nagar",city:"Bengaluru",
    education:"MBBS, MD Oncology — Kidwai Memorial (2015)",
    role:"Senior Oncologist",
    visitFreq:"2/3",visitFreqSub:"this month",
    nextVisit:"19 Jun '26",nextVisitSub:"03:30 PM",
    prevVisit:"14 Jun '26",prevVisitSub:"2 days ago",
    recent:[
      {date:"14 Jun",title:"In-person · Positive",sub:"MDT case review — 3 candidates identified",dot:"pos"},
      {date:"7 Jun",title:"In-person · Positive",sub:"Compassionate-use query resolved",dot:"pos"},
      {date:"30 May",title:"In-person · Positive",sub:"Agreed to co-host oncology CME",dot:"pos"},
    ],
    behavior:[
      {l:"Research Orientation",v:"Innovator; advocates early-access programmes and trial enrolments."},
      {l:"Scientific vs Price",v:"Innovation over cost; strong internal champion for Roche."},
      {l:"Preferred Content",v:"Pipeline previews, mechanism animations, advocacy stories."},
      {l:"Preferred Visit Day",v:"Monday & Wednesday · 3 PM – 6 PM"},
      {l:"Preferred Tele-call",v:"Sunday · 9 AM – 11 AM"},
    ],
    topics:[
      "Referral discussion: 3 MDT-flagged patients — collect case IDs today.",
      "Share updated compassionate-use access process document.",
      "Introduce new Roche oncology patient-support programme (launched 10 Jun).",
      "Discuss co-hosting CME at HCG — bring draft agenda.",
    ],
  },
  "Dr. Lakshminarayanan Subramanian":{
    phone:"+91 93210 09876",email:"lakshmin.s@narayanahealth.org",refNo:"RCH-0672",mob:"9321009876",
    regNo:"KMC 41870",dob:"29 Jan, 1972",exp:"19 years",area:"Electronic City",city:"Bengaluru",
    education:"MBBS, MD, DM Gastroenterology — JIPMER (2005)",
    role:"Senior Gastroenterologist",
    visitFreq:"1/2",visitFreqSub:"this month",
    nextVisit:"22 Jun '26",nextVisitSub:"05:00 PM",
    prevVisit:"6 Jun '26",prevVisitSub:"10 days ago",
    recent:[
      {date:"6 Jun",title:"Video · Positive",sub:"Reviewed IBD therapy pipeline",dot:"pos"},
      {date:"24 May",title:"In-person · Neutral",sub:"Quick discussion; OPD overrun",dot:"neu"},
    ],
    behavior:[
      {l:"Research Orientation",v:"Relationship-oriented; values rapport alongside clinical data."},
      {l:"Scientific vs Price",v:"Balanced; affordability significantly influences prescriptions."},
      {l:"Preferred Content",v:"Case-study format, peer testimonials, patient journey narratives."},
      {l:"Preferred Visit Day",v:"Wednesday & Friday · 4 PM – 7 PM"},
      {l:"Preferred Tele-call",v:"Thursday · 6 PM – 8 PM"},
    ],
    topics:[
      "Share IBD biologics evidence pack — he requested it on last call.",
      "Discuss joint patient webinar — confirm dates and topic.",
      "Personal touch: he attended DDW 2026 — ask for his takeaways.",
      "Introduce Roche gastro patient-support programme launched this month.",
    ],
  },
};

const PROFILE_FALLBACK={
  phone:"+91 9XXX XXXXX",email:"—",refNo:"—",mob:"—",regNo:"—",dob:"—",exp:"—",area:"—",city:"Bengaluru",
  education:"—",role:"Consultant",
  visitFreq:"—",visitFreqSub:"this month",nextVisit:"—",nextVisitSub:"",prevVisit:"—",prevVisitSub:"",
  recent:[],behavior:[],topics:[],
};

/* Status atoms shared across plan list + detail */
const STATUS_LABEL={up:"Upcoming",done:"Completed",miss:"Missed",waiting:"Waiting",active:"Active"};
const STATUS_CLASS={up:"up",done:"done",miss:"miss",waiting:"wait",active:"wait"};

/* Roche products a rep would detail during a visit */
const PRODUCTS=[
  "Avastin (bevacizumab)",
  "Herceptin (trastuzumab)",
  "MabThera / Rituxan (rituximab)",
  "Tecentriq (atezolizumab)",
  "Perjeta (pertuzumab)",
  "Kadcyla (trastuzumab emtansine)",
  "RoActemra (tocilizumab)",
  "Ocrevus (ocrelizumab)",
  "Tarceva (erlotinib)",
  "Xeloda (capecitabine)",
  "Esbriet (pirfenidone)",
  "Hemlibra (emicizumab)",
];

/* Inline SVG strings used in multiple places */
const SVG={
  video:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M22 8l-5 4 5 4z"/></svg>',
  person:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
  bulb:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7 7 7 0 0 1-4 6.32V17H9v-1.68A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/></svg>',
};

/* ── Format helpers ── */
function fmtDate(d){return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;}
function fmtDateShort(d){return `${d.getDate()} ${MONTHS[d.getMonth()]}`;}
function fmtDateISO(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function rangeLabel(f,t){return f.toDateString()===t.toDateString()?fmtDate(f):`${fmtDateShort(f)} – ${fmtDate(t)}`;}
function initials(name){const parts=name.replace(/^Dr\.?\s*/,'').trim().split(/\s+/);return ((parts[0]||'')[0]||'').toUpperCase()+((parts[parts.length-1]||'')[0]||'').toUpperCase();}
function profileOf(name){return DOCTOR_PROFILES[name]||PROFILE_FALLBACK;}

/* ════════════════════════════════════════
   ACCOUNTS — provider/hospital sales model
   The primary entity. Contacts, visits, tasks,
   leads & deals all hang off an Account.

   type drives app behaviour:
     referral  → doctor/clinic patient referrals
     venue     → health camps (societies, malls, schools)
     corporate → employee health tie-ups (MOUs)
   ════════════════════════════════════════ */
const ACCOUNT_TYPE_META={
  referral:{label:"Referral Source",sub:"Patient referrals",chip:"Referral",
    icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></svg>'},
  venue:{label:"Venue",sub:"Health camps & activities",chip:"Venue",
    icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>'},
  corporate:{label:"Corporate",sub:"Employee tie-ups",chip:"Corporate",
    icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h6"/></svg>'},
};

/* Account status atoms */
const ACC_STATUS_CLASS={Prospect:"up",Active:"done",["On-hold"]:"wait"};

const ACCOUNTS=[
  /* ── Referral sources (clinics, nursing homes, doctor practices) ── */
  {id:"AC-1001",name:"Dr. Jain's Nursing Home",type:"referral",sub:"Nursing Home",status:"Prospect",
    addr:"A-1, Ring Road, Sector 43, Gurugram",lastVisit:"3 days ago",created:1,
    contacts:[{n:"Dr. Apurv Jain",role:"Chief Medical Officer",spec:"Cardiologist",phone:"+91 97155 53344",email:"apurv.jain@thb.co.in"}],
    tier:1,specialties:"Cardiology, Internal Medicine",referralsMTD:4,referralTarget:6,competing:"Medanta, Fortis"},
  {id:"AC-1002",name:"Aradhya Clinics",type:"referral",sub:"Polyclinic",status:"Active",
    addr:"2nd Cross, Indiranagar 100-Feet Road, Bengaluru",lastVisit:"Yesterday",created:5,
    contacts:[{n:"Dr. Ananya Devika Sharma",role:"Consultant",spec:"General Physician",phone:"+91 97155 53311",email:"ananya.sharma@aradhya.in"}],
    tier:1,specialties:"General Medicine, Pediatrics",referralsMTD:9,referralTarget:8,competing:"Apollo"},
  {id:"AC-1003",name:"Sunrise Multispecialty Clinic",type:"referral",sub:"Clinic",status:"Active",
    addr:"HSR Layout 7th Sector, Bengaluru",lastVisit:"1 week ago",created:8,
    contacts:[{n:"Dr. Rohit Deshmukh",role:"Owner & Physician",spec:"General Physician",phone:"+91 97155 53345",email:"rohit.d@sunrise.in"}],
    tier:2,specialties:"General Medicine, Orthopaedics",referralsMTD:2,referralTarget:5,competing:"—"},
  {id:"AC-1004",name:"Lotus Children's Clinic",type:"referral",sub:"Pediatric Clinic",status:"Prospect",
    addr:"Jayanagar 4th Block, Bengaluru",lastVisit:"No visits yet",created:12,
    contacts:[{n:"Dr. Shubham Sharma",role:"Pediatrician",spec:"Pediatrics",phone:"+91 97155 53112",email:"shubham.s@lotus.in"}],
    tier:2,specialties:"Pediatrics, Neonatology",referralsMTD:0,referralTarget:4,competing:"Cloudnine"},

  /* ── Venues (housing societies, malls, schools) for camps ── */
  {id:"AC-2001",name:"Prestige Lakeside Habitat",type:"venue",sub:"Housing Society",status:"Active",
    addr:"Varthur Road, Whitefield, Bengaluru",lastVisit:"2 weeks ago",created:3,
    contacts:[{n:"Mr. Ramesh Gowda",role:"RWA Secretary",phone:"+91 98860 11223",email:"secretary@prestigelakeside.org"}],
    households:3200,footfall:"250–400",pastCamps:2,preferredTiming:"Weekend mornings"},
  {id:"AC-2002",name:"Phoenix Marketcity",type:"venue",sub:"Mall",status:"Prospect",
    addr:"Whitefield Main Road, Mahadevapura, Bengaluru",lastVisit:"No visits yet",created:14,
    contacts:[{n:"Ms. Priya Nair",role:"Mall Operations Manager",phone:"+91 98860 22334",email:"priya.nair@phoenixmarketcity.in"}],
    households:0,footfall:"2,000+/day",pastCamps:0,preferredTiming:"Weekend, 11 AM–7 PM"},
  {id:"AC-2003",name:"Delhi Public School, Whitefield",type:"venue",sub:"School",status:"Active",
    addr:"Sarjapur Road, Bengaluru",lastVisit:"1 month ago",created:9,
    contacts:[{n:"Mrs. Anita Rao",role:"Administrator",phone:"+91 98860 33445",email:"admin@dpswhitefield.edu.in"}],
    households:0,footfall:"1,800 students",pastCamps:1,preferredTiming:"Weekday, post-assembly"},
  {id:"AC-2004",name:"Brigade Gateway RWA",type:"venue",sub:"Housing Society",status:"On-hold",
    addr:"Rajajinagar, Bengaluru",lastVisit:"6 weeks ago",created:18,
    contacts:[{n:"Mr. Suresh Menon",role:"RWA President",phone:"+91 98860 44556",email:"president@brigadegateway.org"}],
    households:1250,footfall:"120–200",pastCamps:3,preferredTiming:"Sunday mornings"},

  /* ── Corporates (employee health tie-ups) ── */
  {id:"AC-3001",name:"Infosys Ltd",type:"corporate",sub:"IT / ITES",status:"Active",
    addr:"Electronics City Phase 1, Bengaluru",lastVisit:"4 days ago",created:6,
    contacts:[{n:"Ms. Kavita Reddy",role:"Head – Employee Wellness",phone:"+91 99000 11223",email:"kavita.reddy@infosys.com"}],
    employees:42000,insurer:"Star Health",renewal:"31 Mar '27",packageTier:"Premium (OPD + IPD)"},
  {id:"AC-3002",name:"Wipro Technologies",type:"corporate",sub:"IT / ITES",status:"Prospect",
    addr:"Sarjapur Road, Bengaluru",lastVisit:"1 week ago",created:11,
    contacts:[{n:"Mr. Arjun Pillai",role:"HR – Benefits",phone:"+91 99000 22334",email:"arjun.pillai@wipro.com"}],
    employees:38000,insurer:"ICICI Lombard",renewal:"30 Jun '26",packageTier:"Under discussion"},
  {id:"AC-3003",name:"Aravali Power Company Pvt Ltd",type:"corporate",sub:"PSU",status:"Active",
    addr:"A-1, Senapati Road, Sector 12, Gurugram",lastVisit:"1 week ago",created:4,
    contacts:[{n:"Mr. Rohit Deshmukh",role:"General Manager",phone:"+91 97155 53345",email:"rohit.d@aravalipower.in"}],
    employees:6500,insurer:"New India Assurance",renewal:"31 Dec '26",packageTier:"Standard (IPD)"},
  {id:"AC-3004",name:"Toyota Kirloskar Motor",type:"corporate",sub:"Manufacturing",status:"On-hold",
    addr:"Bidadi Industrial Area, Ramanagara",lastVisit:"3 weeks ago",created:16,
    contacts:[{n:"Mr. Karthik Subramaniam",role:"Admin – Medical Services",phone:"+91 99000 44556",email:"karthik.s@toyota-kirloskar.in"}],
    employees:6000,insurer:"Bajaj Allianz",renewal:"31 Mar '27",packageTier:"Premium (OPD + IPD)"},
];

/* ── URL slug helpers ── */
function slugify(name){return name.replace(/^Dr\.?\s*/i,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function findTodayVisitBySlug(slug){return TODAY_VISITS.find(v=>slugify(v.doc)===slug);}
function findDoctorBySlug(slug){return DOCTORS.find(d=>slugify(d.n)===slug);}
function findTaskById(id){return TASKS.find(t=>String(t.id)===String(id));}
function findAccountBySlug(slug){return ACCOUNTS.find(a=>slugify(a.name)===slug);}
function accInitials(name){const p=name.replace(/^(Dr|Mr|Mrs|Ms)\.?\s*/i,'').trim().split(/\s+/);return ((p[0]||'')[0]||'').toUpperCase()+((p[1]||'')[0]||'').toUpperCase();}

/* ════════════════════════════════════════
   CONTACTS — multi-role people, each linked
   to an Account. Derived from ACCOUNTS so the
   two stay in sync. Clinical fields only for
   doctors (referral sources). No call logs.
   ════════════════════════════════════════ */
const CONTACTS=ACCOUNTS.flatMap(a=>(a.contacts||[]).map((c,i)=>({
  id:`${a.id}-C${i+1}`,
  n:c.n,role:c.role,spec:c.spec||'',phone:c.phone,email:c.email||'',
  type:a.type,accountName:a.name,accountSlug:slugify(a.name),accountSub:a.sub,
  isDoctor:/^Dr\.?\s/i.test(c.n),
})));
function findContactBySlug(slug){return CONTACTS.find(c=>slugify(c.n)===slug);}

/* ════════════════════════════════════════
   BEAT PLAN — account-based visits across the
   3 types, with maker-checker approval state.
   Visit history is the same model (done visits
   on past days) — Beat Plan + Visits merged.
   ════════════════════════════════════════ */

/* Per-type visit purpose options + outcome wording */
const VISIT_PURPOSE={
  referral:["Referral discussion","Relationship visit","Referral review","New tie-up"],
  venue:["Camp recce","Camp planning","Camp execution","Post-camp review"],
  corporate:["Intro meeting","MOU follow-up","Package proposal","Renewal discussion"],
};

/* Today's beat plan — mixed account types.
   status: up | active | waiting | done | miss */
const PLAN_VISITS=[
  {id:"V-1",time:"09:08",ap:"AM",dur:"12 min",accountSlug:"aradhya-clinics",accountName:"Aradhya Clinics",accountSub:"Polyclinic",type:"referral",tier:1,purpose:"Referral review",contact:"Dr. Ananya Devika Sharma",vt:"In person",status:"done",outcome:"Positive",mx:46,my:18},
  {id:"V-2",time:"10:23",ap:"AM",dur:"22 min",accountSlug:"infosys-ltd",accountName:"Infosys Ltd",accountSub:"IT / ITES",type:"corporate",purpose:"MOU follow-up",contact:"Ms. Kavita Reddy",vt:"In person",status:"done",outcome:"Positive",mx:78,my:34},
  {id:"V-3",time:"11:42",ap:"AM",accountSlug:"prestige-lakeside-habitat",accountName:"Prestige Lakeside Habitat",accountSub:"Housing Society",type:"venue",purpose:"Camp recce",contact:"Mr. Ramesh Gowda",vt:"In person",status:"miss",mx:64,my:48},
  {id:"V-4",time:"02:14",ap:"PM",accountSlug:"jain-s-nursing-home",accountName:"Dr. Jain's Nursing Home",accountSub:"Nursing Home",type:"referral",tier:1,purpose:"Referral discussion",contact:"Dr. Apurv Jain",vt:"In person",status:"active",waitMins:7,reachedAt:"02:07 PM",mx:42,my:62},
  {id:"V-5",time:"03:37",ap:"PM",accountSlug:"delhi-public-school-whitefield",accountName:"Delhi Public School, Whitefield",accountSub:"School",type:"venue",purpose:"Camp planning",contact:"Mrs. Anita Rao",vt:"In person",status:"up",mx:60,my:28},
  {id:"V-6",time:"05:18",ap:"PM",accountSlug:"wipro-technologies",accountName:"Wipro Technologies",accountSub:"IT / ITES",type:"corporate",purpose:"Package proposal",contact:"Mr. Arjun Pillai",vt:"Video call",status:"up",mx:52,my:86},
];

/* Visit history — completed visits on earlier days (merged Visits Tracking) */
const VISIT_HISTORY=[
  {id:"H-1",date:"13 Jun '26",time:"10:48 AM",accountSlug:"aradhya-clinics",accountName:"Aradhya Clinics",type:"referral",purpose:"Referral discussion",contact:"Dr. Ananya Devika Sharma",outcome:"Positive",detail:"Agreed to refer cardiac cases; shared coordinator line."},
  {id:"H-2",date:"12 Jun '26",time:"03:30 PM",accountSlug:"aravali-power-company-pvt-ltd",accountName:"Aravali Power Company Pvt Ltd",type:"corporate",purpose:"MOU follow-up",contact:"Mr. Rohit Deshmukh",outcome:"Neutral",detail:"Reviewed IPD package; awaiting board sign-off."},
  {id:"H-3",date:"11 Jun '26",time:"09:15 AM",accountSlug:"brigade-gateway-rwa",accountName:"Brigade Gateway RWA",type:"venue",purpose:"Camp execution",contact:"Mr. Suresh Menon",outcome:"Positive",detail:"Camp done · 180 footfall · 22 leads captured."},
  {id:"H-4",date:"10 Jun '26",time:"05:02 PM",accountSlug:"sunrise-multispecialty-clinic",accountName:"Sunrise Multispecialty Clinic",type:"referral",purpose:"Relationship visit",contact:"Dr. Rohit Deshmukh",outcome:"Neutral",detail:"Brief OPD visit; left referral pads."},
  {id:"H-5",date:"9 Jun '26",time:"11:20 AM",accountSlug:"infosys-ltd",accountName:"Infosys Ltd",type:"corporate",purpose:"Package proposal",contact:"Ms. Kavita Reddy",outcome:"Positive",detail:"Premium OPD+IPD tier accepted in principle."},
];

/* Maker-checker — current beat plan approval state.
   status: approved | pending | rejected | draft
   source: auto | manual */
const BEAT_PLAN_STATE={
  today:{date:"Tue, 16 Jun 2026",source:"auto",status:"approved",submittedBy:"Raj Hussain",reviewedBy:"Priya Sundaram (Manager)",reviewedAt:"15 Jun, 6:40 PM"},
  /* a pending edit for tomorrow, surfaced as the maker-checker example */
  pending:{date:"Wed, 17 Jun 2026",source:"manual",status:"pending",submittedBy:"Raj Hussain",submittedAt:"16 Jun, 1:10 PM",note:"Added 2 corporate visits, dropped 1 low-priority referral",visitCount:7},
};

const PLAN_STATUS_META={
  approved:{label:"Approved",cls:"done"},
  pending:{label:"Pending approval",cls:"wait"},
  rejected:{label:"Rejected",cls:"miss"},
  draft:{label:"Draft",cls:"up"},
};

function findPlanVisit(id){return PLAN_VISITS.find(v=>v.id===id);}

/* Provider message templates — channel + account-type aware.
   {name} → contact short name. */
const PROVIDER_MSG_TEMPLATES={
  referral:{
    SMS:[
      {t:"Pre-visit greeting",b:"Hello Dr. {name}, looking forward to meeting you today to discuss patient referrals to Sakra. — Raj, Sakra World Hospital"},
      {t:"Post-visit thanks",b:"Dr. {name}, thank you for your time. Sharing the referral process details shortly. — Raj, Sakra"},
    ],
    WhatsApp:[
      {t:"Referral process share",b:"Hi Dr. {name} 👋 Sharing our streamlined patient-referral process and the dedicated coordinator contact for fast-track admissions at Sakra. Happy to walk through it anytime."},
      {t:"Follow-up nudge",b:"Dr. {name}, hope the referral pad and coordinator details were useful. Do let me know if any of your patients need priority slots this week."},
    ],
    Email:[
      {t:"Referral tie-up proposal",b:"Dear Dr. {name},\n\nThank you for meeting. As discussed, please find attached our referral partnership note covering specialties, priority-admission SLAs and the dedicated coordinator line.\n\nWarm regards,\nRaj Hussain\nSakra World Hospital",attachments:[{name:"sakra-referral-partnership.pdf",size:1.4*1024*1024}]},
    ],
  },
  venue:{
    SMS:[
      {t:"Camp proposal",b:"Hello {name}, proposing a free health camp at your premises with Sakra specialists. Shall I share dates & services? — Raj, Sakra"},
      {t:"Camp confirmation",b:"{name}, confirming our health camp on the agreed date. Our team will reach 1 hour prior for setup. — Raj, Sakra"},
    ],
    WhatsApp:[
      {t:"Camp services menu",b:"Hi {name} 👋 For the health camp we can offer: BP & sugar screening, BMI, ECG, and a specialist OPD desk. Sharing the logistics checklist and a sample flyer."},
      {t:"Logistics confirmation",b:"{name}, for the camp we'll need a 10x10 covered space, 2 tables, 6 chairs and a power point. Our team handles the rest. Confirming footfall estimate so we staff accordingly."},
    ],
    Email:[
      {t:"Camp proposal pack",b:"Dear {name},\n\nThank you for the discussion. Attached is our health-camp proposal — services menu, staffing, logistics needs and a sample resident flyer.\n\nBest,\nRaj Hussain\nSakra World Hospital",attachments:[{name:"sakra-health-camp-proposal.pdf",size:2.0*1024*1024},{name:"resident-flyer-sample.png",size:640*1024}]},
    ],
  },
  corporate:{
    SMS:[
      {t:"Intro message",b:"Hello {name}, Raj from Sakra World Hospital. Keen to discuss an employee health tie-up for your team. When works for a quick call? "},
      {t:"Proposal follow-up",b:"{name}, following up on the corporate health package proposal shared. Happy to revise tiers based on your headcount. — Raj, Sakra"},
    ],
    WhatsApp:[
      {t:"Package overview",b:"Hi {name} 👋 Sharing our corporate health package — OPD + IPD options, annual health checks, and on-site camp days for employees. Can tailor to your headcount."},
      {t:"Renewal reminder",b:"{name}, a friendly reminder that your employee health tie-up is up for renewal soon. Happy to share the renewal terms with any enhancements for this year."},
    ],
    Email:[
      {t:"MOU proposal",b:"Dear {name},\n\nThank you for your time. Attached is our corporate health tie-up proposal and a draft MOU covering OPD/IPD coverage, health checks and on-site camps.\n\nLooking forward to your thoughts.\n\nBest,\nRaj Hussain\nSakra World Hospital",attachments:[{name:"sakra-corporate-MOU-draft.pdf",size:1.8*1024*1024},{name:"package-tiers.xlsx",size:88*1024}]},
    ],
  },
};
