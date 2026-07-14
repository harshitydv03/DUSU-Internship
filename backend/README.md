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

## Auth

Reads are public. All writes require a logged-in admin, **except**
`POST /api/queries` and `POST /api/contact` (students must be able to file
them). Tokens are HMAC-signed (`src/lib/auth.js`, zero dependencies).

```
POST /api/auth/login                { "username": "...", "password": "..." }
                                    → { "token": "...", "username": "..." }
POST /api/queries/:id/replies      (auth) { "message": "..." } — reply to a student
```

Send the token as `Authorization: Bearer <token>` (the frontend does this
automatically after logging in at `/admin/login`).

**Default dev credentials:** `admin` / `dusu@2026` — change them by setting
`ADMIN_USER` / `ADMIN_PASSWORD` env vars before first run, and always set
`JWT_SECRET` in production.

## Future work

- Swap storage by editing only `db.js`/`store.js` (e.g. Postgres, MongoDB)
- Per-resource validation via the `onCreate` hook in `resource()`
- Multiple admin accounts + roles (table and `role` claim already exist)
