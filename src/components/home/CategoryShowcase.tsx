
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categories } from "../../data/categories";

export default function CategoryShowcase() {
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Browse By Category</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of motorcycles categorized by riding style.
            From aggressive sport bikes to comfortable cruisers, we have the perfect ride for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.id}`} 
              key={category.id}
              className="block"
              onMouseEnter={() => setHoverCategory(category.id)}
              onMouseLeave={() => setHoverCategory(null)}
            >
              <div className="relative h-64 rounded-lg overflow-hidden group">
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className={`
                    w-full h-full object-cover transition-transform duration-700
                    ${hoverCategory === category.id ? 'scale-110' : 'scale-100'}
                  `}
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                  <div 
                    className={`
                      transition-all duration-300
                      ${hoverCategory === category.id ? 'opacity-100' : 'opacity-0'}
                    `}
                  >
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      View Collection
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
