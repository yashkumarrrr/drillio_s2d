import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Pricing — Step2Dev ARIA' }

export default function PricingPage() {
  const plans = [
    { name:'Free', price:'$0', period:'forever', desc:'Perfect for trying ARIA and occasional debugging.', cta:'Start Free', href:'/auth/register', featured:false,
      features:['20 messages per day','All 4 modes (Chat, Error, Server, Repo)','3 servers connected','3 repo scans per day','4-week memory system'] },
    { name:'Pro', price:'$10', period:'/month', desc:'For developers who use ARIA daily and need no limits.', cta:'Start Pro →', href:'/auth/register?plan=pro', featured:true,
      features:['Unlimited messages','All 4 modes — no restrictions','10 servers connected','Unlimited repo scans','Full 4-week memory','Priority response speed','Cancel anytime'] },
    { name:'Team', price:'$39', period:'/month', desc:'For engineering teams that need shared context.', cta:'Contact Us', href:'mailto:yash@step2dev.com?subject=Team Plan', featured:false,
      features:['Everything in Pro','5 team seats','50 servers connected','Shared memory across team','Team conversation history','Priority support'] },
  ]

  const compare = [
    ['Feature','Free','Pro','Team'],
    ['Daily messages','20','Unlimited','Unlimited'],
    ['Error Analyzer','✓','✓','✓'],
    ['Server Analyzer','✓','✓','✓'],
    ['Repo Analyzer','3/day','Unlimited','Unlimited'],
    ['ARIA Chat','✓','✓','✓'],
    ['4-week memory','✓','✓','✓'],
    ['Servers','3','10','50'],
    ['Team seats','—','1','5'],
    ['Shared memory','—','—','✓'],
  ]

  const faq = [
    ['Can I cancel anytime?','Yes. Cancel in one click. Your access continues until the end of the billing period. No penalty.'],
    ['Is there a refund?','Full refund within 14 days of first payment. Email yash@step2dev.com and we process it same day.'],
    ['What if I hit the free limit?','Messages stop until midnight UTC. Upgrade to Pro at any point for unlimited access immediately.'],
    ['Do you store my error data?','Your conversation history powers the 4-week memory. Never sold or shared. Delete everything by deleting your account.'],
  ]

  return (
    <PageLayout tag="Pricing" title="Simple, honest pricing" subtitle="No hidden fees. No feature gating. Cancel anytime.">
      {/* Plan cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
        {plans.map(plan=>(
          <div key={plan.name} style={{padding:'24px 20px',borderRadius:16,border:plan.featured?'2px solid #614a44':'1px solid rgba(97,74,68,.2)',background:plan.featured?'#1a1615':'#fff',position:'relative'}}>
            {plan.featured && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#614a44',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 14px',borderRadius:100,whiteSpace:'nowrap',fontFamily:'monospace'}}>MOST POPULAR</div>}
            <div style={{fontSize:12,fontWeight:700,color:plan.featured?'rgba(255,255,255,.5)':'#9e9896',marginBottom:6,fontFamily:'monospace',letterSpacing:'.06em',textTransform:'uppercase'}}>{plan.name}</div>
            <div style={{marginBottom:8}}>
              <span style={{fontSize:36,fontWeight:600,color:plan.featured?'#fff':'#1a1615',letterSpacing:'-.05em'}}>{plan.price}</span>
              <span style={{fontSize:13,color:plan.featured?'rgba(255,255,255,.4)':'#9e9896',marginLeft:3}}>{plan.period}</span>
            </div>
            <p style={{fontSize:12,color:plan.featured?'rgba(255,255,255,.6)':'#757170',marginBottom:18,lineHeight:1.5}}>{plan.desc}</p>
            <a href={plan.href} style={{display:'block',textAlign:'center',padding:'10px',borderRadius:100,fontSize:13,fontWeight:700,textDecoration:'none',marginBottom:18,background:plan.featured?'#fff':'#1a1615',color:plan.featured?'#1a1615':'#fff'}}>
              {plan.cta}
            </a>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {plan.features.map(f=>(
                <div key={f} style={{display:'flex',gap:8,fontSize:12,color:plan.featured?'rgba(255,255,255,.7)':'#453f3d',alignItems:'flex-start'}}>
                  <span style={{color:plan.featured?'rgba(255,255,255,.7)':'#0ea158',fontWeight:700,flexShrink:0}}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <h2 style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:14,letterSpacing:'-.02em'}}>Full comparison</h2>
      <div style={{borderRadius:12,border:'1px solid rgba(97,74,68,.15)',overflow:'hidden',marginBottom:40}}>
        {compare.map((row,i)=>(
          <div key={row[0]} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',background:i===0?'#f4f1ee':i%2===0?'#fff':'#f9f8f8',borderBottom:i<compare.length-1?'1px solid rgba(97,74,68,.1)':'none'}}>
            {row.map((cell,j)=>(
              <div key={j} style={{padding:'10px 16px',fontSize:i===0?10:13,fontWeight:i===0||j===0?600:400,color:cell==='✓'?'#0ea158':cell==='—'?'#9e9896':i===0?'#614a44':'#453f3d',textAlign:j===0?'left':'center',textTransform:i===0?'uppercase':'none',letterSpacing:i===0?'.05em':0,fontFamily:i===0?'monospace':'inherit'}}>{cell}</div>
            ))}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:18,letterSpacing:'-.02em'}}>Common questions</h2>
      {faq.map(([q,a])=>(
        <div key={q} style={{marginBottom:18,paddingBottom:18,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
          <div style={{fontSize:14,fontWeight:600,color:'#1a1615',marginBottom:7}}>{q}</div>
          <div style={{fontSize:13,color:'#614a44',lineHeight:1.7}}>{a}</div>
        </div>
      ))}
    </PageLayout>
  )
}
