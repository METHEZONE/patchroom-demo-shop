import { payco } from '../payco.js';

/** Before refunding, make sure the charge exists and actually went through. */
export async function canRefund(chargeId) {
  const payment = await payco.payments.retrieve(chargeId);
  return payment.state === 'succeeded';
}
