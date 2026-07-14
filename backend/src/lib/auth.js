// Zero-dependency auth: HMAC-signed tokens (JWT-style) + scrypt password
// hashing, all from node:crypto. Set JWT_SECRET and ADMIN_PASSWORD in
// production — defaults below are for local development only.
import crypto from 'node:crypto'
import mongoose from 'mongoose'
import { Router } from 'express'

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
const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'admin' },
})
export const Admin = mongoose.model('Admin', adminSchema, 'admins')

// Called from connectDB() after the connection is established.
export async function seedAdmin() {
  const count = await Admin.countDocuments()
  if (count === 0) {
    await Admin.create({
      username: process.env.ADMIN_USER || 'admin',
      password: hashPassword(process.env.ADMIN_PASSWORD || 'dusu@2026'),
    })
    console.log('  seeded default admin account')
  }
}

export const authRouter = Router()

authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {}
    const admin = await Admin.findOne({ username })
    if (!admin || !checkPassword(String(password ?? ''), admin.password)) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    res.json({ token: sign({ username: admin.username, role: admin.role }), username: admin.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
