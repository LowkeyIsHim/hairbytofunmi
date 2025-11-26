// src/components/shared/WhatsAppButton.jsx
import { FaWhatsapp } from 'react-icons/fa';
import Button from '../ui/Button';

// Utility to generate a WhatsApp link
const getWhatsAppLink = (message) => {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348012345678';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

export default function WhatsAppButton({ styleName = 'a style', children, className = '' }) {
  const defaultMessage = `Hello HairByTofunmi, I would like to book an appointment for the ${styleName}. Can you please send me your availability?`;
  
  const link = getWhatsAppLink(defaultMessage);

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={`Book ${styleName} on WhatsApp`}
      className={className}
    >
      <Button variant="whatsapp" className="flex items-center space-x-2">
        <FaWhatsapp size={20} />
        <span>{children || 'Book on WhatsApp'}</span>
      </Button>
    </a>
  );
}
