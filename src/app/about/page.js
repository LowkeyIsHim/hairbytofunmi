export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-brand-50">
      <div className="max-w-4xl w-full bg-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
           {/* Placeholder for Headshot */}
           <div className="aspect-[3/4] bg-gray-200 w-full relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=2080&auto=format&fit=crop" 
                    alt="Stylist" 
                    className="object-cover w-full h-full"
                />
           </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-serif mb-6 text-brand-dark">About The Stylist</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome to <strong>HairByTofunmi</strong>. I am a passionate hair stylist dedicated to making every woman feel confident and beautiful. 
            With years of experience in protective styling, I specialize in creating neat, painless, and durable hairstyles that protect your natural hair while making you look fabulous.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            My philosophy is simple: Elegance, Care, and Perfection. Whether you are looking for intricate braids, soulful twists, or a simple protective style, I am here to bring your vision to life.
          </p>
          <img src="/signature.svg" alt="Signature" className="h-12 opacity-50" />
        </div>
      </div>
    </div>
  );
}
