# DUSU Backend

Minimal Express API with SQLite storage (Node's built-in `node:sqlite` —
no database server or native modules to install). Requires Node 22+.

## Run

```bash
cd backend
npm install
npm run dev        # http://localhost:5000/api (auto-restarts on change)
```

The database file `dusu.db` is created and seeded automatically on first run.

## How it works (5 files, ~150 lines)

| File | Purpose |
| --- | --- |
| `src/server.js` | App assembly — mounts one CRUD router per resource |
| `src/config/db.js` | Opens SQLite, creates tables, seeds empty ones |
| `src/config/seed.js` | Initial sample content |
| `src/lib/store.js` | Generic data access (list/get/create/update/remove) |
| `src/lib/resource.js` | Generic CRUD Express router |

Each table stores JSON documents, so **adding a field never needs a migration**,
and **adding a whole new section is one line** in `RESOURCES` (db.js).

## Endpoints

Every resource gets the same API. Resources: `notices`, `events`, `queries`,
`team`, `scholarships`, `opportunities`, `downloads`, `resources`,
`milestones`, `faqs`, `gallery`, `contact`.

```
GET    /api/notices            list (filter: /api/queries?refId=DUSU-2026-123456)
GET    /api/notices/:id        one document
POST   /api/notices            create (JSON body)
PUT    /api/notices/:id        merge-update
DELETE /api/notices/:id        delete
GET    /api/health             health check
```

`POST /api/queries` additionally generates a `refId` and sets
`status: "Submitted"` — update status later with `PUT /api/queries/:id`.

## Future work

- Auth for admin routes (JWT middleware slots into `server.js`)
- Swap storage by editing only `db.js`/`store.js` (e.g. Postgres, MongoDB)
- Per-resource validation via the `onCreate` hook in `resource()`
