// The base for all WhatsApp links
export const WHATSAPP_BASE_URL = '[https://wa.me/](https://wa.me/)';

// Default Working Hours
export const WORKING_HOURS = '9:00 AM — 7:00 PM';

// Format for currency (Nigerian Naira)
export const CURRENCY_FORMAT = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
});

// Helper function for WhatsApp link generation
export const getWhatsAppLink = (number, message) => {
    // Basic sanitization and formatting for phone number
    const sanitizedNumber = number.replace(/\D/g, ''); 
    const encodedMessage = encodeURIComponent(message);
    return `${WHATSAPP_BASE_URL}${sanitizedNumber}?text=${encodedMessage}`;
};
