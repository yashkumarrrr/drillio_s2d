import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Roadmap — Step2Dev' }

const PHASES = [
  { phase:'Now — shipping', status:'active', color:'#0ea158', bg:'rgba(14,161,88,.1)', items:['Framer-inspired UI redesign live','Dodo Payments Pro subscription','All essential pages (about, pricing, legal)','Improved error classification accuracy'] },
  { phase:'Next — in progress', status:'building', color:'#156cc2', bg:'rgba(21,108,194,.1)', items:['SSH execution — ARIA runs commands directly on server','Alert system — notify when metrics cross thresholds','Slack integration — ARIA in your workspace','Private GitHub repo support with token'] },
  { phase:'Later — planned', status:'planned', color:'#cf8d13', bg:'rgba(207,141,19,.1)', items:['CI/CD pipeline generator from conversation','Infrastructure as Code (Terraform, Ansible)','API access for programmatic error analysis','Mobile app for on-the-go incidents'] },
  { phase:'Exploring', status:'idea', color:'#9e9896', bg:'rgba(97,74,68,.07)', items:['Multi-server comparison and cross-server diagnosis','Historical metric trends with anomaly detection','Custom ARIA trained on your specific stack'] },
]

export default function RoadmapPage() {
  return (
    <PageLayout tag="Roadmap" title="Where we're going" subtitle="What's shipping now, what's next, and what we're thinking about.">
      <div style={{marginBottom:22,padding:'12px 18px',background:'rgba(97,74,68,.06)',borderRadius:10,border:'1px solid rgba(97,74,68,.12)',fontSize:13,color:'#614a44'}}>
        Roadmap shaped by user feedback. Want something moved up?{' '}
        <a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>Email me</a> or{' '}
        <a href="https://x.com/im__yash12" style={{color:'#614a44',fontWeight:600}} target="_blank" rel="noopener noreferrer">DM on X</a>.
      </div>
      {PHASES.map((p,i)=>(
        <div key={p.phase} style={{marginBottom:32}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
            <span style={{fontSize:16,fontWeight:600,color:'#1a1615'}}>{p.phase}</span>
            <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:100,background:p.bg,color:p.color,fontFamily:'monospace',letterSpacing:'.04em'}}>{p.status.toUpperCase()}</span>
          </div>
          <div style={{borderLeft:`2px solid ${p.color}`,paddingLeft:18,display:'flex',flexDirection:'column',gap:10}}>
            {p.items.map(item=>(
              <div key={item} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
                <span style={{color:p.color,fontSize:9,flexShrink:0,marginTop:5}}>●</span>
                <span style={{fontSize:14,color:'#453f3d',lineHeight:1.6}}>{item}</span>
              </div>
            ))}
          </div>
          {i<PHASES.length-1&&<div style={{height:1,background:'rgba(97,74,68,.1)',marginTop:28}}/>}
        </div>
      ))}
    </PageLayout>
  )
}
