# DUSU — Delhi University Students' Union Portal

Official website project for the Delhi University Students' Union: student
grievances, scholarships, events, helplines, news and an admin panel.

## Project structure

```
frontend/   React + Vite single-page app (working — run instructions below)
backend/    Node.js/Express API skeleton (to be implemented)
```

## Run the frontend

```bash
cd frontend
npm install
npm run dev        # opens on http://localhost:5173
```

## What works today

- All public pages: Home, About DUSU (history, structure, elections), Our Team,
  Student Help (grievance form + tracker, FAQs, helplines, anti-ragging),
  Student Services (scholarships, opportunities, downloads), Events, Gallery,
  News & Notices, Resources, Work & Milestones, Contact
- Grievance form issues a reference ID and the tracker shows its status
  (stored in the browser's localStorage until the backend is connected)
- Admin panel UI preview (dashboard, content/query/user management, audit log)

## Next up

- Implement the Express backend (`backend/src`) — models, controllers and
  routes are stubbed out per section
- Replace sample data in `frontend/src/utils/constants.js` with API data
- Add authentication for the admin panel

## Team notes

- Sample names/numbers are placeholders marked in the UI — replace with
  verified data from the DUSU office.
- Deployment targets: Vercel (frontend, `frontend/vercel.json`) and Docker
  (`frontend/Dockerfile`, `backend/Dockerfile`).
