import {  NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../lib/stripe'
import { createClient } from '@/app/utils/supabase/server';

export async function POST(request) {
  try {
    const body = await request.json()
    
    const headersList = await headers()
    const origin = headersList.get('origin')

    const supabase = await createClient()
    const {data,error} = await supabase
    .from("products")
    .select("stripe_price_id")
    .in("code", body.items.map(item => item.code))
    
    if (error) {
      throw new Error(`Error fetching products: ${error.message}`)
    }
    
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: data.map((item, index) => ({
        price: item.stripe_price_id,
        quantity: body.items[index].quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: {enabled: true},
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}