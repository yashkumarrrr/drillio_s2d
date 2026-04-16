// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export interface SafeUser {
  id: string; name: string; email: string; plan: string
  avatar: string | null; dodoCustomerId: string | null; dodoSubId: string | null; createdAt: Date
}

const COOKIE = 'step2dev_auth'

export function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32-chars')
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('30d').sign(getSecret())
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try { const { payload } = await jwtVerify(token, getSecret()); return payload as Record<string, unknown> } catch { return null }
}

export function setAuthCookie(token: string): void {
  cookies().set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' })
}

export function clearAuthCookie(): void {
  cookies().set(COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 0, path: '/' })
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const token = cookies().get(COOKIE)?.value
    if (!token) return null
    const payload = await verifyToken(token)
    if (!payload || typeof payload.userId !== 'string') return null
    return await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, plan: true, avatar: true, dodoCustomerId: true, dodoSubId: true, createdAt: true },
    })
  } catch { return null }
}

export async function requireAuth(): Promise<SafeUser> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function getTokenFromRequest(req: NextRequest): Promise<string | null> {
  return req.cookies.get(COOKIE)?.value ?? null
}
