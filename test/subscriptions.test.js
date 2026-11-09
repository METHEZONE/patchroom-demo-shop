import test from 'node:test';
import assert from 'node:assert/strict';
import { payco } from '../src/payco.js';
import { renew } from '../src/subscriptions.js';

test('a pro renewal charges exactly 2900 cents', async () => {
  const sub = await renew({ plan: 'pro', customerId: 'cus_pro' });
  const payment = await payco.payments.retrieve(sub.lastChargeId);
  assert.equal(payment.amount_minor, 2900);
});
