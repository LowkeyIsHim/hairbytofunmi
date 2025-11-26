import Link from 'next/link';
import { Frown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 animate-fadeIn">
      <Frown size={80} className="text-muted-lavender mb-6" />
      <h1 className="text-6xl font-serif font-extrabold text-deep-violet mb-4">
        404 | Page Not Found
      </h1>
      <p className="text-xl text-deep-violet/80 max-w-md mb-8">
        It seems the elegance you were seeking got lost. Let's get you back on track.
      </p>
      <Link href="/">
        <Button variant="primary" className="px-6 py-3">
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
}
