# Content Management (CMS)

The admin Content Management page at `/admin/content` edits the content shown on
the public site. It uses the existing generic CRUD API — no new backend
architecture, no new dependencies.

## Content types

| Section | API resource | Public page |
| --- | --- | --- |
| News & Notices | `notices` | `/news` |
| Events Calendar | `events` | `/events` |
| Team Members | `team` | `/team` |
| Scholarships | `scholarships` | `/services/scholarships` |
| Downloads & Forms | `downloads` | `/services/downloads` |
| Resources | `resources` | `/resources` |
| Work & Milestones | `milestones` | `/milestones` |
| FAQs | `faqs` | `/help/faqs` |
| Gallery | `gallery` | `/gallery` |

Field definitions live in `frontend/src/pages/admin/contentSchema.js`. To add a
field, add it to that resource's `fields` array — the table, the editor form and
the payload all follow from it.

## Required fields

Only fields the public pages depend on are required. The backend enforces the
same rules in `backend/src/server.js` (`CMS_RULES`) and returns `400` with a
readable message when a write is invalid.

| Resource | Required | Format-checked |
| --- | --- | --- |
| notices | title, date | date `YYYY-MM-DD` |
| events | title, date | date `YYYY-MM-DD` |
| team | role, name | image must be a URL or `/path`; each social link needs a known platform and a URL |
| scholarships | name | link must be a URL |
| downloads | name | url must be a URL |
| resources | name, url | url must be a URL |
| milestones | year, title | year must be 4 digits |
| faqs | q, a | — |
| gallery | caption | imageUrl must be a URL |

## Running it locally

```bash
cd backend && npm run dev
```

```bash
cd frontend && npm run dev
```

The backend needs `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USER` and `ADMIN_PASSWORD`
in `.env.local` at the repo root — see `backend/.env.example` for the shape.

## Manual test steps

### 1. Log in

1. Open `http://localhost:5173/admin/login`.
2. Sign in with the admin credentials from your `.env.local`.
3. You should land on `/admin`. Open **Content Management** in the sidebar.

### 2. Create

1. Pick a section on the left, e.g. **News & Notices**.
2. Click **Add new**. The editor drawer opens.
3. Submit it empty — required fields show inline errors and nothing is sent.
4. Put an invalid value in a URL or date field — it is rejected client-side.
5. Fill in a valid title and date, then **Create entry**.
6. The drawer closes, a green “New entry added.” banner appears and the table
   reloads with the new row.

### 3. Check the public page

1. Click **View public page ↗** in the panel header (or open `/news`).
2. The new entry appears. Public pages read the API on mount.

### 4. Edit

1. Back on `/admin/content`, click **Edit** on the row.
2. The form is pre-filled with the current values.
3. Change something and click **Save changes** — “Changes saved.” appears and the
   table reflects the edit.
4. Reload the public page to confirm the change is live.

### 5. Delete

1. Click **Delete** on the row. The row switches to a “Delete this?” confirmation.
2. **Cancel** dismisses it without deleting.
3. **Yes, delete** removes the record, shows “Entry deleted.” and reloads.
4. Confirm the item is gone from the public page.

### 6. Expired session

1. In DevTools, set `localStorage.dusu_admin_token` to any invalid string.
2. Attempt a save or delete.
3. The API returns `401`; the stored token and username are cleared and you are
   redirected to `/admin/login`.

### 7. Backend offline

1. Stop the backend and reload a public page such as `/services/downloads`.
2. The page still renders its bundled sample content rather than an empty page.

## Team member fields

Team records carry `role`, `name`, `college`, `image`, `initials` and `socials`.

- **Photo** takes a hosted image URL, or a path to a file already in
  `frontend/public` — e.g. `/images/president.jpeg`. A thumbnail preview appears
  in the editor once the value resolves.
- **Initials** are shown when no photo is set. Left blank, they are derived from
  the name, so there is normally no reason to fill this in.
- **Social links** are repeatable rows of platform + URL, stored as
  `[{ platform, url }]`. Supported platforms are `instagram`, `twitter` (shown as
  X), `facebook`, `threads` and `website` — these are the icons the team card can
  render. A half-filled row is rejected; empty rows are dropped on save.

Note that `/team/office-bearers` reads a separate `officebearers` resource and is
not managed by this page.

## Limitations

- **No file or image uploads.** Downloads and Gallery take an externally hosted
  URL. There is no upload endpoint, cloud-storage integration or base64 storage
  in this release; adding one means a storage backend plus an upload route.
- **No ordering control.** Records list newest-first, as the API returns them.
- **No draft/publish state.** Saving publishes immediately.
- **No image validation.** A URL that 404s renders a broken image.
- Seed data in `backend/src/config/seed.js` is bootstrap-only and only loads into
  an empty collection. It is not used or altered by normal CMS edits.
