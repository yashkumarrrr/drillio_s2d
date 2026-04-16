'use client'
import PageLayout from '@/components/pages/PageLayout'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const sub = encodeURIComponent('Message from ' + form.name)
    const body = encodeURIComponent(form.message + '\n\nFrom: ' + form.email)
    window.location.href = `mailto:yash@step2dev.com?subject=${sub}&body=${body}`
    setSent(true)
  }

  const card: React.CSSProperties = { background: '#fff', border: '1px solid rgba(97,74,68,.15)', borderRadius: 16, padding: '18px 20px', marginBottom: 10, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color .15s', color: 'inherit' }
  const inp: React.CSSProperties = { width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid rgba(97,74,68,.2)', borderRadius: 10, background: '#f9f8f8', fontFamily: 'inherit', color: '#1a1615', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#614a44', marginBottom: 6, fontFamily: 'monospace', letterSpacing: '.04em', textTransform: 'uppercase' }

  return (
    <PageLayout tag="Contact" title="Get in touch" subtitle="Questions, feedback, or bugs — I read and reply to everything personally.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1a1615', marginBottom: 16 }}>Contact options</h2>
          {[{icon:'✉️',label:'Email',val:'yashkumar@step2dev.com',href:'mailto:yashkumar@step2dev.com'},{icon:'𝕏',label:'Twitter / X',val:'@im__yash12',href:'https://x.com/im__yash12'}].map(c=>(
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={card}>
              <span style={{fontSize:20}}>{c.icon}</span>
              <div><div style={{fontSize:11,color:'#9e9896',marginBottom:2}}>{c.label}</div><div style={{fontSize:14,fontWeight:600,color:'#1a1615'}}>{c.val}</div></div>
            </a>
          ))}
          <div style={{marginTop:20,padding:'14px 18px',background:'rgba(97,74,68,.06)',borderRadius:12,border:'1px solid rgba(97,74,68,.12)',fontSize:13,color:'#614a44',lineHeight:1.6}}>
            Typically reply within a few hours. For urgent production issues — use ARIA directly, it&apos;s available 24/7.
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1a1615', marginBottom: 16 }}>Send a message</h2>
          {sent ? (
            <div style={{padding:24,background:'rgba(14,161,88,.07)',borderRadius:12,border:'1px solid rgba(14,161,88,.2)',textAlign:'center'}}>
              <div style={{fontSize:28,marginBottom:10}}>✓</div>
              <div style={{fontWeight:600,color:'#1a1615',marginBottom:6}}>Opening your email app…</div>
              <div style={{fontSize:13,color:'#757170'}}>Or email directly: yashkumar@step2dev.com</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
              {[{label:'Your name',key:'name',type:'text',ph:'Alex Johnson'},{label:'Email',key:'email',type:'email',ph:'you@company.com'}].map(f=>(
                <div key={f.key}>
                  <label style={lbl}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} required value={(form as any)[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={inp}/>
                </div>
              ))}
              <div>
                <label style={lbl}>Message</label>
                <textarea placeholder="What's on your mind?" required rows={4} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} style={{...inp,resize:'vertical'}}/>
              </div>
              <button type="submit" style={{padding:'12px',borderRadius:100,background:'#1a1615',color:'#fff',border:'none',fontWeight:600,fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
