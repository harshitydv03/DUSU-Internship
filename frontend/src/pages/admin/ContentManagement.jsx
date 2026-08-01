import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient, { clearSession, isUnauthorized } from '../../utils/apiClient.js'
import {
  CONTENT_TYPES,
  SOCIAL_PLATFORMS,
  emptyPerson,
  emptyRecord,
  toPayload,
  validateRecord,
} from './contentSchema.js'

// Repeatable platform + URL rows, stored as [{ platform, url }] to match the
// shape TeamCard already renders.
function SocialsEditor({ rows, onChange }) {
  const update = (index, patch) =>
    onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)))

  return (
    <div className="cms-socials">
      {rows.map((row, i) => (
        <div className="cms-social-row" key={i}>
          <select
            aria-label={`Platform for link ${i + 1}`}
            value={row.platform || ''}
            onChange={(e) => update(i, { platform: e.target.value })}
          >
            <option value="">— platform —</option>
            {SOCIAL_PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p === 'twitter' ? 'X (Twitter)' : p[0].toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            aria-label={`URL for link ${i + 1}`}
            placeholder="https://…"
            value={row.url || ''}
            onChange={(e) => update(i, { url: e.target.value })}
          />
          <button
            type="button"
            className="cms-btn danger"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            aria-label={`Remove link ${i + 1}`}
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="cms-btn"
        onClick={() => onChange([...rows, { platform: '', url: '' }])}
      >
        <Icon name="Plus" size={14} /> Add link
      </button>
    </div>
  )
}

// One input for any field type. Shared by the drawer and the nested people
// editor so both stay in step as field types are added.
function FieldInput({ field, id, value, onChange }) {
  if (field.type === 'socials') {
    return <SocialsEditor rows={Array.isArray(value) ? value : []} onChange={onChange} />
  }

  if (field.type === 'people') {
    return (
      <PeopleEditor field={field} people={Array.isArray(value) ? value : []} onChange={onChange} />
    )
  }

  if (field.type === 'imagePath') {
    return (
      <div className="cms-image-field">
        <input
          id={id}
          type="text"
          placeholder="https://…  or  /images/photo.jpeg"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {value ? (
          <img
            src={value}
            alt=""
            className="cms-image-preview"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = 'block'
            }}
          />
        ) : null}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        id={id}
        rows={field.rows || 4}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">— none —</option>
        {field.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      id={id}
      type={field.type === 'date' ? 'date' : 'text'}
      inputMode={field.type === 'url' ? 'url' : undefined}
      placeholder={field.type === 'url' ? 'https://…' : undefined}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

// Repeatable person cards, each with its own nested social links.
function PeopleEditor({ field, people, onChange }) {
  const update = (index, patch) =>
    onChange(people.map((p, i) => (i === index ? { ...p, ...patch } : p)))

  return (
    <div className="cms-people">
      {people.map((person, i) => (
        <div className="cms-person" key={i}>
          <div className="cms-person-head">
            <strong>{person.role || person.name || `Person ${i + 1}`}</strong>
            <button
              type="button"
              className="cms-btn danger"
              onClick={() => onChange(people.filter((_, idx) => idx !== i))}
            >
              <Icon name="Trash2" size={14} /> Remove
            </button>
          </div>
          <div className="form-grid">
            {field.itemFields.map((sub) => (
              <div className={sub.full ? 'form-field full' : 'form-field'} key={sub.name}>
                <label htmlFor={`p${i}-${sub.name}`}>
                  {sub.label}
                  {sub.required && <span className="cms-req"> *</span>}
                </label>
                <FieldInput
                  field={sub}
                  id={`p${i}-${sub.name}`}
                  value={person[sub.name]}
                  onChange={(v) => update(i, { [sub.name]: v })}
                />
                {sub.hint && <p className="cms-hint">{sub.hint}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="cms-btn"
        onClick={() => onChange([...people, emptyPerson(field)])}
      >
        <Icon name="Plus" size={14} /> Add person
      </button>
    </div>
  )
}

export default function ContentManagement() {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(CONTENT_TYPES[0].key)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // drawer state — `editing` is null when closed, a record (or {}) when open
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const type = CONTENT_TYPES.find((t) => t.key === activeKey)

  // A 401 means the token expired — drop it and send the user back to login.
  const handleAuthFailure = useCallback(() => {
    clearSession()
    navigate('/admin/login', { replace: true })
  }, [navigate])

  const describe = (err, fallback) => {
    if (err?.status === 0) return 'Could not reach the API — is the backend running?'
    return err?.message || fallback
  }

  const load = useCallback(
    async (key) => {
      setLoading(true)
      setError('')
      try {
        const data = await apiClient.get(`/${key}`)
        setRecords(Array.isArray(data) ? data : [])
      } catch (err) {
        if (isUnauthorized(err)) return handleAuthFailure()
        setRecords([])
        setError(describe(err, 'Could not load this section.'))
      } finally {
        setLoading(false)
      }
    },
    [handleAuthFailure],
  )

  useEffect(() => {
    load(activeKey)
  }, [activeKey, load])

  // Singleton sections edit one document inline, so seed the form from it.
  useEffect(() => {
    if (!type.singleton || loading) return
    const doc = records[0]
    const next = emptyRecord(type)
    for (const key of Object.keys(next)) {
      const value = doc?.[key]
      if (value === undefined || value === null) continue
      next[key] = Array.isArray(value)
        ? value.map((row) => (typeof row === 'object' && row ? { ...row } : row))
        : String(value)
    }
    setValues(next)
    setFieldErrors({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, loading, activeKey])

  // Clear the success banner when moving between sections
  useEffect(() => {
    setSuccess('')
    setConfirmDelete(null)
  }, [activeKey])

  const openCreate = () => {
    setValues(emptyRecord(type))
    setFieldErrors({})
    setEditing({})
  }

  const openEdit = (record) => {
    const next = emptyRecord(type)
    for (const key of Object.keys(next)) {
      const value = record[key]
      if (value === undefined || value === null) continue
      // Repeatable fields stay arrays; everything else is edited as text
      next[key] = Array.isArray(value) ? value.map((row) => ({ ...row })) : String(value)
    }
    setValues(next)
    setFieldErrors({})
    setEditing(record)
  }

  const closeDrawer = () => {
    setEditing(null)
    setFieldErrors({})
  }

  // Singleton: PUT onto the existing document, or POST the first one.
  // Only the fields in the schema are sent, so keys this page does not manage
  // are preserved by the store's merge-update.
  const saveSingleton = async (e) => {
    e.preventDefault()
    const errors = validateRecord(type, values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    const payload = toPayload(type, values)
    const existing = records[0]
    setSaving(true)
    setError('')
    try {
      if (existing?.id) {
        await apiClient.put(`/${type.key}/${existing.id}`, payload)
      } else {
        await apiClient.post(`/${type.key}`, payload)
      }
      setSuccess('Changes saved.')
      await load(type.key)
    } catch (err) {
      if (isUnauthorized(err)) return handleAuthFailure()
      setError(describe(err, 'Could not save. Please try again.'))
    } finally {
      setSaving(false)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    const errors = validateRecord(type, values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    const payload = toPayload(type, values)
    const isEdit = Boolean(editing?.id)
    setSaving(true)
    setError('')
    try {
      if (isEdit) {
        await apiClient.put(`/${type.key}/${editing.id}`, payload)
      } else {
        await apiClient.post(`/${type.key}`, payload)
      }
      closeDrawer()
      setSuccess(isEdit ? 'Changes saved.' : 'New entry added.')
      await load(type.key)
    } catch (err) {
      if (isUnauthorized(err)) return handleAuthFailure()
      setError(describe(err, 'Could not save. Please try again.'))
    } finally {
      setSaving(false)
    }
  }

  const remove = async (record) => {
    setError('')
    try {
      await apiClient.delete(`/${type.key}/${record.id}`)
      setConfirmDelete(null)
      setSuccess('Entry deleted.')
      await load(type.key)
    } catch (err) {
      if (isUnauthorized(err)) return handleAuthFailure()
      setError(describe(err, 'Could not delete this entry.'))
    }
  }

  const cellValue = (record, column) => {
    const value = record[column.field]
    if (value === undefined || value === null || value === '') {
      return <span className="cms-empty">—</span>
    }
    if (column.badge) return <span className="badge">{value}</span>
    if (column.truncate) {
      return (
        <a href={value} target="_blank" rel="noreferrer" className="cms-url">
          {String(value).replace(/^https?:\/\//, '').slice(0, 38)}
          {String(value).length > 45 ? '…' : ''}
        </a>
      )
    }
    return String(value)
  }

  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <div className="cms-head">
          <div>
            <h1 style={{ marginBottom: 6 }}>Content Management</h1>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Add, edit and remove the content shown on the public site.
            </p>
          </div>
          {!type.singleton && (
            <button className="btn btn-primary" onClick={openCreate}>
              <Icon name="Plus" size={16} /> Add new
            </button>
          )}
        </div>

        <div className="cms-layout">
          <nav className="cms-nav" aria-label="Content sections">
            {CONTENT_TYPES.map((t) => (
              <button
                key={t.key}
                className={t.key === activeKey ? 'cms-nav-item active' : 'cms-nav-item'}
                onClick={() => setActiveKey(t.key)}
                aria-current={t.key === activeKey ? 'page' : undefined}
              >
                <Icon name={t.icon} size={16} />
                <span>{t.label}</span>
              </button>
            ))}
          </nav>

          <div className="cms-panel">
            <div className="cms-panel-head">
              <h2>{type.label}</h2>
              <Link to={type.publicPath} target="_blank" rel="noreferrer" className="cms-view-link">
                View public page ↗
              </Link>
            </div>

            {type.fileNote && (
              <div className="alert cms-note">
                <Icon name="Info" size={15} />
                <span>
                  File uploads are not available yet — paste a link to an externally hosted
                  file or image for now.
                </span>
              </div>
            )}

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
              <div className="cms-state">Loading {type.label.toLowerCase()}…</div>
            ) : type.singleton ? (
              <form className="cms-singleton" onSubmit={saveSingleton}>
                <div className="form-grid">
                  {type.fields.map((field) => (
                    <div
                      className={field.full ? 'form-field full' : 'form-field'}
                      key={field.name}
                    >
                      <label htmlFor={`f-${field.name}`}>{field.label}</label>
                      <FieldInput
                        field={field}
                        id={`f-${field.name}`}
                        value={values[field.name]}
                        onChange={(v) => setValues({ ...values, [field.name]: v })}
                      />
                      {fieldErrors[field.name] ? (
                        <p className="cms-field-error">{fieldErrors[field.name]}</p>
                      ) : field.hint ? (
                        <p className="cms-hint">{field.hint}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="cms-singleton-actions">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving…' : 'Save changes'}
                  </button>
                </div>
              </form>
            ) : records.length === 0 && !error ? (
              <div className="cms-state">
                <p style={{ marginBottom: 14 }}>Nothing here yet.</p>
                <button className="btn btn-outline" onClick={openCreate}>
                  Add the first entry
                </button>
              </div>
            ) : records.length > 0 ? (
              <div className="table-wrap">
                <table className="cms-table">
                  <thead>
                    <tr>
                      {type.columns.map((c) => (
                        <th key={c.field}>{c.label}</th>
                      ))}
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id}>
                        {type.columns.map((c) => (
                          <td key={c.field} className={c.primary ? 'cms-primary-cell' : undefined}>
                            {cellValue(record, c)}
                          </td>
                        ))}
                        <td>
                          {confirmDelete === record.id ? (
                            <div className="cms-confirm">
                              <span>Delete this?</span>
                              <button className="cms-btn danger" onClick={() => remove(record)}>
                                Yes, delete
                              </button>
                              <button className="cms-btn" onClick={() => setConfirmDelete(null)}>
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="cms-actions">
                              <button className="cms-btn" onClick={() => openEdit(record)}>
                                <Icon name="Pencil" size={14} /> Edit
                              </button>
                              <button
                                className="cms-btn danger"
                                onClick={() => setConfirmDelete(record.id)}
                              >
                                <Icon name="Trash2" size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {editing && (
        <>
          <div className="cms-overlay" onClick={closeDrawer} />
          <aside className="cms-drawer" role="dialog" aria-label={`${type.label} editor`}>
            <div className="cms-drawer-head">
              <h2>{editing.id ? `Edit ${type.label}` : `New ${type.label} entry`}</h2>
              <button className="cms-close" onClick={closeDrawer} aria-label="Close editor">
                <Icon name="X" size={18} />
              </button>
            </div>

            <form className="cms-form" onSubmit={save}>
              <div className="form-grid">
                {type.fields.map((field) => (
                  <div
                    className={field.full ? 'form-field full' : 'form-field'}
                    key={field.name}
                  >
                    <label htmlFor={`f-${field.name}`}>
                      {field.label}
                      {field.required && <span className="cms-req"> *</span>}
                    </label>

                    <FieldInput
                      field={field}
                      id={`f-${field.name}`}
                      value={values[field.name]}
                      onChange={(v) => setValues({ ...values, [field.name]: v })}
                    />

                    {fieldErrors[field.name] ? (
                      <p className="cms-field-error">{fieldErrors[field.name]}</p>
                    ) : field.hint ? (
                      <p className="cms-hint">{field.hint}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="cms-drawer-actions">
                <button type="button" className="btn btn-outline" onClick={closeDrawer}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing.id ? 'Save changes' : 'Create entry'}
                </button>
              </div>
            </form>
          </aside>
        </>
      )}
    </div>
  )
}
