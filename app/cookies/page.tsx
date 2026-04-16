import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Cookie Policy — Step2Dev' }

const L = ({title,children}:{title:string;children:React.ReactNode}) => (
  <div style={{marginBottom:30,paddingBottom:30,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
    <h2 style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:10,letterSpacing:'-.02em'}}>{title}</h2>
    <div style={{fontSize:14,color:'#614a44',lineHeight:1.8}}>{children}</div>
  </div>
)

export default function CookiesPage() {
  return (
    <PageLayout tag="Legal" title="Cookie Policy" subtitle="We use exactly one cookie. Here's everything about it.">
      <L title="The one cookie we set"><p><strong style={{color:'#1a1615'}}>step2dev_auth</strong> — a secure, HTTP-only authentication cookie that keeps you logged in for 30 days. It contains a signed JWT. It cannot be read by JavaScript (httpOnly flag) and is only sent over HTTPS in production (secure flag).</p></L>
      <L title="What we don't use"><p>No tracking cookies. No advertising cookies. No Google Analytics, Facebook Pixel, or any third-party tracking. We use server-side analytics only — aggregate data that never links to individual users.</p></L>
      <L title="Managing cookies"><p>Clear it by logging out of Step2Dev, or by clearing cookies in your browser settings. Clearing it logs you out.</p></L>
      <L title="Contact"><p><a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>yash@step2dev.com</a></p></L>
    </PageLayout>
  )
}
