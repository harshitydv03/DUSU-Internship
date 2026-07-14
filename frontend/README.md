# DUSU Frontend

React + Vite frontend for the Delhi University Students' Union portal.

## Run locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # output in dist/
```

## Structure

- `src/pages/` — one folder per site section (about-dusu, student-help, admin, …)
- `src/components/` — reusable components grouped by section; `common/` for shared ones
- `src/utils/constants.js` — nav menu + all sample content (replace with API data)
- `src/utils/apiClient.js` — fetch wrapper for the backend (set `VITE_API_URL` in `.env`)

Sample data note: notices, events, team names and milestones are placeholders.
Grievance submissions are stored in `localStorage` until the backend is connected.
