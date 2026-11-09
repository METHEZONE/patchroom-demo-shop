import { payco } from './payco.js';

const PLANS = { basic: 900, pro: 2900 }; // cents / month

export async function renew(subscription) {
  const priceCents = PLANS[subscription.plan];
  if (!priceCents) throw new Error(`unknown plan ${subscription.plan}`);
  const payment = await payco.payments.create({
    amount_minor: priceCents,
    currency: subscription.currency || 'usd',
    customer: subscription.customerId,
    description: `${subscription.plan} renewal`,
  });
  return {
    ...subscription,
    lastChargeId: payment.id,
    active: payment.state === 'succeeded',
  };
}
