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

/* ── URL slug helpers ── */
function slugify(name){return name.replace(/^Dr\.?\s*/i,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function findTodayVisitBySlug(slug){return TODAY_VISITS.find(v=>slugify(v.doc)===slug);}
function findDoctorBySlug(slug){return DOCTORS.find(d=>slugify(d.n)===slug);}
function findTaskById(id){return TASKS.find(t=>String(t.id)===String(id));}
