
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Ninja ZX-10R",
    brand: "Kawasaki",
    category: "Sport",
    description: "The Kawasaki Ninja ZX-10R is a supersport motorcycle designed for maximum performance on the track. It features advanced electronics, aerodynamic design, and powerful engine output.",
    price: 1599000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "998cc Liquid-cooled, 4-stroke In-line Four",
      power: "203 PS @ 13,200 rpm",
      torque: "114.9 Nm @ 11,400 rpm",
      weight: "207 kg",
      fuelCapacity: "17 litres",
      topSpeed: "299 km/h"
    },
    colors: ["Lime Green", "Metallic Black", "Racing Blue"],
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: "2",
    name: "Panigale V4",
    brand: "Ducati",
    category: "Sport",
    description: "The Ducati Panigale V4 represents the peak of Ducati sports bikes. It features a MotoGP-derived V4 engine, cutting-edge electronics, and distinctive Italian design.",
    price: 2699000,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "1103cc Desmosedici Stradale V4",
      power: "215.5 PS @ 13,000 rpm",
      torque: "123.6 Nm @ 9,500 rpm",
      weight: "198 kg",
      fuelCapacity: "16 litres",
      topSpeed: "299 km/h"
    },
    colors: ["Ducati Red", "Dark Stealth", "Winter Test Livery"],
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: "3",
    name: "S 1000 RR",
    brand: "BMW",
    category: "Sport",
    description: "The BMW S 1000 RR is a race-oriented sport bike known for its distinctive asymmetric design and powerful inline-four engine with advanced electronics.",
    price: 2195000,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1605651598932-c6db3d1448e9?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "999cc Liquid-cooled 4-cylinder",
      power: "207 PS @ 13,500 rpm",
      torque: "113 Nm @ 11,000 rpm",
      weight: "197 kg",
      fuelCapacity: "16.5 litres",
      topSpeed: "299 km/h"
    },
    colors: ["Racing Red", "Light White", "M Motorsport"],
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: "4",
    name: "YZF-R1",
    brand: "Yamaha",
    category: "Sport",
    description: "The Yamaha YZF-R1 is a sport motorcycle with a crossplane crankshaft engine with uneven firing intervals to provide improved torque and better handling.",
    price: 2149000,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1579674862028-6989bf2bd357?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "998cc Liquid-cooled, 4-stroke DOHC",
      power: "200 PS @ 13,500 rpm",
      torque: "112.4 Nm @ 11,500 rpm",
      weight: "203 kg",
      fuelCapacity: "17 litres",
      topSpeed: "299 km/h"
    },
    colors: ["Yamaha Blue", "Tech Black", "Icon Blue"],
    inStock: true,
    isFeatured: false,
    isNew: false
  },
  {
    id: "5",
    name: "GSX-R1000R",
    brand: "Suzuki",
    category: "Sport",
    description: "The Suzuki GSX-R1000R is a high-performance motorcycle with advanced electronic systems and race-derived features for both track and road use.",
    price: 1999000,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1543623851-f23afaf2a7b1?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "999.8cc Liquid-cooled DOHC",
      power: "202 PS @ 13,200 rpm",
      torque: "117.6 Nm @ 10,800 rpm",
      weight: "203 kg",
      fuelCapacity: "16 litres",
      topSpeed: "299 km/h"
    },
    colors: ["Metallic Triton Blue", "Glass Sparkle Black", "Pearl Mira Red"],
    inStock: true,
    isFeatured: false,
    isNew: false
  },
  {
    id: "6",
    name: "CBR1000RR-R Fireblade SP",
    brand: "Honda",
    category: "Sport",
    description: "The Honda CBR1000RR-R Fireblade SP is designed with MotoGP input, featuring aerodynamic winglets and a powerful engine for track performance.",
    price: 2399000,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1609190736266-7cfdc069a384?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "1000cc Liquid-cooled DOHC",
      power: "217.5 PS @ 14,500 rpm",
      torque: "113 Nm @ 12,500 rpm",
      weight: "201 kg",
      fuelCapacity: "16.1 litres",
      topSpeed: "299 km/h"
    },
    colors: ["Grand Prix Red", "Matte Pearl Black"],
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: "7",
    name: "Brutale 1000 RR",
    brand: "MV Agusta",
    category: "Naked",
    description: "The MV Agusta Brutale 1000 RR combines Italian craftsmanship with exceptional power in a naked bike design. It features advanced electronics and distinctive styling.",
    price: 3199000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "998cc Liquid-cooled inline four",
      power: "208 PS @ 13,000 rpm",
      torque: "116.5 Nm @ 11,000 rpm",
      weight: "186 kg",
      fuelCapacity: "16 litres",
      topSpeed: "302 km/h"
    },
    colors: ["AGO Red", "Metallic Carbon Black", "Aviation Grey"],
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: "8",
    name: "Street Triple RS",
    brand: "Triumph",
    category: "Naked",
    description: "The Triumph Street Triple RS offers agile handling with its lightweight chassis and a powerful three-cylinder engine with distinctive character.",
    price: 1319000,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1563469018-0ad8c0892344?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "765cc Liquid-cooled, 12 valve, DOHC, in-line 3-cylinder",
      power: "121.36 PS @ 11,750 rpm",
      torque: "79 Nm @ 9,350 rpm",
      weight: "166 kg",
      fuelCapacity: "17.4 litres",
      topSpeed: "260 km/h"
    },
    colors: ["Matt Silver Ice", "Crystal White", "Sapphire Black"],
    inStock: true,
    isFeatured: false,
    isNew: false
  },
  {
    id: "9",
    name: "Multistrada V4 S",
    brand: "Ducati",
    category: "Adventure",
    description: "The Ducati Multistrada V4 S combines sport performance with adventure capability, featuring radar technology and a powerful V4 engine for versatility.",
    price: 2399000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "1158cc V4 Granturismo",
      power: "170 PS @ 10,500 rpm",
      torque: "125 Nm @ 8,750 rpm",
      weight: "215 kg",
      fuelCapacity: "22 litres",
      topSpeed: "250 km/h"
    },
    colors: ["Ducati Red", "Aviator Grey"],
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: "10",
    name: "R 1250 GS Adventure",
    brand: "BMW",
    category: "Adventure",
    description: "The BMW R 1250 GS Adventure is designed for long-distance travel with a robust build, excellent wind protection, and a powerful boxer engine with ShiftCam technology.",
    price: 2199000,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1627561553523-351abf89e9a9?q=80&w=1000&auto=format&fit=crop",
    specs: {
      engine: "1254cc Air/liquid-cooled flat twin boxer",
      power: "136 PS @ 7,750 rpm",
      torque: "143 Nm @ 6,250 rpm",
      weight: "268 kg",
      fuelCapacity: "30 litres",
      topSpeed: "220 km/h"
    },
    colors: ["Ice Grey", "Kalamata Metallic Matte", "Triple Black"],
    inStock: true,
    isFeatured: false,
    isNew: false
  }
];

