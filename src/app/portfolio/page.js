"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Portfolio() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const snap = await getDocs(collection(db, "styles"));
      setImages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchImages();
  }, []);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif text-center mb-12">Portfolio</h1>
      
      {/* Masonry-ish Grid */}
      <div className="columns-1 md:columns-3 gap-4 space-y-4">
        {images.map((img) => (
          <div key={img.id} className="break-inside-avoid cursor-pointer" onClick={() => setSelectedImg(img)}>
            <img 
              src={img.imageUrl} 
              alt={img.name} 
              className="w-full rounded-sm hover:opacity-90 transition-opacity" 
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div className="bg-white p-2 max-w-md w-full rounded-sm relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImg.imageUrl} alt={selectedImg.name} className="w-full h-auto max-h-[70vh] object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-serif text-2xl mb-2">{selectedImg.name}</h3>
              <button 
                onClick={() => {
                    const url = `https://wa.me/2349021280216?text=I%20love%20this%20style%20from%20your%20portfolio:%20${selectedImg.name}`;
                    window.open(url, '_blank');
                }}
                className="bg-brand-500 text-white px-6 py-2 rounded-full text-sm uppercase"
              >
                Book This Look
              </button>
            </div>
            <button className="absolute top-2 right-2 text-gray-800 bg-white/50 rounded-full p-1" onClick={() => setSelectedImg(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
