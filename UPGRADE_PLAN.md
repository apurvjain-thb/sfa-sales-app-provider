# SFA → Provider Sales App — Upgrade Plan

> Evolving the SFA Sales App into a **Provider / Hospital Sales App** for Sakra World Hospital (powered by THB), using the **Sakra B2B CRM** as the foundation and layering the SFA app's field-execution strengths on top.

---

## 1. Context

We have two existing assets:

| Asset | What it is | Strength |
|---|---|---|
| **Sakra B2B CRM** (Figma) | Mature B2B sales CRM — Accounts, Leads, Deals, Contacts, Tasks, Visits, Shift management | CRM/pipeline backbone |
| **SFA Sales App** (this repo) | Field-execution app — Beat Plan, Map, check-in/out, Dashboard KPIs, voice check-out, AI assistant | Field execution layer |

The B2B CRM is strong on the **pipeline/CRM side** but has **no field-execution layer** (no day planning, no map, no route, no rich visit outcomes). The SFA app is the inverse. The provider app is the **merge of both**.

### Target users
Hospital sales staff (field reps + their managers) who:
1. Visit doctors/clinics to generate **patient referrals**
2. Plan **health camps/activities** at housing societies, malls, schools
3. Pursue **corporate tie-ups** for employee health packages

---

## 2. Foundational Decision — Account-Centric Model

The single most important change: **Account becomes the primary entity, not Doctor.** Contacts, Visits, Tasks, Leads, and Deals all hang off an Account.

An **Account Type** field drives the entire app's behaviour:

| Account Type | Use Case | Key behaviour |
|---|---|---|
| `referral_source` (Nursing Home, Clinic, Doctor practice) | Patient referrals | Referral tracking, doctor tiering |
| `venue` (Housing Society, Mall, School, RWA) | Health camps | Activity planning + execution |
| `corporate` (PSU, IT company, Factory) | Employee tie-ups | MOU pipeline, headcount, packages |

This one decision keeps the app coherent instead of three bolted-on flows.

---

## 3. Cross-Cutting Capability — Maker-Checker (Approval Workflow)

Both **Beat Plan** and **Activity** require manager approval. Build this **once as a reusable mechanism**, not duplicated per module.

- **Shared state machine:** `Draft → Pending Approval → Approved → Active → Completed`, with `Rejected` looping back to `Draft` (rejection carries a reason).
- **Roles:** Maker (field rep) creates/modifies; Checker (manager) approves/rejects.
- **Approval inbox** for managers; status badges + notifications for reps.
- **Execution gate:** a rep can only execute (e.g. check-in, run an activity) once the item is **Approved**.
- **Dashboard surfaces:** "X pending your approval" (manager view) and "X awaiting approval" (rep view).

---

## 4. Module-by-Module Plan

### 4.1 Login & Shell
- Keep SFA's clean login; adopt Sakra's "Login via Cognito" SSO + "More login options".
- Rebrand to Sakra World Hospital + THB.
- **Bottom nav:** `Home · Accounts · Beat Plan · Tasks · More`
  - More → Leads, Deals, Activity, Contacts, Profile
- **Add Shift management** (Pause/Resume Shift) from B2B.

### 4.2 Dashboard (Home) — *SFA strength, rebuilt for provider KPIs*
Replace pharma KPIs with provider KPIs:
- **Referrals received** (MTD) vs target + conversion to admissions
- **Activities** — planned / completed this month + leads generated
- **Corporate pipeline** — MOUs in negotiation, signed this quarter, ₹ value
- **Today's plan progress** (keep SFA's visual bar)
- **Approval counts** — pending approval (manager) / awaiting approval (rep)
- **Action items** — overdue tasks, missed visits, deals closing this week
- Segment toggle: KPIs by use case (Referral / Activity / Corporate)

### 4.3 Accounts — *new module, ported from B2B*
- List with status chips (Prospect / Active / On-hold) + **Account Type filter**.
- Card: name, type, address/phase, last visit, **"Add Visit"** CTA.
- Account detail: contacts, visit history, deals, tasks, data-quality score.
- **"Send Report"** export (from B2B).
- Type-specific detail sections:
  - Referral source → referral history, specialties, tier
  - Venue → society size / footfall potential, past activities
  - Corporate → employee count, current insurer, renewal date

### 4.4 Contacts — *merge both*
- B2B's multi-role model (CMO, Procurement Head, COO, RWA Secretary, HR Head) linked to Accounts.
- Keep SFA's rich **doctor profile** (behaviour, preferences, suggested talking points) — clinical fields shown only when the contact is a doctor.
- Keep SFA's message templates (SMS / WhatsApp / Email) — rewrite content per contact type.
- **No call logs** (that was a B2C feature; not needed here).

