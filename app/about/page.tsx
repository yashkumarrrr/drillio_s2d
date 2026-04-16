import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'About — Step2Dev' }

const S = ({title,children}:{title:string;children:React.ReactNode}) => (
  <div style={{marginBottom:30,paddingBottom:30,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
    <h2 style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:10,letterSpacing:'-.02em'}}>{title}</h2>
    <div style={{display:'flex',flexDirection:'column',gap:10,fontSize:14,color:'#614a44',lineHeight:1.8}}>{children}</div>
  </div>
)

export default function AboutPage() {
  return (
    <PageLayout tag="About" title="Built by a developer, for developers" subtitle="The story behind ARIA and why we built a senior DevOps engineer that never sleeps.">
      <S title="Why we built this">
        <p>Every developer has had that 3 AM moment. Production is down. The error is cryptic. Google returns the same unhelpful Stack Overflow threads. The senior engineer who would diagnose it in 30 seconds is asleep.</p>
        <p>We built ARIA because that situation is absurd. The knowledge to fix 95% of production incidents already exists — it just isn&apos;t available on-demand to every developer who needs it.</p>
        <p>ARIA is that knowledge, available 24/7, with the specific detail that matters: exact commands, root causes, permanent fixes. Not generic advice. The actual answer.</p>
      </S>
      <S title="What makes ARIA different">
        <p>Most AI tools forget you when you close the tab. ARIA remembers your infrastructure for 4 weeks. The longer you use it, the more specific the advice gets.</p>
        <p>Every response follows a fixed format: what happened, why, the exact fix command, verify step, and how to prevent it. No prose. No hedging. Just the answer.</p>
      </S>
      <S title="Mission">
        <p>Make senior DevOps expertise available to every developer, at every stage, at any hour. A solo developer with ARIA should run production with the confidence of a team with a dedicated SRE.</p>
      </S>
      <div style={{padding:'22px 24px',background:'#fff',borderRadius:13,border:'1px solid rgba(97,74,68,.15)'}}>
        <div style={{fontSize:11,color:'#9e9896',marginBottom:4,fontFamily:'monospace',letterSpacing:'.04em',textTransform:'uppercase'}}>Founder</div>
        <div style={{fontSize:17,fontWeight:600,color:'#1a1615',marginBottom:4}}>Yash Kumar</div>
        <div style={{fontSize:13,color:'#614a44'}}>Building Step2Dev · <a href="https://x.com/im__yash12" target="_blank" rel="noopener noreferrer" style={{color:'#614a44',fontWeight:600}}>@im__yash12</a></div>
      </div>
    </PageLayout>
  )
}
