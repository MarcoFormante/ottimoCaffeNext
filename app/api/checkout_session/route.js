import {  NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../lib/stripe'
import { createClient } from '@/app/utils/supabase/server';

export async function POST(request) {
  try {
    
    const body = await request.json();

    const headersList = await headers();
    const origin = headersList.get("origin");

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("stripe_price_id")
      .in(
        "code",
        body.items.map((item) => item.code)
      );

    if (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }


    const shippingProduct = await stripe.products.create({
      name: "Spedizione",
      description: "Spedizione per il tuo ordine su Ottimo Caffè non superiore i 69€",
    })

    const freeShippingProduct = await stripe.products.create({
      name: "Spedizione",
      description: "Spedizione per il tuo ordine su Ottimo Caffè non superiore i 69€",
    })


    let shippingPrice = "";
    if (body.shippingCost) {
        const stripeShippingCost = await stripe.prices.create({
            unit_amount:699,
            currency: "eur",
            product: shippingProduct.id,
            tax_behavior: "exclusive",
            nickname: "Spedizione standard",
        })
          shippingPrice = stripeShippingCost.id;
         
      }else{
          const freeShippingPrice = await stripe.prices.create({
            unit_amount: 0,
            currency: "eur",
            product: freeShippingProduct.id,
            nickname: "Spedizione gratuita",
          })

          shippingPrice = freeShippingPrice.id;
      }
      
       data.push({
            stripe_price_id: shippingPrice,
            quantity: 1,
      })

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions
      .create({
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["IT"],
        },

        line_items: data.map((item, index) => ({
          price: item.stripe_price_id,
          quantity: body.items[index]?.quantity ? body.items[index].quantity :  1,
        })),
        metadata:{
          spedizione:"shr_1RfO6hGTBq7zqGlHik6h4pMf"
        },
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
          {
            success: false,
            error: {
              message:
                "Errore durante la creazione della sessione di checkout su Stripe",
            },
          },
          {
            status: 500,
          }
        );
      });
    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}