# patchroom-demo-shop

A tiny storefront that takes payments through the **PayCo** SDK (a fake, Stripe-like payments provider vendored in `vendor/payco/`).

It is the demo target for [Patchroom](https://github.com/METHEZONE/patchroom): when PayCo ships a breaking API change, Patchroom finds every affected call site here, patches it with a live, multiplayer agent session, runs the tests and opens a PR.

```bash
npm test
```

PayCo call sites:

| file | usage |
|---|---|
| `src/checkout.js` | one-off cart checkout |
| `src/subscriptions.js` | monthly renewals |
| `src/tips.js` | tipping the creator |
| `src/invoices.js` | paying an invoice |
| `src/admin/refunds.js` | looking up a charge before refunding |
