// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'
import { sanitizeEmail, sanitizeString, checkIPRateLimit, getIP, safeError, LIMITS } from '@/lib/security'

const COOKIE = 'step2dev_auth'
function setCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' })
  return res
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req)
    if (!checkIPRateLimit(ip, 'register', 5, 60 * 60 * 1000))
      return NextResponse.json({ error: 'Too many registrations. Try again in an hour.' }, { status: 429 })
    const body = await req.json()
    const name = sanitizeString(body.name, LIMITS.NAME_MAX)
    const email = sanitizeEmail(body.email)
    if (!name || name.length < 2) return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
    if (!email) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      if (!existing.emailVerified && process.env.RESEND_API_KEY) {
        const vt = randomBytes(32).toString('hex')
        await prisma.user.update({ where: { id: existing.id }, data: { verifyToken: vt, verifyTokenExp: new Date(Date.now() + 24 * 60 * 60 * 1000) } })
        await sendVerificationEmail(email, existing.name, vt)
        return NextResponse.json({ success: true, needsVerification: true })
      }
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }
    const vt = randomBytes(32).toString('hex')
    const emailV = !!process.env.RESEND_API_KEY
    const user = await prisma.user.create({
      data: { name, email, password: '', plan: 'free', emailVerified: !emailV, verifyToken: emailV ? vt : null, verifyTokenExp: emailV ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null },
    })
    if (emailV) { await sendVerificationEmail(email, name, vt); return NextResponse.json({ success: true, needsVerification: true }) }
    const sessionToken = randomBytes(32).toString('hex')
    await prisma.session.create({ data: { userId: user.id, token: sessionToken, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    const jwt = await signToken({ userId: user.id, sessionToken })
    return setCookie(NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan } }), jwt)
  } catch (err) { console.error('[register]', err); return NextResponse.json({ error: safeError(err) }, { status: 500 }) }
}
