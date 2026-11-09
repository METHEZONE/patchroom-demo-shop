import { payco } from './payco.js';

/** Tip the creator a whole number of dollars. */
export async function tip(dollars, customerId) {
  const payment = await payco.payments.create({
    amount_minor: Math.round(dollars * 100),
    currency: 'usd',
    customer: customerId,
  });
  return payment.state === 'succeeded' ? payment.id : null;
}
