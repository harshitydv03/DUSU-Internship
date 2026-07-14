# DUSU — Delhi University Students' Union Portal

Official website project for the Delhi University Students' Union: student
grievances, scholarships, events, helplines, news and an admin panel.

## Project structure

```
frontend/   React + Vite single-page app
backend/    Express + SQLite API (Node 22+, zero external services)
```

## Run it

```bash
# terminal 1 — API on http://localhost:5000
cd backend && npm install && npm run dev

# terminal 2 — site on http://localhost:5173
cd frontend && npm install && npm run dev
```

The frontend works even without the backend (sample data + localStorage
fallback for grievances).

## What works today

- All public pages: Home, About DUSU (history, structure, elections), Our Team,
  Student Help (grievance form + tracker, FAQs, helplines, anti-ragging),
  Student Services (scholarships, opportunities, downloads), Events, Gallery,
  News & Notices, Resources, Work & Milestones, Contact
- **Full grievance loop**: form posts to the API and gets a reference ID;
  admins update the status and **reply to students** from the admin panel;
  students see status + team replies in Track My Query
- **Admin login** at `/admin/login` (dev credentials: `admin` / `dusu@2026`);
  all content writes require authentication
- REST API with CRUD for every section (`/api/notices`, `/api/events`,
  `/api/queries`, …) backed by SQLite — see `backend/README.md`
- Admin panel with live stats and query management

## Next up

- Move remaining page content (notices, events, team) from
  `frontend/src/utils/constants.js` to the API
- File uploads for Gallery and Downloads sections

## Team notes

- Sample names/numbers are placeholders marked in the UI — replace with
  verified data from the DUSU office.
- Deployment targets: Vercel (frontend, `frontend/vercel.json`) and Docker
  (`frontend/Dockerfile`, `backend/Dockerfile`).
