// PayCo SDK v1.8.2 (vendored). In-memory sandbox: no network calls.
// API docs: charges are created in DOLLARS (float) and expose `status`.

const VERSION = '1.8.2';

export function createClient({ apiKey } = {}) {
  if (!apiKey) throw new Error('PayCo: apiKey is required');
  const store = new Map();
  let seq = 0;

  const charges = {
    /**
     * @param {number} amount amount in major units (e.g. 19.99 dollars)
     * @param {{currency?: string, customer?: string, description?: string}} [opts]
     */
    async create(amount, opts = {}) {
      if (typeof amount !== 'number' || amount <= 0) throw new Error('PayCo: invalid amount');
      const charge = {
        id: `ch_${++seq}`,
        object: 'charge',
        amount,
        currency: opts.currency || 'usd',
        customer: opts.customer || null,
        description: opts.description || null,
        status: 'succeeded',
      };
      store.set(charge.id, charge);
      return charge;
    },
    async retrieve(id) {
      const c = store.get(id);
      if (!c) throw new Error(`PayCo: no such charge ${id}`);
      return c;
    },
  };

  return { VERSION, charges };
}
