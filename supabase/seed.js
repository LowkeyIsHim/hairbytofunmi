import { supabase } from './client.js';

const styles = [
  { name: 'Butterfly Locs', price: 12000, image: 'https://via.placeholder.com/300', tags: ['locs'], description: 'Elegant Butterfly Locs' },
  { name: 'Knotless Braids', price: 9000, image: 'https://via.placeholder.com/300', tags: ['braids'], description: 'Soft and sleek knotless braids' },
  { name: 'Passion Twists', price: 10000, image: 'https://via.placeholder.com/300', tags: ['twists'], description: 'Beautiful passion twists' },
  { name: 'French Curls Braid', price: 8000, image: 'https://via.placeholder.com/300', tags: ['braids'], description: 'French curl braids' },
  { name: 'Ghana Braids', price: 7500, image: 'https://via.placeholder.com/300', tags: ['braids'], description: 'Classic Ghana braids' },
  { name: 'Cornrows', price: 4000, image: 'https://via.placeholder.com/300', tags: ['cornrows'], description: 'Stylish cornrows' },
  { name: 'Mini Twists', price: 6000, image: 'https://via.placeholder.com/300', tags: ['twists'], description: 'Chic mini twists' },
  { name: 'Bantu Knots', price: 5000, image: 'https://via.placeholder.com/300', tags: ['bantu'], description: 'Trendy Bantu knots' },
  { name: 'Goddess Braids', price: 11000, image: 'https://via.placeholder.com/300', tags: ['braids'], description: 'Elegant goddess braids' }
];

async function seed() {
  for (let style of styles) {
    await supabase.from('hair_styles').insert(style);
  }
  console.log('Database seeded successfully!');
}

seed();
