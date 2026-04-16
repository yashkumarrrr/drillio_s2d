// app/api/auth/verify/route.ts
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'

const COOKIE = 'step2dev_auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    if (!token) return NextResponse.redirect(new URL('/auth/login?error=invalid-token', req.url))
    const user = await prisma.user.findFirst({ where: { verifyToken: token, verifyTokenExp: { gt: new Date() }, emailVerified: false } })
    if (!user) return NextResponse.redirect(new URL('/auth/login?error=expired-token', req.url))
    await prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, verifyToken: null, verifyTokenExp: null } })
    const sessionToken = randomBytes(32).toString('hex')
    await prisma.session.create({ data: { userId: user.id, token: sessionToken, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })
    const jwt = await signToken({ userId: user.id, sessionToken })
    sendWelcomeEmail(user.email, user.name).catch(() => {})
    const res = NextResponse.redirect(new URL('/dashboard/aria?welcome=1', req.url))
    res.cookies.set(COOKIE, jwt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' })
    return res
  } catch (err) { console.error('[verify]', err); return NextResponse.redirect(new URL('/auth/login?error=verify-failed', req.url)) }
}
