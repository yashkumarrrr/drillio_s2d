import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Privacy Policy — Step2Dev' }

const L = ({title,children}:{title:string;children:React.ReactNode}) => (
  <div style={{marginBottom:30,paddingBottom:30,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
    <h2 style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:10,letterSpacing:'-.02em'}}>{title}</h2>
    <div style={{fontSize:14,color:'#614a44',lineHeight:1.8}}>{children}</div>
  </div>
)

export default function PrivacyPage() {
  return (
    <PageLayout tag="Legal" title="Privacy Policy" subtitle="Last updated January 2025. Simple and honest.">
      <L title="What we collect"><p>Name and email when you register. Errors and questions you paste to generate responses and build your 4-week memory. Server metrics only (CPU%, RAM%, disk%, uptime) when you connect a server — no files, logs, or credentials. Standard server logs retained 30 days.</p></L>
      <L title="What we don't do"><p>We don&apos;t sell your data. We don&apos;t share with advertisers. We don&apos;t train AI on your sessions without consent. We don&apos;t store payment cards — handled entirely by Dodo Payments.</p></L>
      <L title="How we use it"><p>To provide ARIA&apos;s responses and 4-week memory. To send transactional emails (verification, receipts). To improve the product based on aggregate usage patterns — never individual sessions.</p></L>
      <L title="Retention"><p>Account data retained until you delete your account. Conversation history kept for 4 weeks then summarised. Delete everything by emailing <a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>yash@step2dev.com</a>.</p></L>
      <L title="Cookies"><p>One cookie: the authentication token to keep you logged in for 30 days. No tracking cookies, no third-party advertising. See <a href="/cookies" style={{color:'#614a44',fontWeight:600}}>Cookie Policy</a>.</p></L>
      <L title="Contact"><p>Privacy questions: <a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>yash@step2dev.com</a>. Responded to within 48 hours.</p></L>
    </PageLayout>
  )
}
