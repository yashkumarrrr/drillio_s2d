// app/api/payments/webhook/route.ts
export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'standardwebhooks'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const wh = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_SECRET!)
    await wh.verify(rawBody, {
      'webhook-id':        req.headers.get('webhook-id') || '',
      'webhook-signature': req.headers.get('webhook-signature') || '',
      'webhook-timestamp': req.headers.get('webhook-timestamp') || '',
    })
    const payload = JSON.parse(rawBody)
    const custId = payload.data?.customer?.customer_id
    if (!custId) return NextResponse.json({ received: true })
    switch (payload.type) {
      case 'subscription.active':
      case 'subscription.renewed':
        await prisma.user.updateMany({ where: { dodoCustomerId: custId }, data: { plan: 'pro', dodoSubId: payload.data.subscription_id } })
        break
      case 'subscription.cancelled':
      case 'subscription.expired':
      case 'subscription.on_hold':
        await prisma.user.updateMany({ where: { dodoCustomerId: custId }, data: { plan: 'free', dodoSubId: null } })
        break
    }
    return NextResponse.json({ received: true })
  } catch (err) { console.error('[webhook]', err); return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 }) }
}
