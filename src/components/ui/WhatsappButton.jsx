import { FaWhatsapp } from 'react-icons/fa';
import Button from './Button';
import { getSettings } from '@/lib/data';

/**
 * Generates the WhatsApp link with a pre-filled message.
 * @param {string} styleName - The name of the hair style to include in the message.
 * @param {string} number - The WhatsApp number.
 */
const generateWhatsAppLink = (styleName, number) => {
  const baseMessage = styleName 
    ? `Hello HairByTofunmi, I would like to book an appointment for the ${styleName}.`
    : `Hello HairByTofunmi, I would like to inquire about booking an appointment.`;
  
  const encodedMessage = encodeURIComponent(baseMessage);
  
  // WhatsApp link format for international numbers
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

export default async function WhatsappButton({ styleName = '', className = '' }) {
  // Fetch the current WhatsApp number from the settings database
  const settings = await getSettings();
  const whatsappNumber = settings.whatsapp_number;
  
  if (!whatsappNumber) {
    return <p className="text-red-500">Error: WhatsApp number not configured.</p>;
  }

  const href = generateWhatsAppLink(styleName, whatsappNumber);

  return (
    <Button 
      as="a" 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      variant="whatsapp"
      className={className}
    >
      <FaWhatsapp size={20} />
      {styleName ? 'Book this Style' : 'Book Appointment'}
    </Button>
  );
}
