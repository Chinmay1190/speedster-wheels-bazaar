
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeaturedProducts from "../components/home/FeaturedProducts";
import { useCart } from "../contexts/CartContext";
import { allProducts } from "../data/products";
import { Product } from "../types";
import { formatPrice } from "../utils/format";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API fetch
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = allProducts.find((p) => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        setActiveImage(foundProduct.imageUrl);
        
        // Get related products from same brand or category
        const related = allProducts
          .filter(p => 
            (p.brand === foundProduct.brand || p.category === foundProduct.category) && 
            p.id !== foundProduct.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`);
    }
  };
  
  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value, 10));
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[500px] bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-12 bg-muted rounded w-1/3"></div>
                <div className="h-24 bg-muted rounded w-full"></div>
                <div className="h-12 bg-muted rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            We couldn't find the product you're looking for.
          </p>
          <Link to="/products">
            <Button>Back to All Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link to="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link 
                to={`/category/${product.category}`} 
                className="text-muted-foreground hover:text-foreground"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden border">
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-cover" 
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground">
                  NEW
                </span>
              )}
              {product.discountPrice && (
                <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold bg-destructive text-destructive-foreground">
                  SALE
                </span>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            <div className="flex space-x-2">
              <button
                className={`relative w-24 h-24 rounded-md overflow-hidden border transition ${
                  activeImage === product.imageUrl ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(product.imageUrl)}
              >
                <img 
                  src={product.imageUrl} 
                  alt={`${product.name} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </button>
              {product.galleryImages?.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-24 h-24 rounded-md overflow-hidden border transition ${
                    activeImage === image ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-1 text-sm text-muted-foreground">{product.brand}</div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? "text-yellow-500" 
                        : "text-gray-300"
                    }`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-muted-foreground text-sm">{product.rating} Rating</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-3">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-destructive text-destructive-foreground rounded">
                    SAVE {Math.round((1 - product.discountPrice / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Price inclusive of all taxes. Free delivery across India.
              </p>
            </div>
            
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            {/* Color selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-3 py-2 border rounded-md text-sm ${
                      selectedColor === color 
                        ? "border-primary bg-primary/10" 
                        : "border-input hover:border-primary"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Stock status */}
            <div className="mb-6">
              <p className={`flex items-center ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${product.inStock ? "bg-green-600" : "bg-destructive"}`}></span>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            
            {/* Add to cart */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Select 
                  defaultValue="1" 
                  onValueChange={handleQuantityChange}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Add to Cart
                </Button>
                
                <Button variant="outline">
                  <svg 
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </Button>
              </div>
            )}
            
            {/* Delivery options */}
            <div className="p-4 bg-muted rounded-lg mb-6">
              <h3 className="font-medium mb-3">Delivery Options</h3>
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-5 h-5 text-muted-foreground mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <div>
                  <p className="text-sm">Check delivery availability</p>
                  <div className="mt-1 flex items-center">
                    <input 
                      type="text" 
                      placeholder="Enter Pincode"
                      className="px-3 py-1 text-sm rounded-l-md border border-input bg-background" 
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="rounded-l-none h-[30px]"
                    >
                      Check
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Engine & Performance</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Engine</span>
                          <span className="font-medium">{product.specs.engine}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Maximum Power</span>
                          <span className="font-medium">{product.specs.power}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Maximum Torque</span>
                          <span className="font-medium">{product.specs.torque}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Top Speed</span>
                          <span className="font-medium">{product.specs.topSpeed}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Dimensions & Capacity</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Kerb Weight</span>
                          <span className="font-medium">{product.specs.weight}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Capacity</span>
                          <span className="font-medium">{product.specs.fuelCapacity}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-3">Electronics & Controls</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Advanced Rider Assistance Systems</li>
                      <li>Multiple Riding Modes</li>
                      <li>Cornering ABS</li>
                      <li>Traction Control System</li>
                      <li>Wheelie Control</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Comfort & Convenience</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Adjustable Windscreen</li>
                      <li>Cruise Control</li>
                      <li>Bluetooth Connectivity</li>
                      <li>Tire Pressure Monitoring System</li>
                      <li>LED Lighting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Rahul Singh</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < 5 ? "text-yellow-500" : "text-gray-300"}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">1 month ago</p>
                    <p>
                      Incredible performance and handling. The design turns heads everywhere I go.
                      Worth every rupee spent. Service experience has been great too.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Priya Mehta</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">3 months ago</p>
                    <p>
                      Beautiful motorcycle with advanced electronics. Removes one star only because
                      the seat gets uncomfortable on longer rides. Otherwise perfect.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <Separator className="my-12" />
        
        {/* Related Products */}
        <FeaturedProducts 
          products={relatedProducts} 
          title="You Might Also Like"
        />
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
