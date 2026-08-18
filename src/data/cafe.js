export const cafe = {
  name: 'Nuur',
  tagline: 'Puur genieten',
  description: 'Craft coffeehouse in the heart of Amsterdam. Pure ingredients, intentional preparation, unforgettable moments.',
  address: {
    street: 'Prinsengracht 42',
    city: 'Amsterdam',
    postal: '1015 CW',
    country: 'Netherlands',
    full: 'Prinsengracht 42, 1015 CW Amsterdam',
  },
  phone: '+31 (0)20 845 2190',
  email: 'hallo@nuur.cafe',
  hours: {
    weekday: '7:00 — 19:00',
    weekend: '8:00 — 20:00',
    holiday: '9:00 — 18:00',
  },
  social: [
    { platform: 'instagram', url: 'https://instagram.com/nuur.amsterdam' },
    { platform: 'facebook', url: 'https://facebook.com/nuuramsterdam' },
    { platform: 'tiktok', url: 'https://tiktok.com/@nuur.amsterdam' },
  ],
  coordinates: {
    lat: 52.3702,
    lng: 4.8952,
  },
}

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'Reservations', path: '/reservations' },
  { label: 'Order', path: '/online-order' },
]
