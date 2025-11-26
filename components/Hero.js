import WhatsAppButton from './WhatsAppButton';

export default function Hero() {
  return (
    <section className="bg-primary text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-heading mb-4">Transforming Hair Dreams into Reality</h1>
      <p className="max-w-xl mx-auto mb-6">Elegance, style, and care. Specializing in braids, twists, curls, and more.</p>
      <WhatsAppButton message="Hi Tofunmi, I want to book a hair style!" />
    </section>
  );
}
