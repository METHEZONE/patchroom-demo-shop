import test from 'node:test';
import assert from 'node:assert/strict';
import { payco } from '../src/payco.js';
import { renew } from '../src/subscriptions.js';
import { payInvoice } from '../src/invoices.js';

test('renewing a pro plan keeps it active', async () => {
  const sub = await renew({ plan: 'pro', customerId: 'cus_9' });
  assert.equal(sub.active, true);
  assert.ok(sub.lastChargeId);
});

test('a pro renewal charges exactly 2900 cents', async () => {
  const sub = await renew({ plan: 'pro', customerId: 'cus_9' });
  const payment = await payco.payments.retrieve(sub.lastChargeId);
  assert.equal(payment.amount_minor, 2900);
});

test('paying an invoice marks it paid', async () => {
  const res = await payInvoice({
    number: 'INV-42',
    currency: 'eur',
    customerId: 'cus_7',
    lines: [{ unitCents: 1250, qty: 2 }, { unitCents: 99, qty: 1 }],
  });
  assert.equal(res.paid, true);
});
