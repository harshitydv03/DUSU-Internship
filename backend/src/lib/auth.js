// Zero-dependency auth: HMAC-signed tokens (JWT-style) + scrypt password
// hashing, all from node:crypto. Set JWT_SECRET and ADMIN_PASSWORD in
// production — defaults below are for local development only.
import crypto from 'node:crypto'
import { Router } from 'express'
import { db } from '../config/db.js'

const SECRET = process.env.JWT_SECRET || 'dusu-dev-secret-change-in-production'
const TOKEN_HOURS = 12

const hmac = (s) => crypto.createHmac('sha256', SECRET).update(s).digest('base64url')

export const sign = (payload) => {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + TOKEN_HOURS * 3600_000 }),
  ).toString('base64url')
  return `${body}.${hmac(body)}`
}

export const verify = (token) => {
  try {
    const [body, sig] = String(token).split('.')
    const expected = hmac(body)
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    return payload.exp > Date.now() ? payload : null
  } catch {
    return null
  }
}

export function requireAuth(req, res, next) {
  const user = verify((req.headers.authorization || '').replace('Bearer ', ''))
  if (!user) return res.status(401).json({ error: 'Login required' })
  req.user = user
  next()
}

const hashPassword = (pw) => {
  const salt = crypto.randomBytes(16).toString('hex')
  return `${salt}:${crypto.scryptSync(pw, salt, 32).toString('hex')}`
}

const checkPassword = (pw, stored) => {
  const [salt, hash] = stored.split(':')
  return crypto.timingSafeEqual(
    Buffer.from(hash, 'hex'),
    crypto.scryptSync(pw, salt, 32),
  )
}

// Admins live outside RESOURCES on purpose — no public CRUD API for them.
db.exec(`CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin'
)`)
if (db.prepare('SELECT COUNT(*) AS n FROM admins').get().n === 0) {
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(
    process.env.ADMIN_USER || 'admin',
    hashPassword(process.env.ADMIN_PASSWORD || 'dusu@2026'),
  )
}

export const authRouter = Router()

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  if (!admin || !checkPassword(String(password ?? ''), admin.password)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }
  res.json({ token: sign({ username: admin.username, role: admin.role }), username: admin.username })
})
