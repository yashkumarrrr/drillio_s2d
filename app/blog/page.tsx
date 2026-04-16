import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Blog — Step2Dev' }

const posts = [
  { title:'Why a DevOps AI without memory is useless', date:'April 2025', time:'4 min', summary:"ChatGPT gives you a different answer every session. Here's why persistent context is the entire difference between a useful DevOps tool and a toy." },
  { title:'Building ARIA in public: month 1', date:'March 2025', time:'6 min', summary:'What I built, what broke, what I learned, and the first users who told me the advice was wrong. Real numbers, honest lessons.' },
  { title:'The 15 DevOps errors that waste the most developer hours', date:'February 2025', time:'8 min', summary:"ECONNREFUSED, OOM kills, 502 Bad Gateway, SSL cert failures — and the patterns behind why they're so hard to debug without context." },
]

export default function BlogPage() {
  return (
    <PageLayout tag="Blog" title="From the team" subtitle="DevOps insights and building-in-public updates from Step2Dev.">
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {posts.map(p=>(
          <div key={p.title} style={{padding:'22px 24px',background:'#fff',border:'1px solid rgba(97,74,68,.15)',borderRadius:14}}>
            <div style={{fontSize:11,color:'#9e9896',marginBottom:8,fontFamily:'monospace'}}>{p.date} · {p.time} read</div>
            <h2 style={{fontSize:17,fontWeight:600,color:'#1a1615',marginBottom:9,letterSpacing:'-.02em'}}>{p.title}</h2>
            <p style={{fontSize:13,color:'#614a44',lineHeight:1.65,marginBottom:14}}>{p.summary}</p>
            <span style={{fontSize:12,color:'#614a44',fontWeight:600}}>Coming soon →</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:28,padding:'20px 24px',background:'rgba(97,74,68,.06)',borderRadius:12,border:'1px solid rgba(97,74,68,.12)',textAlign:'center'}}>
        <div style={{fontSize:13,color:'#614a44',marginBottom:12}}>Get notified when posts go live</div>
        <a href="https://x.com/im__yash12" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',padding:'9px 22px',borderRadius:100,fontSize:13,fontWeight:700,color:'#fff',textDecoration:'none',background:'#1a1615'}}>Follow on X →</a>
      </div>
    </PageLayout>
  )
}
