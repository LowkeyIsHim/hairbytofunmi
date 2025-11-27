import { supabase } from './client';

const styles = [
  { name: 'Butterfly Locs', price: 12000, description: 'Elegant butterfly locs.', image: 'https://via.placeholder.com/400x400?text=Butterfly+Locs', tags: ['locs'], featured: true },
  { name: 'Knotless Braids', price: 9000, description: 'Smooth knotless braids.', image: 'https://via.placeholder.com/400x400?text=Knotless+Braids', tags: ['braids'], featured: true },
  { name: 'Passion Twists', price: 10000, description: 'Voluminous passion twists.', image: 'https://via.placeholder.com/400x400?text=Passion+Twists', tags: ['twists'], featured: false },
  { name: 'French Curls Braid', price: 8000, description: 'Soft french curls.', image: 'https://via.placeholder.com/400x400?text=French+Curls+Braid', tags: ['braids'], featured: false },
  { name: 'Ghana Braids', price: 7500, description: 'Classic Ghana braids.', image: 'https://via.placeholder.com/400x400?text=Ghana+Braids', tags: ['braids'], featured: false },
  { name: 'Cornrows', price: 4000, description: 'Stylish cornrows.', image: 'https://via.placeholder.com/400x400?text=Cornrows', tags: ['braids'], featured: false },
  { name: 'Mini Twists', price: 6000, description: 'Delicate mini twists.', image: 'https://via.placeholder.com/400x400?text=Mini+Twists', tags: ['twists'], featured: false },
  { name: 'Bantu Knots', price: 5000, description: 'Classic bantu knots.', image: 'https://via.placeholder.com/400x400?text=Bantu+Knots', tags: ['knots'], featured: false },
  { name: 'Goddess Braids', price: 11000, description: 'Elegant goddess braids.', image: 'https://via.placeholder.com/400x400?text=Goddess+Braids', tags: ['braids'], featured: true },
];

async function seed() {
  for (const style of styles) {
    await supabase.from('hair_styles').insert([style]);
  }
  console.log('Seeded hair styles!');
}

seed();
