// src/components/ServiceCard.js (Conceptual)
import Image from 'next/image';
import Link from 'next/link';

const ServiceCard = ({ service }) => {
  return (
    <div className="card-premium text-center group">
      <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <Image 
          src={service.imageUrl} 
          alt={service.title} 
          fill 
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> {/* Image overlay */}
      </div>
      <h3 className="text-3xl font-serif text-brand-dark dark:text-brand-cream mb-3 group-hover:text-brand-gold transition-colors duration-200">
        {service.title}
      </h3>
      <p className="font-sans text-gray-700 dark:text-gray-300 mb-6 flex-grow">
        {service.description}
      </p>
      <Link href={`/services/${service.slug}`} className="btn-secondary mt-auto">
        Learn More
      </Link>
    </div>
  );
};

export default ServiceCard;
