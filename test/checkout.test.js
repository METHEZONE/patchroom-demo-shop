import test from 'node:test';
import assert from 'node:assert/strict';
import { payco } from '../src/payco.js';
import { checkout } from '../src/checkout.js';
import { tip } from '../src/tips.js';
import { renew } from '../src/subscriptions.js';
import { canRefund } from '../src/admin/refunds.js';

test('checkout charges the cart and returns a charge id', async () => {
  const res = await checkout({ totalCents: 1999 }, 'cus_1');
  assert.equal(res.ok, true);
  assert.ok(res.chargeId);
});

test('checkout charges the exact cart amount', async () => {
  const res = await checkout({ totalCents: 1999 }, 'cus_1');
  const charge = await payco.payments.retrieve(res.chargeId);
  assert.equal(charge.amount_minor, 1999);
});

test('a successful checkout can be refunded', async () => {
  const res = await checkout({ totalCents: 500 }, 'cus_2');
  assert.equal(await canRefund(res.chargeId), true);
});

test('tips return a charge id', async () => {
  assert.ok(await tip(5, 'cus_3'));
});

test('renewals send the exact amount in cents (pro plan = 2900)', async () => {
  const sub = await renew({ plan: 'pro', customerId: 'cus_4', currency: 'usd' });
  const payment = await payco.payments.retrieve(sub.lastChargeId);
  assert.equal(payment.amount_minor, 2900);
  assert.equal(payment.currency, 'usd');
  assert.equal(sub.active, true);
});
