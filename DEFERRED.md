# Deferred / To-Do Tracker

Running list of everything we've postponed or planned but not yet built, so nothing slips.
Tied to [UPGRADE_PLAN.md](UPGRADE_PLAN.md). Last updated: 2026-06-24.

---

## 🔭 Remaining Phases (not started)

- [ ] **Phase 4 — Activity module** (camps/events, net-new): create activity (venue, date, services, staff, logistics checklist), **maker-checker approval flow**, live activity mode (footfall + on-the-spot leads), post-activity report (footfall/leads/conversions/ROI). Surface activities inside Beat Plan.
- [ ] **Phase 5 — Tasks merge**: account-linked tasks + audit-trail/history timeline + AI summary banner; new task types (referral follow-up, activity execution, MOU follow-up); attachments, status/priority chips.
- [ ] **Phase 5 — Evaluate Sales Reps**: change criteria to provider metrics (referrals generated, activities run, MOUs signed).
- [ ] **Phase 5 — FieldIQ AI**: retrain prompts ("Which corporates are up for renewal?", "Best localities for next activity?", "Which referral doctors went cold?").

---

## ⏸️ Deferred from completed phases

### Beat Plan (Phase 2)
- [ ] **Map view** — existed in the old pharma build (doctor coordinates). Re-add on the account-based model (`PLAN_VISITS` already has `mx`/`my`).
- [ ] **Voice check-out** — AI dictation that auto-fills the check-out form (was pharma-script specific). Re-add type-aware on the new model.
- [ ] **Re-optimise** (AI re-planner) and **Backup plan** (standby visits) — present in old beat-plan, not yet ported.
- [ ] **Sort & filter** on the visit list (by time/priority/type) — not yet rebuilt.
- [ ] **Date switcher** — old plan let you change the plan date; current build is "Today" only.

### Maker-checker
- [ ] Real **role model** (rep vs manager) — currently the approval sheet shows Approve/Reject to everyone for demo. Gate by role.
- [ ] **Approvals inbox** (manager view) listing all pending plans/activities across reps.
- [ ] Dashboard approval counts should be **live** (currently static "1 awaiting approval").

### Contacts (Phase 1)
- [ ] **Slug collisions** — contacts route by name-slug; `slugify` strips `Dr.` but not `Mr./Mrs./Ms.`. No collisions in current data, but switch to contact `id` routing for safety before adding more contacts.
- [ ] Rich **referral-doctor profile** (behavior, preferred timing, suggested talking points) — the old pharma doctor profile was dropped; rebuild a provider-flavored version (referral behavior, not detailing).

---

## 🧹 Cleanup / tech debt

- [ ] **Remove legacy pharma data** from `assets/data.js` once nothing references it: `DOCTORS`, `TODAY_VISITS`, `BACKUP_VISITS`, `DOCTOR_PROFILES`, `PROFILE_FALLBACK`, `PRODUCTS`, `visitsForOffset`, `findDoctorBySlug`, `findTodayVisitBySlug`.
- [ ] **Rebrand sweep** — page `<title>`s and copy still mix "Roche/SFA"; standardize to Sakra World Hospital + THB across all pages.
- [ ] **"Add Visit"** (Accounts) currently snackbars "pending approval" — wire it to actually create a Beat Plan visit in pending state.
- [ ] **Profile / Login pages** — still pharma-branded; align to provider (add Pause Shift, Select Workspace from B2B).
- [ ] **Bottom nav** — plan called for a "More" overflow (Leads/Deals/Activity/Contacts); currently a flat 5-tab nav. Revisit once Leads/Deals/Activity exist.

---

## ✅ Done (for reference)
- Phase 1 — Account-centric model, Accounts module, Contacts merge.
- Phase 2 — Dashboard provider KPIs, Beat Plan provider conversion (3 types, type-aware check-out, merged history, maker-checker).
- Phase 3 — Leads pipeline (4 stages, stage-advance) + Deals pipeline (per-type stage stepper, value/probability, Won/Lost). Accessed via Dashboard "Pipeline" tiles (not yet in bottom nav — see More-overflow item below).

## 📌 New deferrals from Phase 3
- [ ] **Leads/Deals not in bottom nav** — reachable via Dashboard quick tiles + direct URL only. Fold into "More" overflow when built.
- [ ] **Account detail** should list its linked Leads, Deals, Tasks (cross-links exist lead→account / deal→account, not yet account→lead/deal).
- [ ] **Leads:** source date-range filter, activity-generated leads auto-flow, create-lead form.
- [ ] **Deals:** Lost-reason capture, edit value/close-date, create-deal form.
