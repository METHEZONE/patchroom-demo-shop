import { payco } from './payco.js';

export async function payInvoice(invoice) {
  const total = invoice.lines.reduce((sum, l) => sum + l.unitCents * l.qty, 0);
  const charge = await payco.payments.create({
    amount_minor: total,
    currency: invoice.currency,
    customer: invoice.customerId,
    description: `Invoice ${invoice.number}`,
  });
  return { invoice: invoice.number, chargeId: charge.id, paid: charge.state === 'succeeded' };
}
