import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Careers — Step2Dev' }

export default function CareersPage() {
  const items = [
    ['Advisors & early feedback', "Senior DevOps engineer or SRE? I want 30 minutes of your time to test ARIA and give brutal feedback. In return: free Pro for life and your name in the product."],
    ['Technical contributors', "Found something broken or missing and want to fix it? Reach out. Open to specific contributions from people who understand the problem space."],
    ['Future roles', "When Step2Dev grows to need a team, first hires will deeply understand DevOps and know how to reach developers. If that's you — message me now. I'll remember."],
  ]
  return (
    <PageLayout tag="Careers" title="Work with us" subtitle="Step2Dev is currently a solo venture. Here's what that means for working together.">
      <div style={{marginBottom:28,padding:'20px 24px',background:'#fff',border:'1px solid rgba(97,74,68,.15)',borderRadius:13}}>
        <div style={{fontSize:11,color:'#9e9896',marginBottom:4,fontFamily:'monospace',letterSpacing:'.04em',textTransform:'uppercase'}}>Current status</div>
        <div style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:7}}>Bootstrapped · Solo founder · Early stage</div>
        <p style={{fontSize:13,color:'#614a44',lineHeight:1.7}}>Step2Dev is built and run by one person. We&apos;re not hiring traditionally — but there are ways to get involved.</p>
      </div>
      {items.map(([t,d])=>(
        <div key={t} style={{marginBottom:22,paddingBottom:22,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
          <h2 style={{fontSize:15,fontWeight:600,color:'#1a1615',marginBottom:8,letterSpacing:'-.02em'}}>{t}</h2>
          <p style={{fontSize:13,color:'#614a44',lineHeight:1.75}}>{d}</p>
        </div>
      ))}
      <div style={{textAlign:'center',paddingTop:8}}>
        <a href="mailto:yash@step2dev.com?subject=Working together" style={{display:'inline-block',padding:'11px 26px',borderRadius:100,fontSize:14,fontWeight:700,color:'#fff',textDecoration:'none',background:'#1a1615'}}>Get in touch →</a>
      </div>
    </PageLayout>
  )
}
