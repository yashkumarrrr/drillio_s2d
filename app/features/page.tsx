import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Features — Step2Dev ARIA' }

const S = ({title,children}:{title:string;children:React.ReactNode}) => (
  <div style={{marginBottom:36,paddingBottom:36,borderBottom:'1px solid rgba(97,74,68,.12)'}}>
    <h2 style={{fontSize:17,fontWeight:600,color:'#1a1615',marginBottom:10,letterSpacing:'-.02em'}}>{title}</h2>
    <div style={{fontSize:14,color:'#453f3d',lineHeight:1.75}}>{children}</div>
  </div>
)

export default function FeaturesPage() {
  const features = [
    { icon:'🧠', title:'4-Week Memory', desc:'Tell ARIA your stack once — your OS, language, database, deployment setup — and it retains that for 4 weeks. After a month, advice stops being generic and starts being calibrated to exactly your infrastructure.', bullets:['Remembers your full stack','Links patterns across sessions','Past errors inform future fixes','Auto-summarizes every 10 messages','Grows more specific over time'] },
    { icon:'⚡', title:'Error Analyzer', desc:'Paste any error — raw, unformatted, messy. ARIA identifies the root cause and gives you the exact command to fix it. 15+ error types auto-detected including Node.js, Python, Docker, Nginx, PostgreSQL, SSL, OOM, and Kubernetes.', bullets:['Root cause in plain English','Exact fix command — copy and run','Verify step to confirm it worked','Prevention advice for next time','Auto-detects error type from raw trace'] },
    { icon:'🖥️', title:'Server Analyzer', desc:'Connect any Linux server with a single bash command. ARIA reads live CPU, RAM, and disk metrics and gives you a full health diagnosis with specific commands to fix what\'s wrong.', bullets:['Lightweight agent — one bash script','Live CPU / RAM / disk monitoring','AI diagnosis of what\'s actually wrong','Auto-refreshes every 15 seconds','Works with any Linux server or VPS'] },
    { icon:'📦', title:'Repo Analyzer', desc:'Drop any public GitHub repository URL. ARIA grades it A–F across security, CI/CD pipeline, Docker setup, dependency hygiene, and code quality. Every grade comes with specific actionable fixes.', bullets:['A–F grade per category','Security vulnerability detection','CI/CD pipeline review','Docker and container analysis','Dependency audit and update advice'] },
    { icon:'💬', title:'ARIA Chat', desc:'Ask anything DevOps. Linux commands, architecture decisions, deployment strategies, performance tuning. ARIA has 40 years of simulated senior DevOps experience and never gives a generic answer.', bullets:['Any DevOps topic — no limits','Specific to your stack, not generic','Follow-up questions stay in context','Reads your errors and server data','Continue after any analysis'] },
  ]

  return (
    <PageLayout tag="Features" title="Everything ARIA can do" subtitle="Four specialized modes, persistent memory, and real-time server monitoring — all in one tool.">
      {features.map(f => (
        <div key={f.title} style={{marginBottom:32,padding:'26px 28px',background:'#fff',border:'1px solid rgba(97,74,68,.15)',borderRadius:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:20}}>{f.icon}</span>
              <h2 style={{fontSize:17,fontWeight:600,color:'#1a1615',letterSpacing:'-.02em'}}>{f.title}</h2>
            </div>
            <p style={{fontSize:14,color:'#453f3d',lineHeight:1.75}}>{f.desc}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {f.bullets.map(b=>(
              <div key={b} style={{display:'flex',alignItems:'flex-start',gap:9}}>
                <span style={{color:'#0ea158',fontWeight:700,fontSize:12,flexShrink:0,marginTop:2}}>✓</span>
                <span style={{fontSize:13,color:'#453f3d',lineHeight:1.5}}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{marginTop:32,textAlign:'center',padding:'36px',background:'linear-gradient(135deg,rgba(159,195,230,.2),rgba(237,223,208,.3))',borderRadius:16,border:'1px solid rgba(97,74,68,.15)'}}>
        <h2 style={{fontSize:22,fontWeight:600,color:'#1a1615',marginBottom:10,letterSpacing:'-.03em'}}>Ready to try it?</h2>
        <p style={{fontSize:14,color:'#614a44',marginBottom:22}}>Free plan — 20 messages/day. No credit card.</p>
        <a href="/auth/register" style={{display:'inline-block',padding:'13px 28px',borderRadius:100,background:'#1a1615',color:'#fff',textDecoration:'none',fontSize:15,fontWeight:600}}>Start Free →</a>
      </div>
    </PageLayout>
  )
}
