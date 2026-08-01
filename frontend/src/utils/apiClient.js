// Thin fetch wrapper for the DUSU backend API.
// Sends the stored admin token on every request, so authenticated admin pages
// need no extra wiring.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const TOKEN_KEY = 'dusu_admin_token'
export const USER_KEY = 'dusu_admin_user'

// Thrown for every non-2xx response so callers can branch on `status`
// (particularly 401) without repeating fetch/parsing logic in each page.
export class ApiError extends Error {
  constructor(status, message, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }

  get isUnauthorized() {
    return this.status === 401
  }
}

export const isUnauthorized = (err) => err instanceof ApiError && err.status === 401

// Drop the admin session. Call before redirecting to /admin/login.
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY)

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    })
  } catch (networkErr) {
    // status 0 == request never reached the server (backend down, CORS, offline)
    throw new ApiError(0, `Could not reach the API: ${networkErr.message}`)
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let body = text
    try {
      body = text ? JSON.parse(text) : ''
    } catch {
      // response was not JSON — keep the raw text
    }
    // The backend reports validation failures as { error: '...' }
    const message = body?.error || text || res.statusText
    throw new ApiError(res.status, message, body)
  }

  return res.status === 204 ? null : res.json()
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}

export default apiClient
