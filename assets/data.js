/* ════════════════════════════════════════
   Shared data + helpers
   ════════════════════════════════════════ */
const TODAY=new Date(2026,5,16);
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* Tasks — account-linked, provider task types.
   (doctor = contact, clinic = account name — kept for page back-compat) */
const TASK_TYPES=["Referral follow-up","Activity execution","MOU follow-up","Lead nurturing","Query"];
const TASKS=[
  {id:1229,title:"Share referral process with Dr. Apurv Jain",type:"Referral follow-up",status:"Open",prio:"High",doctor:"Dr. Apurv Jain",clinic:"Dr. Jain's Nursing Home",accountSlug:"jain-s-nursing-home",due:"16 Jun, 10:45 AM",overdue:false,updated:6},
  {id:1230,title:"Confirm logistics for Prestige health camp",type:"Activity execution",status:"In Progress",prio:"High",doctor:"Mr. Ramesh Gowda",clinic:"Prestige Lakeside Habitat",accountSlug:"prestige-lakeside-habitat",due:"20 Jun, 09:00 AM",overdue:false,updated:1},
  {id:1231,title:"Progress Wipro MOU to negotiation",type:"MOU follow-up",status:"Open",prio:"High",doctor:"Mr. Arjun Pillai",clinic:"Wipro Technologies",accountSlug:"wipro-technologies",due:"19 Jun, 02:00 PM",overdue:false,updated:5},
  {id:1232,title:"Nurture Lotus Clinic referral interest",type:"Lead nurturing",status:"In Progress",prio:"Low",doctor:"Dr. Shubham Sharma",clinic:"Lotus Children's Clinic",accountSlug:"lotus-children-s-clinic",due:"18 Jun, 09:30 AM",overdue:false,updated:3},
  {id:1233,title:"Follow up on Aradhya referral commitment",type:"Referral follow-up",status:"Open",prio:"Med",doctor:"Dr. Ananya Devika Sharma",clinic:"Aradhya Clinics",accountSlug:"aradhya-clinics",due:"15 Jun, 04:00 PM",overdue:true,updated:8},
  {id:1234,title:"Submit Brigade Gateway camp report",type:"Activity execution",status:"Completed",prio:"Low",doctor:"Mr. Suresh Menon",clinic:"Brigade Gateway RWA",accountSlug:"brigade-gateway-rwa",due:"13 Jun, 10:00 AM",overdue:false,updated:9},
  {id:1235,title:"Reshare corporate package to Toyota",type:"MOU follow-up",status:"Open",prio:"High",doctor:"Mr. Karthik Subramaniam",clinic:"Toyota Kirloskar Motor",accountSlug:"toyota-kirloskar-motor",due:"16 Jun, 03:15 PM",overdue:false,updated:4},
  {id:1236,title:"Resolve DPS screening date query",type:"Query",status:"Denied",prio:"Med",doctor:"Mrs. Anita Rao",clinic:"Delhi Public School, Whitefield",accountSlug:"delhi-public-school-whitefield",due:"12 Jun, 01:00 PM",overdue:false,updated:10},
  {id:1237,title:"Plan Infosys on-site camp day",type:"Activity execution",status:"In Progress",prio:"Med",doctor:"Ms. Kavita Reddy",clinic:"Infosys Ltd",accountSlug:"infosys-ltd",due:"20 Jun, 11:30 AM",overdue:false,updated:2},
  {id:1238,title:"Confirm Aravali IPD package inclusions",type:"MOU follow-up",status:"Completed",prio:"Low",doctor:"Mr. Rohit Deshmukh",clinic:"Aravali Power Company Pvt Ltd",accountSlug:"aravali-power-company-pvt-ltd",due:"11 Jun, 09:00 AM",overdue:false,updated:11},
];

/* Status atoms shared across plan list + detail */
const STATUS_LABEL={up:"Upcoming",done:"Completed",miss:"Missed",waiting:"Waiting",active:"Active"};
const STATUS_CLASS={up:"up",done:"done",miss:"miss",waiting:"wait",active:"wait"};

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

