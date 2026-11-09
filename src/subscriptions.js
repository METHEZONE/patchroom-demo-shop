import { payco } from './payco.js';

const PLANS = { basic: 900, pro: 2900 }; // cents / month

export async function renew(subscription) {
  const priceCents = PLANS[subscription.plan];
  if (!priceCents) throw new Error(`unknown plan ${subscription.plan}`);
  const charge = await payco.charges.create(priceCents / 100, {
    currency: subscription.currency || 'usd',
    customer: subscription.customerId,
    description: `${subscription.plan} renewal`,
  });
  return {
    ...subscription,
    lastChargeId: charge.id,
    active: charge.status === 'succeeded',
  };
}
