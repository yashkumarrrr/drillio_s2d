import PageLayout from '@/components/pages/PageLayout'
export const metadata = { title: 'Terms of Service — Step2Dev' }

const L = ({title,children}:{title:string;children:React.ReactNode}) => (
  <div style={{marginBottom:30,paddingBottom:30,borderBottom:'1px solid rgba(97,74,68,.1)'}}>
    <h2 style={{fontSize:16,fontWeight:600,color:'#1a1615',marginBottom:10,letterSpacing:'-.02em'}}>{title}</h2>
    <div style={{fontSize:14,color:'#614a44',lineHeight:1.8}}>{children}</div>
  </div>
)

export default function TermsPage() {
  return (
    <PageLayout tag="Legal" title="Terms of Service" subtitle="Last updated January 2025. Plain English, no traps.">
      <L title="Using Step2Dev"><p>You must be 13 or older. Use the service for lawful purposes only. You&apos;re responsible for your account security.</p></L>
      <L title="What ARIA can and can't do"><p>ARIA is an AI tool. Its responses may occasionally be incorrect. Always verify critical commands before running in production. Not a substitute for professional judgment on security-critical decisions.</p></L>
      <L title="Payments and refunds"><p>Pro plans billed monthly. Cancel anytime — access continues until end of billing period. Full refund within 14 days of first payment, no questions. Email <a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>yash@step2dev.com</a>.</p></L>
      <L title="Acceptable use"><p>Don&apos;t use Step2Dev to generate malicious code, attack systems you don&apos;t own, or do anything illegal. Violations result in immediate account termination.</p></L>
      <L title="Changes"><p>Material changes communicated by email before they take effect. Continued use means you accept the new terms.</p></L>
      <L title="Contact"><p><a href="mailto:yash@step2dev.com" style={{color:'#614a44',fontWeight:600}}>yash@step2dev.com</a></p></L>
    </PageLayout>
  )
}