/* ════════════════════════════════════════
   LEADS — provider pipeline (ported from B2B).
   4 stages; typed by account type so the whole
   app stays consistent.
   ════════════════════════════════════════ */
const LEAD_STAGES=["New","Contacted","Qualified","Converted"];
const LEAD_STAGE_CLASS={New:"up",Contacted:"wait",Qualified:"wait",Converted:"done"};
const LEADS=[
  {id:1229,title:"Aradhya Clinics — referral tie-up",type:"referral",accountSlug:"aradhya-clinics",contact:"Dr. Ananya Devika Sharma",phone:"+91 97155 53311",source:"Manually Created",prio:"High",stage:"Qualified",due:"18 Jun, 10:45 AM",created:1},
  {id:1230,title:"Prestige Lakeside — health camp",type:"venue",accountSlug:"prestige-lakeside-habitat",contact:"Mr. Ramesh Gowda",phone:"+91 98860 11223",source:"Website",prio:"Med",stage:"Contacted",due:"20 Jun, 11:00 AM",created:2},
  {id:1231,title:"Wipro — corporate health tie-up",type:"corporate",accountSlug:"wipro-technologies",contact:"Mr. Arjun Pillai",phone:"+91 99000 22334",source:"Referral",prio:"High",stage:"New",due:"19 Jun, 02:00 PM",created:3},
  {id:1232,title:"Phoenix Marketcity — weekend camp",type:"venue",accountSlug:"phoenix-marketcity",contact:"Ms. Priya Nair",phone:"+91 98860 22334",source:"Manually Created",prio:"Med",stage:"New",due:"24 Jun, 09:30 AM",created:4},
  {id:1233,title:"Lotus Children's Clinic — referral",type:"referral",accountSlug:"lotus-children-s-clinic",contact:"Dr. Shubham Sharma",phone:"+91 97155 53112",source:"Activity",prio:"Low",stage:"Contacted",due:"16 Jun, 04:00 PM",created:5},
  {id:1234,title:"Infosys — annual renewal",type:"corporate",accountSlug:"infosys-ltd",contact:"Ms. Kavita Reddy",phone:"+91 99000 11223",source:"HIS",prio:"High",stage:"Converted",due:"13 Jun, 10:00 AM",created:6},
  {id:1235,title:"DPS Whitefield — student screening",type:"venue",accountSlug:"delhi-public-school-whitefield",contact:"Mrs. Anita Rao",phone:"+91 98860 33445",source:"Manually Created",prio:"Med",stage:"Qualified",due:"21 Jun, 03:15 PM",created:7},
  {id:1236,title:"Sunrise Clinic — referral revival",type:"referral",accountSlug:"sunrise-multispecialty-clinic",contact:"Dr. Rohit Deshmukh",phone:"+91 97155 53345",source:"Manually Created",prio:"Low",stage:"New",due:"25 Jun, 01:00 PM",created:8},
];
function findLeadById(id){return LEADS.find(l=>String(l.id)===String(id));}

/* ════════════════════════════════════════
   DEALS — pipeline with value + stage.
   Stage sets differ by type; status = Open/Won/Lost.
   ════════════════════════════════════════ */
