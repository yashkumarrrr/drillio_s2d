// app/api/payments/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    const dodo = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
    })
    let customerId = user.dodoCustomerId
    if (!customerId) {
      const customer = await dodo.customers.create({ email: user.email, name: user.name })
      customerId = customer.customer_id
      await prisma.user.update({ where: { id: user.id }, data: { dodoCustomerId: customerId } })
    }
    const subscription = await dodo.subscriptions.create({
      billing: { country: 'IN', city: 'City', state: 'State', street: '123 Street', zipcode: '000000' },
      customer: { customer_id: customerId },
      product_id: process.env.DODO_PRO_PLAN_ID!,
      quantity: 1,
      payment_link: true,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/aria?upgraded=true`,
    })
    const url = (subscription as any).payment_link
    if (!url) throw new Error('No payment link returned from Dodo')
    return NextResponse.json({ url })
  } catch (err: any) {
    console.error('[checkout]', err?.message || err)
    if (err?.message === 'Unauthorized') return NextResponse.json({ error: 'Please log in first' }, { status: 401 })
    return NextResponse.json({ error: err?.message || 'Failed to create checkout. Check DODO_PAYMENTS_API_KEY and DODO_PRO_PLAN_ID.' }, { status: 500 })
  }
}
