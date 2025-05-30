
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../types";
import { formatPrice } from "../../utils/format";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden border animate-pulse">
            <div className="h-64 bg-muted"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id}
          className="overflow-hidden border transition-all duration-300 hover:shadow-lg group"
        >
          <div 
            className="relative h-64 overflow-hidden"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </Link>

            {/* Labels */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground">
                  NEW
                </span>
              )}
              {product.discountPrice && (
                <span className="px-2 py-1 text-xs font-semibold bg-destructive text-destructive-foreground">
                  SALE
                </span>
              )}
            </div>

            {/* Hover Quick Add */}
            <div 
              className={`
                absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm 
                px-4 py-3 transform transition-transform duration-300
                ${hoveredProduct === product.id ? "translate-y-0" : "translate-y-full"}
              `}
            >
              <Button 
                onClick={() => addToCart(product)} 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                {product.discountPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      {formatPrice(product.discountPrice)}
                    </span>
                    <span className="text-muted-foreground line-through text-sm">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-lg">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <svg 
                  className="text-yellow-500 w-4 h-4"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
