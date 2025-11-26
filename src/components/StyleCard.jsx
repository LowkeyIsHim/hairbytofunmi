import Image from 'next/image';
import { premiumStyles, colors } from '@/styles/theme';
import WhatsappButton from './ui/WhatsappButton';

export default function StyleCard({ style }) {
  const priceFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  });

  return (
    <div className={`card-premium w-full ${premiumStyles.hoverLift}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={style.image_url || '/placeholder.jpg'} // Use placeholder if URL is missing
          alt={`Finished look of ${style.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
        <div className="absolute top-0 right-0 p-2 bg-white bg-opacity-80 rounded-bl-lg">
          <p className="text-lg font-bold text-[${colors.deepViolet}]">{priceFormatter.format(style.price)}</p>
        </div>
      </div>
      
      <div className="p-4 md:p-6 space-y-3">
        <h3 className="text-2xl font-serif font-bold text-[${colors.deepViolet}]">{style.name}</h3>
        <p className="text-sm text-text line-clamp-3">{style.description}</p>
        <div className="pt-2">
          <WhatsappButton styleName={style.name} />
        </div>
      </div>
    </div>
  );
}
