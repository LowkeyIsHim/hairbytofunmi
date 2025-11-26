export type HairStyle = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export const INITIAL_STYLES: HairStyle[] = [
  { id: '1', name: 'Butterfly Locs', price: 25000, category: 'Locs', image: 'https://images.unsplash.com/photo-1635368366060-17937d976070?auto=format&fit=crop&q=80&w=600' },
  { id: '2', name: 'Knotless Braids', price: 20000, category: 'Braids', image: 'https://images.unsplash.com/photo-1620067925003-2475036eb53e?auto=format&fit=crop&q=80&w=600' },
  { id: '3', name: 'Passion Twists', price: 22000, category: 'Twists', image: 'https://images.unsplash.com/photo-1519420658498-8f8102434ae7?auto=format&fit=crop&q=80&w=600' },
  { id: '4', name: 'French Curls Braid', price: 28000, category: 'Braids', image: 'https://images.unsplash.com/photo-1634629377488-81e8082662bf?auto=format&fit=crop&q=80&w=600' },
  { id: '5', name: 'Ghana Braids', price: 15000, category: 'Braids', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600' },
  { id: '6', name: 'Cornrows', price: 10000, category: 'Cornrows', image: 'https://images.unsplash.com/photo-1630230282631-f925c0401829?auto=format&fit=crop&q=80&w=600' },
  { id: '7', name: 'Mini Twists', price: 18000, category: 'Twists', image: 'https://images.unsplash.com/photo-1595186591280-5a3d46050b1a?auto=format&fit=crop&q=80&w=600' },
  { id: '8', name: 'Banter Knots', price: 12000, category: 'Natural', image: 'https://images.unsplash.com/photo-1624641979493-27e1694be660?auto=format&fit=crop&q=80&w=600' },
  { id: '9', name: 'Goddess Braids', price: 24000, category: 'Braids', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600' },
];

export const CONTACT_INFO = {
  whatsapp: '2349021280216',
  tiktok: 'https://www.tiktok.com/@hairbytofunmi_21?_r=1&_t=ZS-91ig71qDCE5',
  email: 'kofoworoladickson@gmail.com',
  hours: '9:00 AM - 7:00 PM'
};
