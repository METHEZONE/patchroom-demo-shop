import { createClient } from '../vendor/payco/index.js';

export const payco = createClient({ apiKey: process.env.PAYCO_KEY || 'pk_test_demo' });