### 4.5 Beat Plan — *merged with Visits Tracking + Maker-Checker*
This becomes **one unified module**: forward-looking plan + historical visit log together.

**Two ways to create a beat plan:**
1. **Automated** — system generates the optimal plan (route / priority based).
2. **Manual** — rep builds their own plan, choosing accounts/contacts/times.

**Maker-Checker:**
- A self-created plan, or any **modification** to an existing plan → `Pending Approval`.
- Manager reviews → Approve / Reject (with reason).
- Rep can only check-in once **Approved**.

**Execution layer (kept from SFA):**
- List + Map view.
- **Type-aware check-out** outcomes:
  - **Referral visit** → specialties discussed, referral commitment (verbal/written/none), expected referrals/month, next cadence
  - **Activity visit** → venue confirmed, proposed date, footfall estimate, logistics checklist, sign-off
  - **Corporate visit** → decision-maker met, package discussed, MOU stage moved, employee count, next step
- Voice check-out, re-optimise, backup plan.

**Visit history (merged from B2B):**
- Past check-in/check-out timestamps, purpose tags, outcomes — same module, "History" tab.

### 4.6 Leads — *new module, ported from B2B*
- 4-stage pipeline: New / Contacted / Qualified / Converted.
- Source tracking (Manual / HIS / Website / Activity).
- Lead types tied to use case: Referral tie-up, Activity opportunity, Corporate enquiry.
- Priority dots, due dates, date-range filter.
- **Activity-generated leads** flow back here automatically (patients captured at a camp become leads).

### 4.7 Deals — *new module, ported from B2B, reframed*
- Pipeline with INR value + probability + expected close.
- **Stage sets per deal type:**
  - Corporate MOU: Intro → Proposal → Negotiation → Legal → Signed
  - Referral program: Discussion → Agreement → First referral → Active
- Renewal tracking for corporates.

### 4.8 Tasks — *merge both*
- B2B's account-linked tasks + SFA's audit-trail / history timeline + AI summary banner.
- New task types: Referral follow-up, Activity execution (recce → confirm → staff → execute → report), MOU follow-up.
- Keep SFA's attachments, status/priority chips, edit form.

### 4.9 Activity (Camps & Events) — *new module + Maker-Checker*
The net-new module for health camps and events at venues.
- Create activity: venue (Venue account), date, services offered (BP, sugar, BMI, specialist OPD), staff assignment, logistics checklist.
- **Maker-Checker flow** (same as beat visits): created/modified activity → `Pending Approval` → manager Approve/Reject → only then schedulable/executable.
- **Live activity mode:** register footfall, capture leads on the spot.
- **Post-activity report:** footfall, leads collected, conversions to hospital visits, ROI.
- Activities surface inside the merged Beat Plan as an activity type.

### 4.10 Profile / Evaluate / FieldIQ
- Keep SFA's **Evaluate Sales Reps** — change criteria to provider metrics (referrals generated, activities run, MOUs signed).
- Keep **FieldIQ AI** — retrain prompts: "Which corporates are up for renewal?", "Best localities for next activity?", "Which referral doctors went cold?".
- Add B2B's Pause Shift + Select Workspace.

---

## 5. Module Summary

| # | Module | Source | Key change |
|---|---|---|---|
| 1 | Login & Shell | Both | Rebrand, SSO, shift mgmt |
| 2 | Dashboard | SFA | Provider KPIs + approval counts |
| 3 | Accounts | B2B | Account Type driven |
| 4 | Contacts | Both | Multi-role, no call logs |
| 5 | **Beat Plan + Visits (merged)** | Both | Auto + manual, **maker-checker** |
| 6 | Leads | B2B | Use-case lead types |
| 7 | Deals | B2B | MOU / referral stages |
| 8 | Tasks | Both | Provider task types |
| 9 | **Activity** (camps/events) | New | **maker-checker** |
| 10 | Profile / Evaluate / FieldIQ | SFA | Provider metrics |

---

## 6. Build Order

| Phase | Scope | Why first |
|---|---|---|
| **1** | Account-centric refactor + Account Type + Accounts module + Contacts merge | Foundation everything depends on |
| **2** | Beat Plan (merged w/ Visits) + Maker-Checker + type-aware check-out + Dashboard KPIs | Field execution + visibility |
| **3** | Leads + Deals (ported from B2B) | CRM pipeline |
| **4** | Activity module (+ Maker-Checker) | Net-new use case |
| **5** | Tasks merge + Evaluate + FieldIQ adaptation | Polish + intelligence |

---

## 7. Reference

- **B2B CRM Figma:** file `rBetEZW6tnv9OU9VjEG6kN`, node `1390-3594`
- **Tech stack:** vanilla HTML / CSS / JS (no framework), Vercel-hosted
- **Repo:** github.com/apurvjain-thb/sfa-sales-app-provider
