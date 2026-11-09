import { payco } from './payco.js';

/** Tip the creator a whole number of dollars. */
export async function tip(dollars, customerId) {
  const charge = await payco.charges.create(dollars, { customer: customerId });
  return charge.status === 'succeeded' ? charge.id : null;
}