// Generate more products to reach 70+ products
const generateMoreProducts = (): Product[] => {
  const additionalProducts: Product[] = [];
  
  // Create variations of existing products with different years or special editions
  for (let i = 0; i < 62; i++) {
    const baseProduct = products[i % products.length];
    const yearVariation = 2020 + (i % 5);
    
    additionalProducts.push({
      id: `${11 + i}`,
      name: `${baseProduct.name} ${yearVariation} ${i % 3 === 0 ? 'Special Edition' : ''}`,
      brand: baseProduct.brand,
      category: baseProduct.category,
      description: `${yearVariation} model of the ${baseProduct.description}`,
      price: baseProduct.price + (i * 10000 % 300000),
      discountPrice: i % 5 === 0 ? baseProduct.price * 0.9 : undefined,
      rating: Math.min(5, baseProduct.rating + (Math.random() * 0.4 - 0.2)),
      imageUrl: baseProduct.imageUrl,
      specs: {
        ...baseProduct.specs,
        power: `${parseInt(baseProduct.specs.power) + (i % 10)} PS @ ${13000 + (i % 2000)} rpm`
      },
      colors: [...baseProduct.colors, `Limited ${i % 2 === 0 ? 'Gold' : 'Silver'} Accent`],
      inStock: i % 7 !== 0, // Some products out of stock
      isFeatured: i % 15 === 0,
      isNew: i % 10 === 0
    });
  }
  
  return additionalProducts;
};

export const allProducts: Product[] = [...products, ...generateMoreProducts()];

export const featuredProducts: Product[] = allProducts.filter(product => product.isFeatured);
export const newArrivals: Product[] = allProducts.filter(product => product.isNew);
