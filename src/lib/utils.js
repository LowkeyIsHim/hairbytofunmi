import { CURRENCY_FORMAT } from './constants';

export const formatPrice = (price) => {
  // Ensure the price is a number before formatting
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return 'N/A';
  return CURRENCY_FORMAT.format(numericPrice);
};

// Simple utility to generate a unique key
export const uniqueId = () => Math.random().toString(36).substring(2, 9);
