import { redirect } from 'next/navigation'

import { stripe } from '../lib/stripe.js'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const stripeSession =  await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent', 'customer_details', 'customer', 'shipping' , 'shipping_address', 'shipping_cost' , 'payment_method_details' , 'payment_method', 'payment_method_options', 'payment_status', 'setup_intent', 'setup_intent_status', 'subscription', 'subscription_status',  'total_details', 'amount_total', 'amount_subtotal', 'amount_shipping', 'amount_tax', 'amount_refunded', 'amount_captured', 'amount_received', 'amount_refunded_details', 'amount_captured_details', 'amount_received_details', 'amount_subtotal_details', 'amount_shipping_details', 'amount_tax_details', 'amount_total_details', 'amount_total_details', 'amount_subtotal_details', 'amount_shipping_details', 'amount_tax_details', 'amount_refunded_details', 'amount_captured_details', 'amount_received_details', 'amount_subtotal_details', 'amount_shipping_details', 'amount_tax_details', 'amount_total_details', 'amount_subtotal_details', 'amount_shipping_details', 'amount_tax_details']
  })


  console.log(stripeSession);
  

  if (stripeSession.status === 'open') {
    return redirect('/')
  }

  if (stripeSession.status === 'complete') {
    return (
      <section className='h-full' id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {stripeSession.customer_email}. If you have any questions, please email{' '}
        </p>
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    )
  }
}