const DEAL_STAGES_BY_TYPE={
  corporate:["Intro","Proposal","Negotiation","Legal review","Signed"],
  referral:["Discussion","Agreement","First referral","Active"],
  venue:["Discussion","Date agreed","Confirmed","Executed"],
};
const DEAL_STATUS_CLASS={Open:"up",Won:"done",Lost:"miss"};
const DEALS=[
  {id:"D-1",name:"Infosys — employee health MOU",type:"corporate",accountSlug:"infosys-ltd",accountName:"Infosys Ltd",dealType:"New Contract",value:1800000,stage:"Signed",status:"Won",prob:1.0,close:"28 May '26",created:1},
  {id:"D-2",name:"Aradhya Clinics — referral program",type:"referral",accountSlug:"aradhya-clinics",accountName:"Aradhya Clinics",dealType:"Partnership",value:700000,stage:"Active",status:"Won",prob:1.0,close:"02 Jun '26",created:2},
  {id:"D-3",name:"Wipro — corporate tie-up",type:"corporate",accountSlug:"wipro-technologies",accountName:"Wipro Technologies",dealType:"New Contract",value:2200000,stage:"Negotiation",status:"Open",prob:0.6,close:"30 Jun '26",created:3},
  {id:"D-4",name:"Aravali Power — IPD package",type:"corporate",accountSlug:"aravali-power-company-pvt-ltd",accountName:"Aravali Power Company Pvt Ltd",dealType:"Renewal",value:900000,stage:"Legal review",status:"Open",prob:0.7,close:"10 Jul '26",created:4},
  {id:"D-5",name:"Prestige Lakeside — camp series",type:"venue",accountSlug:"prestige-lakeside-habitat",accountName:"Prestige Lakeside Habitat",dealType:"Activity",value:250000,stage:"Date agreed",status:"Open",prob:0.5,close:"05 Jul '26",created:5},
  {id:"D-6",name:"Toyota Kirloskar — health package",type:"corporate",accountSlug:"toyota-kirloskar-motor",accountName:"Toyota Kirloskar Motor",dealType:"New Contract",value:1500000,stage:"Proposal",status:"Open",prob:0.4,close:"20 Jul '26",created:6},
  {id:"D-7",name:"Sunrise Clinic — referral revival",type:"referral",accountSlug:"sunrise-multispecialty-clinic",accountName:"Sunrise Multispecialty Clinic",dealType:"Partnership",value:300000,stage:"Discussion",status:"Lost",prob:0,close:"08 Jun '26",created:7},
];
function findDealById(id){return DEALS.find(d=>d.id===id);}

/* ════════════════════════════════════════
   ACTIVITY — health camps & events at venues.
   Has its own maker-checker approval (like beat
   visits): approval = approved|pending|rejected.
   exec = planned|completed (with a post report).
   ════════════════════════════════════════ */
const ACTIVITY_APPROVAL_CLASS={approved:"done",pending:"wait",rejected:"miss"};
const ACTIVITIES=[
  {id:"AT-1",name:"Free Health Camp",venueSlug:"prestige-lakeside-habitat",venueName:"Prestige Lakeside Habitat",date:"21 Jun '26",time:"08:00 AM – 1:00 PM",
    services:["BP","Sugar","BMI","ECG"],staff:["Dr. A. Rao (Physician)","2 Nurses","1 Coordinator"],logistics:["Space","Tables","Power","Permissions"],
    approval:"approved",exec:"planned",submittedBy:"Raj Hussain",reviewedBy:"Priya Sundaram (Manager)",
    expFootfall:"250–400",created:1},
  {id:"AT-2",name:"Student Health Screening",venueSlug:"delhi-public-school-whitefield",venueName:"Delhi Public School, Whitefield",date:"24 Jun '26",time:"09:30 AM – 12:30 PM",
    services:["BMI","Vision","Dental"],staff:["Dr. K. Menon (Pediatrician)","3 Nurses"],logistics:["Hall","Tables"],
    approval:"pending",exec:"planned",submittedBy:"Raj Hussain",note:"New venue · added specialist desk",
    expFootfall:"1,800 students",created:2},
  {id:"AT-3",name:"Weekend Wellness Camp",venueSlug:"phoenix-marketcity",venueName:"Phoenix Marketcity",date:"28 Jun '26",time:"11:00 AM – 7:00 PM",
    services:["BP","Sugar","BMI","Specialist OPD"],staff:["2 Physicians","2 Nurses","2 Coordinators"],logistics:["Atrium space","Branding","Power"],
    approval:"pending",exec:"planned",submittedBy:"Raj Hussain",note:"High-footfall mall · weekend slot",
    expFootfall:"2,000+/day",created:3},
  {id:"AT-4",name:"Free Health Camp",venueSlug:"brigade-gateway-rwa",venueName:"Brigade Gateway RWA",date:"11 Jun '26",time:"08:00 AM – 12:00 PM",
    services:["BP","Sugar","BMI"],staff:["Dr. S. Iyer (Physician)","2 Nurses","1 Coordinator"],logistics:["Clubhouse","Tables","Power"],
    approval:"approved",exec:"completed",submittedBy:"Raj Hussain",reviewedBy:"Priya Sundaram (Manager)",
    footfall:180,leads:22,conversions:6,created:4},
  {id:"AT-5",name:"Diabetes Awareness Camp",venueSlug:"prestige-lakeside-habitat",venueName:"Prestige Lakeside Habitat",date:"2 Jun '26",time:"09:00 AM – 1:00 PM",
    services:["Sugar","BP","Diet counselling"],staff:["Dr. A. Rao (Physician)","Dietician","2 Nurses"],logistics:["Clubhouse","Tables","Power"],
    approval:"approved",exec:"completed",submittedBy:"Raj Hussain",reviewedBy:"Priya Sundaram (Manager)",
    footfall:240,leads:30,conversions:9,created:5},
];
function findActivityById(id){return ACTIVITIES.find(a=>a.id===id);}

