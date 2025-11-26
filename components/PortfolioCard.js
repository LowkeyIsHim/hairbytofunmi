import WhatsAppButton from './WhatsAppButton';
import { useState } from 'react';

export default function PortfolioCard({ image, styleName }) {
  const [open, setOpen] = useState(false);
  const message = `Hi Tofunmi, I love this style: ${styleName}`;

  return (
    <>
      <img
        src={image}
        alt={styleName}
        className="cursor-pointer object-cover w-full h-64 rounded-md hover:scale-105 transition"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md max-w-lg w-full relative">
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-500">X</button>
            <img src={image} alt={styleName} className="w-full h-80 object-cover mb-4" />
            <WhatsAppButton message={message} />
          </div>
        </div>
      )}
    </>
  );
}
