// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { sanitizeEmail, checkIPRateLimit, getIP, safeError } from '@/lib/security'

const COOKIE = 'step2dev_auth'
function setCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' })
  return res
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req)
    if (!checkIPRateLimit(ip, 'login', 10, 15 * 60 * 1000))
      return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
    const body = await req.json()
    const email = sanitizeEmail(body.email)
    if (!email) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      await new Promise(r => setTimeout(r, 200 + Math.random() * 100))
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 })
    }
    if (process.env.RESEND_API_KEY && !user.emailVerified)
      return NextResponse.json({ error: 'Please verify your email first. Check your inbox.', needsVerification: true }, { status: 403 })
    const sessionToken = randomBytes(32).toString('hex')
    await prisma.session.create({ data: { userId: user.id, token: sessionToken, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    const jwt = await signToken({ userId: user.id, sessionToken })
    return setCookie(NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan } }), jwt)
  } catch (err) { console.error('[login]', err); return NextResponse.json({ error: safeError(err) }, { status: 500 }) }
}