/* Maker-checker role + cross-page activity approval overrides (demo persistence) */
function currentRole(){ try{ return sessionStorage.getItem('role')||'rep'; }catch(e){ return 'rep'; } }
function setActivityApproval(id,decision){
  try{ const ov=JSON.parse(sessionStorage.getItem('activityApprovals')||'{}'); ov[id]=decision; sessionStorage.setItem('activityApprovals',JSON.stringify(ov)); }catch(e){}
  const a=findActivityById(id); if(a) a.approval=decision;
}
(function applyActivityApprovals(){
  try{ const ov=JSON.parse(sessionStorage.getItem('activityApprovals')||'{}'); ACTIVITIES.forEach(a=>{ if(ov[a.id]) a.approval=ov[a.id]; }); }catch(e){}
})();
/* Seeded beat-plan edit (BEAT_PLAN_STATE.pending) — decision persists across pages */
function seedPlanStatus(){ try{ return sessionStorage.getItem('seedPlanDecision')||BEAT_PLAN_STATE.pending.status; }catch(e){ return BEAT_PLAN_STATE.pending.status; } }
function setSeedPlanDecision(d){ try{ sessionStorage.setItem('seedPlanDecision',d); }catch(e){} }
function addedVisitsPending(){ try{ const a=JSON.parse(sessionStorage.getItem('addedVisits')||'[]'); return a.length>0 && sessionStorage.getItem('addedVisitsApproved')!=='1'; }catch(e){ return false; } }
function pendingApprovalCount(){
  let n=0;
  if(seedPlanStatus()==='pending') n+=1;
  if(addedVisitsPending()) n+=1;
  n+=ACTIVITIES.filter(a=>a.approval==='pending').length;
  if(typeof pendingExpenses==='function') n+=pendingExpenses().length;
  if(typeof pendingAdvances==='function') n+=pendingAdvances().length;
  if(typeof pendingReports==='function') n+=pendingReports().length;
  return n;
}
function fmtINR(v){
  if(v>=10000000) return '₹'+(v/10000000).toFixed(v%10000000?1:0)+' Cr';
  if(v>=100000) return '₹'+(v/100000).toFixed(v%100000?1:0)+' L';
  if(v>=1000) return '₹'+(v/1000).toFixed(0)+'K';
  return '₹'+v;
}
/* Exact rupee formatting for expense amounts */
function fmtRs(v){ return '₹'+Number(v||0).toLocaleString('en-IN'); }

/* ════════════════════════════════════════
   EXPENSES — field-rep expense management.
   Maker-checker (rep submits → manager approves),
   linked to the visit / account / activity where
   the cost was incurred.
   status: Draft | Submitted | Approved | Rejected | Paid
   ════════════════════════════════════════ */
