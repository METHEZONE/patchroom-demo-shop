import { payco } from '../payco.js';

/** Before refunding, make sure the charge exists and actually went through. */
export async function canRefund(chargeId) {
  const charge = await payco.charges.retrieve(chargeId);
  return charge.status === 'succeeded';
}
