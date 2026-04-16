import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Changelog — Step2Dev' }

const CHANGES = [
  { v:'v1.2', date:'April 2025', tag:'Latest', items:[['new','Framer-inspired UI redesign — warm Open Runde design system'],['new','Dodo Payments Pro subscription integration'],['new','Upgrade modal with feature list + secure checkout'],['fix','Auth cookie now persists on page refresh'],['fix','Pro button on homepage now triggers correct checkout flow'],['new','10 essential pages: About, Features, Pricing, Privacy, Terms, etc']] },
  { v:'v1.1', date:'March 2025', tag:null, items:[['new','Real-time server monitoring via SSE — metrics every 5s'],['new','Server agent install script with systemd'],['new','Follow-up chat after every analysis'],['new','Usage bar in topbar shows messages used vs limit'],['fix','X-Frame-Options changed to SAMEORIGIN for homepage']] },
  { v:'v1.0', date:'February 2025', tag:null, items:[['new','ARIA — AI Senior DevOps Engineer with 4-week memory'],['new','Error Analyzer — 15+ error types auto-detected'],['new','Repo Analyzer — A-F security and CI/CD grading'],['new','Server Analyzer — live metrics + AI diagnosis'],['new','Passwordless auth — name + email only'],['new','Rate limiting — 20 messages/day free plan']] },
]

export default function ChangelogPage() {
  return (
    <PageLayout tag="Changelog" title="What's new" subtitle="Every update to Step2Dev and ARIA, newest first.">
      {CHANGES.map((r,i)=>(
        <div key={r.v} style={{marginBottom:40}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{fontFamily:'monospace',fontSize:15,fontWeight:700,color:'#1a1615'}}>{r.v}</span>
            {r.tag && <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:100,background:'rgba(97,74,68,.1)',color:'#614a44',fontFamily:'monospace'}}>{r.tag}</span>}
            <span style={{fontSize:12,color:'#9e9896'}}>{r.date}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {r.items.map(([type,text],j)=>(
              <div key={j} style={{display:'flex',alignItems:'flex-start',gap:9}}>
                <span style={{fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:5,flexShrink:0,marginTop:2,fontFamily:'monospace',background:type==='new'?'rgba(14,161,88,.1)':'rgba(207,141,19,.1)',color:type==='new'?'#0ea158':'#cf8d13'}}>{type.toUpperCase()}</span>
                <span style={{fontSize:13,color:'#453f3d',lineHeight:1.6}}>{text}</span>
              </div>
            ))}
          </div>
          {i<CHANGES.length-1&&<div style={{height:1,background:'rgba(97,74,68,.1)',marginTop:32}}/>}
        </div>
      ))}
    </PageLayout>
  )
}
