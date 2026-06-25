# Deferred / To-Do Tracker

Tied to [UPGRADE_PLAN.md](UPGRADE_PLAN.md). Last updated: 2026-06-25.

---

## 🎉 Status

All 5 planned phases **and** the full deferred/cleanup backlog are built. The list
below is now mostly history; only a few genuinely-optional polish items remain open.

---

## ✅ Done

### Phases
- **Phase 1** — Account-centric model, Accounts module, Contacts merge.
- **Phase 2** — Dashboard provider KPIs; Beat Plan provider conversion (3 types, type-aware check-out, merged history, maker-checker).
- **Phase 3** — Leads pipeline + Deals pipeline (per-type stage stepper, value/probability, Won/Lost).
- **Phase 4** — Activity module (camps/events) with maker-checker + post-activity report.
- **Phase 5** — Tasks merge (provider task types), Evaluate (provider metrics), FieldIQ (provider prompts).

### Cleanup
- [x] Removed legacy pharma data from `data.js`.
- [x] Rebrand sweep — no "Roche" references; titles standardized to "Sakra Sales".
- [x] Account ↔ Leads/Deals/Tasks cross-links (both directions).

### Beat Plan (re-added on the account model)
- [x] Map view (plots visits by mx/my with status legend).
- [x] Voice check-out — type-aware AI dictation that fills the form.
- [x] Re-optimise (shortest route / priority-first) and Backup standby accounts.
- [x] Sort (time/type/status) + filter by account type.
- [x] Date switcher (prev/next with empty-state for non-today).

### Maker-checker
- [x] Real role model — Rep/Manager toggle (Profile); approve/reject gated to Manager.
- [x] Approvals inbox (`/approvals`) listing pending plan edits + activities.
- [x] Live dashboard approval count.

### Contacts
- [x] Route by stable `id` (slug-collision safe).
- [x] Referral-doctor profile (behaviour, timing, talking points).

### Other
- [x] "More" nav overflow (`/more`) — Contacts, Leads, Deals, Activity, Approvals, Profile.
- [x] "Add Visit" creates a real pending Beat Plan visit (sessionStorage) → approval flow.
- [x] Profile: Pause/Resume Shift + Select Workspace.
- [x] Create-lead / create-deal forms; lead source filter; deal Lost-reason capture.
- [x] Activity: staff/logistics pickers; completion generates Leads; approved activities show in Beat Plan.

---

## 🔭 Still open (optional polish)

- [ ] **Persistence** — all runtime changes are in-memory/sessionStorage (demo). Wire a real backend/API for durable data + true multi-user maker-checker.
- [ ] **Multi-day plans** — the date switcher shows an empty state for non-today; seed/generate plans per day.
- [ ] **Task audit history** still uses placeholder "Sales CRM Admin" + Sep'25 sample stamps — refresh to provider-realistic entries.
- [ ] **Evaluate** submissions aren't persisted.
- [ ] **Deals** — edit value/close-date inline.
- [ ] **Login/Cognito SSO** — button is a placeholder.
- [ ] **Map** — real geo tiles + routing (current map is a stylised mock).
