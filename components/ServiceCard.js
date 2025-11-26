import WhatsAppButton from './WhatsAppButton';

export default function ServiceCard({ style }) {
  const message = `Hi Tofunmi, I want to book the ${style.name}!`;
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
      <img src={style.image} alt={style.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
        <p className="text-gray-700 mb-2">{style.description}</p>
        <p className="font-bold mb-4">₦{style.price.toLocaleString()}</p>
        <WhatsAppButton message={message} />
      </div>
    </div>
  );
}
