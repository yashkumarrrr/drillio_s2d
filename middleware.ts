// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32-chars')
}

const SEC: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
}

function addHeaders(res: NextResponse): NextResponse {
  Object.entries(SEC).forEach(([k, v]) => res.headers.set(k, v))
  if (process.env.NODE_ENV === 'production')
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  return res
}

function isSuspicious(req: NextRequest): boolean {
  const ua = (req.headers.get('user-agent') || '').toLowerCase()
  if (['sqlmap','nikto','masscan','dirbuster','hydra','metasploit','zgrab'].some(s => ua.includes(s))) return true
  const p = req.nextUrl.pathname
  if (p.includes('../') || p.includes('%2e%2e') || p.includes('%00')) return true
  if (p.includes('wp-admin') || p.includes('.php') || p.includes('/.env')) return true
  if (p.includes('<script') || p.includes('javascript:')) return true
  return false
}

const PUBLIC = [
  '/api/auth/login','/api/auth/register','/api/auth/verify',
  '/api/payments/webhook','/api/auth/resend',
  '/auth/','/home','/',
  '/about','/blog','/careers','/contact',
  '/privacy','/terms','/cookies','/security',
  '/changelog','/roadmap','/features','/pricing',
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (isSuspicious(req)) return addHeaders(new NextResponse('Forbidden', { status: 403 }))
  if (pathname.startsWith('/_next') || pathname.includes('.')) return addHeaders(NextResponse.next())
  if (pathname.startsWith('/api/agent/push')) return addHeaders(NextResponse.next())
  if (PUBLIC.some(r => pathname.startsWith(r))) return addHeaders(NextResponse.next())

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/')) {
    const token = req.cookies.get('step2dev_auth')?.value
    if (!token) {
      if (pathname.startsWith('/api/'))
        return addHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) as NextResponse)
      const login = new URL('/auth/login', req.url)
      login.searchParams.set('from', pathname)
      return addHeaders(NextResponse.redirect(login))
    }
    try {
      await jwtVerify(token, getSecret())
      return addHeaders(NextResponse.next())
    } catch {
      if (pathname.startsWith('/api/'))
        return addHeaders(NextResponse.json({ error: 'Session expired' }, { status: 401 }) as NextResponse)
      const res = NextResponse.redirect(new URL('/auth/login', req.url))
      res.cookies.set('step2dev_auth', '', { maxAge: 0, path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
      return addHeaders(res)
    }
  }
  return addHeaders(NextResponse.next())
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'] }
