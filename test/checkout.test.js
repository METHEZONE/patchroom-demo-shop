import test from 'node:test';
import assert from 'node:assert/strict';
import { payco } from '../src/payco.js';
import { checkout } from '../src/checkout.js';
import { tip } from '../src/tips.js';
import { canRefund } from '../src/admin/refunds.js';

test('checkout charges the cart and returns a charge id', async () => {
  const res = await checkout({ totalCents: 1999 }, 'cus_1');
  assert.equal(res.ok, true);
  assert.ok(res.chargeId);
});

test('checkout charges the exact cart amount', async () => {
  const res = await checkout({ totalCents: 1999 }, 'cus_1');
  const charge = await payco.charges.retrieve(res.chargeId);
  assert.equal(charge.amount, 19.99);
});

test('a successful checkout can be refunded', async () => {
  const res = await checkout({ totalCents: 500 }, 'cus_2');
  assert.equal(await canRefund(res.chargeId), true);
});

test('tips return a charge id', async () => {
  assert.ok(await tip(5, 'cus_3'));
});
