import { payco } from './payco.js';

/** Charge a cart. `cart.totalCents` is an integer number of cents. */
export async function checkout(cart, customerId) {
  const charge = await payco.payments.create({
    amount_minor: cart.totalCents,
    currency: 'usd',
    customer: customerId,
  });
  if (charge.state !== 'succeeded') {
    return { ok: false, reason: charge.state };
  }
  return { ok: true, chargeId: charge.id };
}
