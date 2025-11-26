import { WhatsApp } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

export default function WhatsAppButton({ styleName, whatsappNumber }) {
  const defaultMessage = `Hello Tofunmi, I would like to book an appointment for the ${styleName || 'hairstyling service'} I saw on your website.`;
  const whatsappLink = getWhatsAppLink(whatsappNumber, defaultMessage);
  
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-cream-white bg-muted-lavender hover:bg-deep-violet transition duration-300 transform hover:scale-[1.02] active:scale-95 whitespace-nowrap"
      aria-label={`Book ${styleName || 'service'} on WhatsApp`}
    >
      <WhatsApp size={20} className="mr-2" />
      Book on WhatsApp
    </a>
  );
}
