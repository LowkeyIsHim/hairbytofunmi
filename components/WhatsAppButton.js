export default function WhatsAppButton({ message }) {
  const url = `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(message)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block bg-accent text-white py-2 px-4 rounded-md hover:bg-primary transition">
      Book on WhatsApp
    </a>
  );
}
