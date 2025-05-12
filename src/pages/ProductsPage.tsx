
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductGrid from "../components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { allProducts } from "../data/products";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { Product } from "../types";
import { formatPrice } from "../utils/format";

const ProductsPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  
  // Get min and max price for range
  const minPrice = 0;
  const maxPrice = 3500000;
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Simulate loading
    setLoading(true);
    
    // Parse URL search params
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const inStockParam = searchParams.get("inStock");
    const sortParam = searchParams.get("sort");
    const filterParam = searchParams.get("filter");
    
    // Set initial filters from URL
    if (brandParam) setSelectedBrands(brandParam.split(","));
    if (categoryParam) setSelectedCategories(categoryParam.split(","));
    if (minPriceParam && maxPriceParam) {
      setPriceRange([parseInt(minPriceParam, 10), parseInt(maxPriceParam, 10)]);
    }
    if (inStockParam) setInStockOnly(inStockParam === "true");
    if (sortParam) setSortOption(sortParam);
    
    // Special filter handling (new, featured)
    if (filterParam === "new") {
      // Handle new products filter
    } else if (filterParam === "featured") {
      // Handle featured products filter
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.search, searchParams]);
  
  // Apply filters and sort
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filtered = filtered.filter(product => product.isNew).concat(
          filtered.filter(product => !product.isNew)
        );
        break;
      case "featured":
      default:
        filtered = filtered.filter(product => product.isFeatured).concat(
          filtered.filter(product => !product.isFeatured)
        );
    }
    
    setFilteredProducts(filtered);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    if (inStockOnly) params.set("inStock", "true");
    params.set("sort", sortOption);
    
    setSearchParams(params, { replace: true });
  }, [selectedBrands, selectedCategories, priceRange, inStockOnly, sortOption, setSearchParams]);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setInStockOnly(false);
    setSortOption("featured");
  };
  
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">All Motorcycles</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Mobile */}
            <div className="lg:hidden mb-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="filters">
                  <AccordionTrigger>Filters</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      {/* Mobile Brand Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Brands</h3>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand.id} className="flex items-center">
                              <Checkbox
                                id={`brand-mobile-${brand.id}`}
                                checked={selectedBrands.includes(brand.name)}
                                onCheckedChange={() => handleBrandChange(brand.name)}
                              />
                              <label
                                htmlFor={`brand-mobile-${brand.id}`}
                                className="ml-2 text-sm"
                              >
                                {brand.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Mobile Category Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center">
                              <Checkbox
                                id={`category-mobile-${category.id}`}
                                checked={selectedCategories.includes(category.name)}
                                onCheckedChange={() => handleCategoryChange(category.name)}
                              />
                              <label
                                htmlFor={`category-mobile-${category.id}`}
                                className="ml-2 text-sm"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Mobile Price Range Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Price Range</h3>
                        <Slider
                          defaultValue={priceRange}
                          min={minPrice}
                          max={maxPrice}
                          step={10000}
                          onValueChange={handlePriceChange}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                      
                      {/* Mobile Stock Filter */}
                      <div>
                        <div className="flex items-center">
                          <Checkbox
                            id="in-stock-mobile"
                            checked={inStockOnly}
                            onCheckedChange={(checked) => setInStockOnly(!!checked)}
                          />
                          <label htmlFor="in-stock-mobile" className="ml-2">
                            In Stock Only
                          </label>
                        </div>
                      </div>
                      
                      <Button onClick={clearFilters} variant="outline" size="sm">
                        Clear Filters
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <Button onClick={clearFilters} variant="ghost" size="sm">
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Brand Filter */}
                    <div>
                      <h3 className="font-semibold mb-3">Brands</h3>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <div key={brand.id} className="flex items-center">
                            <Checkbox
                              id={`brand-${brand.id}`}
                              checked={selectedBrands.includes(brand.name)}
                              onCheckedChange={() => handleBrandChange(brand.name)}
                            />
                            <label
                              htmlFor={`brand-${brand.id}`}
                              className="ml-2 text-sm"
                            >
                              {brand.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Category Filter */}
                    <div>
                      <h3 className="font-semibold mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.name)}
                              onCheckedChange={() => handleCategoryChange(category.name)}
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="ml-2 text-sm"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div>
                      <h3 className="font-semibold mb-3">Price Range</h3>
                      <Slider
                        defaultValue={priceRange}
                        min={minPrice}
                        max={maxPrice}
                        step={10000}
                        onValueChange={handlePriceChange}
                        className="mb-6"
                      />
                      <div className="flex justify-between text-sm">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                    
                    {/* Stock Filter */}
                    <div>
                      <div className="flex items-center">
                        <Checkbox
                          id="in-stock"
                          checked={inStockOnly}
                          onCheckedChange={(checked) => setInStockOnly(!!checked)}
                        />
                        <label htmlFor="in-stock" className="ml-2">
                          In Stock Only
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Listing */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-muted-foreground mb-4 sm:mb-0">
                  Showing {filteredProducts.length} products
                </p>
                
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <ProductGrid products={filteredProducts} loading={loading} />
              
              {filteredProducts.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
