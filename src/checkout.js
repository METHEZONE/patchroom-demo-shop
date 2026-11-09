import { payco } from './payco.js';

/** Charge a cart. `cart.totalCents` is an integer number of cents. */
export async function checkout(cart, customerId) {
  const charge = await payco.charges.create(cart.totalCents / 100, {
    currency: 'usd',
    customer: customerId,
  });
  if (charge.status !== 'succeeded') {
    return { ok: false, reason: charge.status };
  }
  return { ok: true, chargeId: charge.id };
}