const EXPENSE_CATEGORIES=[
  {k:"travel",l:"Travel",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14M6 17l1-5h10l1 5M7 12l1.5-4h7L18 12M8 21v-2M16 21v-2"/></svg>'},
  {k:"mileage",l:"Mileage",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-2M12 12v-5"/></svg>'},
  {k:"perdiem",l:"Daily allowance",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/></svg>'},
  {k:"meals",l:"Meals & entertainment",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2v9a2 2 0 0 0 4 0V2M8 11v11M16 2c-1.5 0-3 1.5-3 4s1.5 4 3 4v11"/></svg>'},
  {k:"logistics",l:"Camp / activity logistics",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V8l7-5 7 5v13"/></svg>'},
  {k:"accommodation",l:"Accommodation",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M7 10V7a2 2 0 0 1 2-2h2"/></svg>'},
  {k:"comms",l:"Communication",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>'},
  {k:"collateral",l:"Marketing collateral",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'},
  {k:"misc",l:"Miscellaneous",ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>'},
];
function expCatMeta(k){ return EXPENSE_CATEGORIES.find(c=>c.k===k)||EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length-1]; }
const EXPENSE_STATUS_CLASS={Draft:"up",Submitted:"wait","In report":"wait",Approved:"done",Rejected:"miss",Paid:"done"};
const PAYMENT_MODES=["Cash","Personal card","Company card","UPI"];

const EXPENSES_SEED=[
  {id:"EX-1",date:"16 Jun '26",category:"travel",amount:620,paymentMode:"UPI",note:"Fuel — Gurugram client run",status:"Submitted",linkType:"visit",linkLabel:"Dr. Jain's Nursing Home",accountSlug:"jain-s-nursing-home",receipt:"fuel-receipt.jpg",submittedBy:"Raj Hussain",created:1},
  {id:"EX-2",date:"11 Jun '26",category:"logistics",amount:4500,paymentMode:"Company card",note:"Tent, tables & banner for camp",status:"Approved",linkType:"activity",linkLabel:"Brigade Gateway — Free Health Camp",accountSlug:"brigade-gateway-rwa",receipt:"camp-logistics.pdf",submittedBy:"Raj Hussain",created:2},
  {id:"EX-3",date:"14 Jun '26",category:"meals",amount:1800,paymentMode:"Personal card",note:"Lunch with HR head",status:"Submitted",linkType:"account",linkLabel:"Wipro Technologies",accountSlug:"wipro-technologies",receipt:"lunch-bill.jpg",submittedBy:"Raj Hussain",created:3},
  {id:"EX-4",date:"12 Jun '26",category:"travel",amount:340,paymentMode:"Cash",note:"Auto to Aravali Power",status:"Paid",linkType:"account",linkLabel:"Aravali Power Company Pvt Ltd",accountSlug:"aravali-power-company-pvt-ltd",receipt:"",submittedBy:"Raj Hussain",created:4},
  {id:"EX-5",date:"10 Jun '26",category:"collateral",amount:950,paymentMode:"UPI",note:"Brochure printing — referral pads",status:"Draft",linkType:"account",linkLabel:"Aradhya Clinics",accountSlug:"aradhya-clinics",receipt:"",submittedBy:"Raj Hussain",created:5},
  {id:"EX-6",date:"16 Jun '26",category:"mileage",amount:420,paymentMode:"Cash",note:"Own vehicle · 42 km @ ₹10/km",status:"Submitted",linkType:"none",linkLabel:"",accountSlug:"",receipt:"",submittedBy:"Raj Hussain",created:6},
];

function newExpenses(){ try{ return JSON.parse(sessionStorage.getItem('newExpenses')||'[]'); }catch(e){ return []; } }
function expenseOverrides(){ try{ return JSON.parse(sessionStorage.getItem('expenseStatus')||'{}'); }catch(e){ return {}; } }
function getExpenses(){
  const ov=expenseOverrides();
  return EXPENSES_SEED.concat(newExpenses()).map(e=>ov[e.id]?{...e,status:ov[e.id]}:e);
}
function findExpenseById(id){ return getExpenses().find(e=>e.id===id); }
function setExpenseStatus(id,status){
  try{ const ov=expenseOverrides(); ov[id]=status; sessionStorage.setItem('expenseStatus',JSON.stringify(ov)); }catch(e){}
}
function addExpense(e){
  try{ const list=newExpenses(); list.push(e); sessionStorage.setItem('newExpenses',JSON.stringify(list)); }catch(err){}
}
function pendingExpenses(){ return getExpenses().filter(e=>e.status==='Submitted'); }

/* ── E4: rates & policy ── */
const MILEAGE_RATE=10;                                   /* ₹ per km, own vehicle */
const PERDIEM_RATES=[{k:"Local",v:500},{k:"Outstation",v:1200},{k:"Overnight halt",v:2000}];
const POLICY_CAPS={meals:2000,accommodation:6000,collateral:3000,misc:1500}; /* per-claim ₹ caps */
function expenseViolation(e){
  if(POLICY_CAPS[e.category]!=null && e.amount>POLICY_CAPS[e.category])
    return `Over ${expCatMeta(e.category).l} cap (${fmtRs(POLICY_CAPS[e.category])})`;
  if(e.amount>=1000 && !e.receipt && e.category!=='mileage' && e.category!=='perdiem')
    return 'Receipt required above ₹1,000';
  return null;
}

/* ── E3: advances (request money before spend, settle against actuals) ── */
const ADVANCE_STATUS_CLASS={Pending:"wait",Approved:"done",Rejected:"miss",Settled:"done"};
const ADVANCES_SEED=[
  {id:"ADV-1",purpose:"Brigade Gateway health camp",amount:10000,date:"8 Jun '26",status:"Approved",settled:6230,linkLabel:"Brigade Gateway — Free Health Camp",created:1},
  {id:"ADV-2",purpose:"Outstation corporate visits — Hosur",amount:6000,date:"15 Jun '26",status:"Pending",settled:0,linkLabel:"",created:2},
];
function newAdvances(){ try{ return JSON.parse(sessionStorage.getItem('newAdvances')||'[]'); }catch(e){ return []; } }
function advanceOverrides(){ try{ return JSON.parse(sessionStorage.getItem('advanceStatus')||'{}'); }catch(e){ return {}; } }
function getAdvances(){ const ov=advanceOverrides(); return ADVANCES_SEED.concat(newAdvances()).map(a=>ov[a.id]?{...a,status:ov[a.id]}:a); }
function findAdvanceById(id){ return getAdvances().find(a=>a.id===id); }
function setAdvanceStatus(id,s){ try{ const ov=advanceOverrides(); ov[id]=s; sessionStorage.setItem('advanceStatus',JSON.stringify(ov)); }catch(e){} }
function addAdvance(a){ try{ const l=newAdvances(); l.push(a); sessionStorage.setItem('newAdvances',JSON.stringify(l)); }catch(e){} }
function pendingAdvances(){ return getAdvances().filter(a=>a.status==='Pending'); }

/* ── E3: expense reports (bundle of claims submitted together) ── */
const REPORTS_SEED=[];
function getReports(){ try{ return REPORTS_SEED.concat(JSON.parse(sessionStorage.getItem('expReports')||'[]')); }catch(e){ return REPORTS_SEED.slice(); } }
function findReportById(id){ return getReports().find(r=>r.id===id); }
function addReport(r){ try{ const l=JSON.parse(sessionStorage.getItem('expReports')||'[]'); l.push(r); sessionStorage.setItem('expReports',JSON.stringify(l)); }catch(e){} }
function setReportStatus(id,s){ try{ const ov=JSON.parse(sessionStorage.getItem('reportStatus')||'{}'); ov[id]=s; sessionStorage.setItem('reportStatus',JSON.stringify(ov)); }catch(e){} }
function reportStatus(r){ try{ const ov=JSON.parse(sessionStorage.getItem('reportStatus')||'{}'); return ov[r.id]||r.status; }catch(e){ return r.status; } }
function pendingReports(){ return getReports().filter(r=>reportStatus(r)==='Submitted'); }

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
