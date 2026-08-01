// Field definitions for every CMS-managed resource.
// Shapes mirror the documents already stored for each collection, so editing
// through the admin panel produces records identical to the existing ones.
//
// type:     text | textarea | date | url | select | number-ish text
// required: only where a public page depends on the value

export const CONTENT_TYPES = [
  {
    key: 'notices',
    label: 'News & Notices',
    icon: 'FileText',
    publicPath: '/news',
    // columns shown in the admin table
    columns: [
      { field: 'title', label: 'Title', primary: true },
      { field: 'tag', label: 'Tag', badge: true },
      { field: 'date', label: 'Date' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, full: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      {
        name: 'tag',
        label: 'Tag',
        type: 'select',
        options: ['Notice', 'News', 'Update', 'Alert'],
      },
      { name: 'body', label: 'Body', type: 'textarea', full: true },
    ],
  },
  {
    key: 'events',
    label: 'Events Calendar',
    icon: 'Calendar',
    publicPath: '/events',
    columns: [
      { field: 'title', label: 'Event', primary: true },
      { field: 'venue', label: 'Venue' },
      { field: 'date', label: 'Date' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, full: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'venue', label: 'Venue', type: 'text' },
      { name: 'desc', label: 'Description', type: 'textarea', full: true },
      {
        name: 'icon',
        label: 'Icon',
        type: 'text',
        hint: 'An emoji (e.g. 🎉) or a Lucide icon name (e.g. Calendar).',
      },
    ],
  },
  {
    key: 'team',
    label: 'Team Members',
    icon: 'Users',
    publicPath: '/team',
    columns: [
      { field: 'name', label: 'Name', primary: true },
      { field: 'role', label: 'Role', badge: true },
      { field: 'college', label: 'College' },
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'college', label: 'College', type: 'text', full: true },
      {
        name: 'image',
        label: 'Photo',
        type: 'imagePath',
        full: true,
        hint: 'A hosted image URL, or a path to a file in frontend/public — e.g. /images/president.jpeg.',
      },
      {
        name: 'initials',
        label: 'Initials',
        type: 'text',
        hint: 'Shown when no photo is set. Left blank, it is derived from the name.',
      },
      {
        name: 'socials',
        label: 'Social links',
        type: 'socials',
        full: true,
        hint: 'Optional. Shown as icons on the team card.',
      },
    ],
  },
  {
    key: 'scholarships',
    label: 'Scholarships',
    icon: 'GraduationCap',
    publicPath: '/services/scholarships',
    columns: [
      { field: 'name', label: 'Scheme', primary: true },
      { field: 'provider', label: 'Provider' },
    ],
    fields: [
      { name: 'name', label: 'Scheme name', type: 'text', required: true, full: true },
      { name: 'provider', label: 'Provider', type: 'text' },
      { name: 'link', label: 'Application portal URL', type: 'url' },
      { name: 'benefit', label: 'Benefit', type: 'textarea', full: true },
    ],
  },
  {
    key: 'downloads',
    label: 'Downloads & Forms',
    icon: 'Download',
    publicPath: '/services/downloads',
    fileNote: true,
    columns: [
      { field: 'name', label: 'Document', primary: true },
      { field: 'type', label: 'Type', badge: true },
      { field: 'url', label: 'File URL', truncate: true },
    ],
    fields: [
      { name: 'name', label: 'Document name', type: 'text', required: true, full: true },
      { name: 'type', label: 'File type', type: 'select', options: ['PDF', 'DOC', 'XLS', 'Link'] },
      {
        name: 'url',
        label: 'File URL',
        type: 'url',
        hint: 'Paste a link to an externally hosted file — uploads are not available yet.',
      },
      { name: 'note', label: 'Notes', type: 'textarea', full: true },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    icon: 'BookOpen',
    publicPath: '/resources',
    columns: [
      { field: 'name', label: 'Resource', primary: true },
      { field: 'url', label: 'URL', truncate: true },
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, full: true },
      { name: 'url', label: 'URL', type: 'url', required: true, full: true },
      { name: 'desc', label: 'Description', type: 'textarea', full: true },
      { name: 'icon', label: 'Icon', type: 'text', hint: 'Lucide icon name, e.g. BookOpen.' },
    ],
  },
  {
    key: 'milestones',
    label: 'Work & Milestones',
    icon: 'Flag',
    publicPath: '/milestones',
    columns: [
      { field: 'title', label: 'Milestone', primary: true },
      { field: 'year', label: 'Year', badge: true },
    ],
    fields: [
      { name: 'year', label: 'Year', type: 'text', required: true, hint: 'Four digits, e.g. 2026.' },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'desc', label: 'Description', type: 'textarea', full: true },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    icon: 'HelpCircle',
    publicPath: '/help/faqs',
    columns: [{ field: 'q', label: 'Question', primary: true }],
    fields: [
      { name: 'q', label: 'Question', type: 'text', required: true, full: true },
      { name: 'a', label: 'Answer', type: 'textarea', required: true, full: true },
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery',
    icon: 'Image',
    publicPath: '/gallery',
    fileNote: true,
    columns: [
      { field: 'caption', label: 'Caption', primary: true },
      { field: 'imageUrl', label: 'Image URL', truncate: true },
    ],
    fields: [
      { name: 'caption', label: 'Caption', type: 'text', required: true, full: true },
      {
        name: 'imageUrl',
        label: 'Image URL',
        type: 'url',
        hint: 'Paste a link to an externally hosted image — uploads are not available yet.',
        full: true,
      },
      { name: 'icon', label: 'Icon', type: 'text', hint: 'Shown when no image URL is set.' },
      {
        name: 'gradient',
        label: 'Placeholder gradient',
        type: 'text',
        hint: 'CSS value, e.g. linear-gradient(135deg,#9900cc,#c14ae8).',
        full: true,
      },
    ],
  },
]

export const getContentType = (key) => CONTENT_TYPES.find((t) => t.key === key)

// Platforms TeamCard knows how to render an icon for.
export const SOCIAL_PLATFORMS = ['instagram', 'twitter', 'facebook', 'threads', 'website']

// Blank record shaped from the type's field list.
export const emptyRecord = (type) =>
  Object.fromEntries(type.fields.map((f) => [f.name, f.type === 'socials' ? [] : '']))

// Strip server-managed keys — never send id/createdAt back in a payload.
export function toPayload(type, values) {
  const payload = {}
  for (const field of type.fields) {
    const raw = values[field.name]

    if (field.type === 'socials') {
      // Keep only rows that have both a platform and a link
      const rows = (Array.isArray(raw) ? raw : [])
        .map((s) => ({ platform: String(s.platform || '').trim(), url: String(s.url || '').trim() }))
        .filter((s) => s.platform && s.url)
      if (rows.length) payload[field.name] = rows
      continue
    }

    const value = typeof raw === 'string' ? raw.trim() : raw
    // Omit empty optional fields rather than storing empty strings
    if (value === '' || value === undefined || value === null) continue
    payload[field.name] = value
  }
  return payload
}

const URL_RE = /^https?:\/\/\S+$/i
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
// A hosted image, or a file served from frontend/public (e.g. /images/x.jpeg)
const URL_OR_PATH_RE = /^(https?:\/\/\S+|\/\S*)$/i

// Client-side mirror of the backend rules, so users get instant feedback.
export function validateRecord(type, values) {
  const errors = {}
  for (const field of type.fields) {
    if (field.type === 'socials') {
      const rows = Array.isArray(values[field.name]) ? values[field.name] : []
      // A row is only a problem once the user has started filling it in
      const bad = rows.findIndex(
        (s) =>
          (s.platform || s.url) &&
          (!s.platform || !s.url || !URL_RE.test(String(s.url).trim())),
      )
      if (bad !== -1) {
        errors[field.name] = `Link ${bad + 1}: pick a platform and enter a full https:// URL`
      }
      continue
    }

    const value = String(values[field.name] ?? '').trim()
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required`
      continue
    }
    if (!value) continue
    if (field.type === 'imagePath' && !URL_OR_PATH_RE.test(value)) {
      errors[field.name] = 'Enter a full URL, or a path beginning with /'
    }
    if (field.type === 'url' && !URL_RE.test(value)) {
      errors[field.name] = 'Enter a full URL starting with http:// or https://'
    }
    if (field.type === 'date' && (!DATE_RE.test(value) || Number.isNaN(Date.parse(value)))) {
      errors[field.name] = 'Enter a valid date'
    }
    if (field.name === 'year' && !/^\d{4}$/.test(value)) {
      errors[field.name] = 'Enter a 4-digit year'
    }
  }
  return errors
}
