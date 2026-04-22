import { Product, ProductCategory } from '../types/product';

export const products: Product[] = [
  // Whiskey
  {
    id: 'whiskey-001',
    name: 'Jameson Select Reserve',
    category: 'whiskey',
    price: 450.00,
    description: 'Smooth Irish whiskey with notes of vanilla, toasted wood, and spice.',
    image: '/images/jameson-select.png',
    brand: 'Jameson',
    volume: '750ml',
    alcoholPercentage: 40,
    inStock: true,
    featured: true
  },
  {
    id: 'whiskey-002',
    name: 'Johnnie Walker Black Label',
    category: 'whiskey',
    price: 520.00,
    description: 'Classic blended Scotch whisky with deep smoky flavors.',
    image: '/images/johnnie-walker-black.png',
    brand: 'Johnnie Walker',
    volume: '750ml',
    alcoholPercentage: 40,
    inStock: true
  },
  {
    id: 'whiskey-003',
    name: 'Jack Daniel\'s Tennessee Whiskey',
    category: 'whiskey',
    price: 380.00,
    description: 'Smooth Tennessee whiskey with charcoal mellowing process.',
    image: '/images/jack-daniels.jpg',
    brand: 'Jack Daniel\'s',
    volume: '750ml',
    alcoholPercentage: 40,
    inStock: true
  },

  // Wine
  {
    id: 'wine-001',
    name: 'Nederburg Cabernet Sauvignon',
    category: 'wine',
    price: 120.00,
    description: 'Rich South African red wine with dark fruit flavors.',
    image: '/images/nederburg-cabernet.webp',
    brand: 'Nederburg',
    volume: '750ml',
    alcoholPercentage: 13.5,
    inStock: true,
    featured: true
  },
  {
    id: 'wine-002',
    name: 'Two Oceans Sauvignon Blanc',
    category: 'wine',
    price: 85.00,
    description: 'Crisp white wine with citrus and tropical fruit notes.',
    image: '/images/two-oceans-sauvignon.webp',
    brand: 'Two Oceans',
    volume: '750ml',
    alcoholPercentage: 12,
    inStock: true
  },
  {
    id: 'wine-003',
    name: 'Boschendal Chenin Blanc',
    category: 'wine',
    price: 95.00,
    description: 'Dry white wine with honey and apricot flavors.',
    image: '/images/boschendal-chenin.webp',
    brand: 'Boschendal',
    volume: '750ml',
    alcoholPercentage: 12.5,
    inStock: true
  },

  // Beer
  {
    id: 'beer-001',
    name: 'Heineken 6-Pack',
    category: 'beer',
    price: 120.00,
    description: 'Premium Dutch lager with distinctive green bottle.',
    image: '/images/heineken-6pack.webp',
    brand: 'Heineken',
    volume: '6 x 330ml',
    alcoholPercentage: 5,
    inStock: true,
    featured: true
  },
  {
    id: 'beer-002',
    name: 'Castle Lite 6-Pack',
    category: 'beer',
    price: 95.00,
    description: 'Light South African lager with fewer calories.',
    image: '/images/castle-lite-6pack.jpg',
    brand: 'Castle Lite',
    volume: '6 x 340ml',
    alcoholPercentage: 4,
    inStock: true
  },
  {
    id: 'beer-003',
    name: 'Black Label 6-Pack',
    category: 'beer',
    price: 105.00,
    description: 'Classic South African beer with rich flavor.',
    image: '/images/black-label-6pack.webp',
    brand: 'Black Label',
    volume: '6 x 340ml',
    alcoholPercentage: 5,
    inStock: true
  },

  // Spirits
  {
    id: 'spirits-001',
    name: 'Smirnoff Vodka',
    category: 'spirits',
    price: 180.00,
    description: 'Classic triple-distilled vodka, perfect for cocktails.',
    image: '/images/smirnoff-vodka.webp',
    brand: 'Smirnoff',
    volume: '750ml',
    alcoholPercentage: 37.5,
    inStock: true
  },
  {
    id: 'spirits-002',
    name: 'Captain Morgan Rum',
    category: 'spirits',
    price: 220.00,
    description: 'Smooth Caribbean rum with vanilla and caramel notes.',
    image: '/images/captain-morgan.webp',
    brand: 'Captain Morgan',
    volume: '750ml',
    alcoholPercentage: 35,
    inStock: true
  },
  {
    id: 'spirits-003',
    name: 'Hennessey VSOP',
    category: 'spirits',
    price: 850.00,
    description: 'Premium cognac with rich oak and fruit flavors.',
    image: '/images/hennessey-vsop.webp',
    brand: 'Hennessy',
    volume: '700ml',
    alcoholPercentage: 40,
    inStock: true,
    featured: true
  },

  // Ciders
  {
    id: 'ciders-001',
    name: 'Strongbow Gold 6-Pack',
    category: 'ciders',
    price: 110.00,
    description: 'Refreshing apple cider with crisp taste.',
    image: '/images/strongbow-gold.webp',
    brand: 'Strongbow',
    volume: '6 x 330ml',
    alcoholPercentage: 4.5,
    inStock: true
  },
  {
    id: 'ciders-002',
    name: 'Savanna Dry 6-Pack',
    category: 'ciders',
    price: 105.00,
    description: 'Popular South African dry cider.',
    image: '/images/savanna-dry.webp',
    brand: 'Savanna',
    volume: '6 x 330ml',
    alcoholPercentage: 6,
    inStock: true
  },
  {
    id: 'ciders-003',
    name: 'Hunter\'s Gold 6-Pack',
    category: 'ciders',
    price: 100.00,
    description: 'Sweet golden cider with apple flavor.',
    image: '/images/hunters-gold.webp',
    brand: 'Hunter\'s',
    volume: '6 x 340ml',
    alcoholPercentage: 4.5,
    inStock: true
  }
];

export const categories: { value: ProductCategory; label: string; description: string }[] = [
  {
    value: 'whiskey',
    label: 'Whiskey',
    description: 'Premium whiskeys from around the world'
  },
  {
    value: 'wine',
    label: 'Wine',
    description: 'Fine South African and international wines'
  },
  {
    value: 'beer',
    label: 'Beer',
    description: 'Local and imported beers'
  },
  {
    value: 'spirits',
    label: 'Spirits',
    description: 'Vodka, rum, gin and other spirits'
  },
  {
    value: 'ciders',
    label: 'Ciders',
    description: 'Refreshing fruit ciders'
  },
  {
    value: 'specials',
    label: 'Specials',
    description: 'Limited time offers and deals'
  }
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured && product.inStock);
};

export const getSpecials = (): Product[] => {
  return products.filter(product => 
    (product.specialPrice && product.specialUntil && product.specialUntil > new Date()) ||
    product.category === 'specials'
  );
};
