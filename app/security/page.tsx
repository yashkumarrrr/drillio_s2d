import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Security — Step2Dev' }

export default function SecurityPage() {
  const items = [
    ['Authentication','Passwordless — no passwords to steal. Signed JWT tokens with 30-day expiry in HTTP-only cookies. Sessions tracked server-side and revocable instantly.'],
    ['Data in transit','All traffic TLS 1.2+ with HSTS preloading. Connections to database and AI providers encrypted. No unencrypted connections in production.'],
    ['Data at rest','PostgreSQL on Neon — AES-256 encryption at rest. Backups encrypted and retained for 7 days.'],
    ['Server agent','Agent pushes metrics only: CPU, RAM, disk, uptime. No files, logs, commands, or credentials. Authenticates with a per-server 64-character hex token. Full source code readable before installing.'],
    ['Payments','Card details never touch our servers. Processed by Dodo Payments, a PCI-DSS compliant Merchant of Record.'],
    ['Vulnerability disclosure',"Found something? Email yash@step2dev.com with \"Security\" in subject. We respond within 24 hours and don't pursue legal action against good-faith researchers."],
  ]
  return (
    <PageLayout tag="Security" title="Security at Step2Dev" subtitle="How we protect your data and what you should know.">
      {items.map(([title,body])=>(
        <div key={title} style={{marginBottom:24,paddingBottom:24,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
          <h2 style={{fontSize:15,fontWeight:600,color:'#1a1615',marginBottom:8,letterSpacing:'-.02em'}}>{title}</h2>
          <p style={{fontSize:14,color:'#614a44',lineHeight:1.75}}>{body}</p>
        </div>
      ))}
      <div style={{padding:'14px 18px',background:'rgba(97,74,68,.06)',borderRadius:10,border:'1px solid rgba(97,74,68,.12)'}}>
        <div style={{fontSize:12,fontWeight:700,color:'#614a44',marginBottom:4,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.04em'}}>Report a vulnerability</div>
        <div style={{fontSize:13,color:'#614a44'}}><a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>yash@step2dev.com</a> — we respond within 24 hours.</div>
      </div>
    </PageLayout>
  )
}
