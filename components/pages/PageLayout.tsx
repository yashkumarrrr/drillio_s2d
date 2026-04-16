// components/pages/PageLayout.tsx
'use client'
import { useEffect } from 'react'

interface Props { title: string; subtitle: string; tag: string; children: React.ReactNode }

export default function PageLayout({ title, subtitle, tag, children }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    return () => { document.body.style.overflow = ''; document.documentElement.style.overflow = '' }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f9f8f8', color: '#1a1615', fontFamily: "'Open Runde','Segoe UI',system-ui,sans-serif" }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(97,74,68,.12)', padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(249,248,248,.92)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', color: '#1a1615' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#1a1615', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>AI</div>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-.02em' }}>Step2Dev</span>
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/auth/login" style={{ padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 500, color: '#453f3d', textDecoration: 'none', border: '1px solid rgba(97,74,68,.2)', background: 'transparent', transition: 'all .15s' }}>Sign in</a>
          <a href="/auth/register" style={{ padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', background: '#1a1615', boxShadow: '0 2px 8px rgba(26,22,21,.2)' }}>Start Free →</a>
        </div>
      </nav>

      {/* Page header */}
      <div style={{ borderBottom: '1px solid rgba(97,74,68,.12)', padding: '60px 32px 48px', textAlign: 'center', background: 'linear-gradient(180deg,#9fc3e6 0%,#c8d8e9 50%,#eddfd0 100%)', backgroundSize: '100% 300px', backgroundRepeat: 'no-repeat', backgroundColor: '#f9f8f8' }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 100, marginBottom: 14, background: 'rgba(255,255,255,.4)', color: '#614a44', border: '1px solid rgba(97,74,68,.2)', fontFamily: 'monospace', letterSpacing: '.06em', textTransform: 'uppercase' }}>{tag}</div>
        <h1 style={{ fontFamily: "'Open Runde','Segoe UI',system-ui,sans-serif", fontSize: 'clamp(28px,4vw,46px)', fontWeight: 600, letterSpacing: '-.04em', marginBottom: 12, color: '#1a1615', lineHeight: 1.1 }}>{title}</h1>
        <p style={{ fontSize: 16, color: '#453f3d', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>{subtitle}</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '52px 28px 80px' }}>{children}</div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(97,74,68,.12)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#9e9896', background: '#f4f1ee' }}>
        <span>© 2025 Step2Dev. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['Privacy','/privacy'],['Terms','/terms'],['Contact','/contact']].map(([l,h]) => (
            <a key={h} href={h} style={{ color: '#9e9896', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
