
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CategoryShowcase from "../components/home/CategoryShowcase";
import TechSpecs from "../components/home/TechSpecs";
import Testimonials from "../components/home/Testimonials";
import PromoBanner from "../components/home/PromoBanner";
import { featuredProducts, newArrivals } from "../data/products";

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
      <Hero />
      <FeaturedProducts 
        products={featuredProducts.slice(0, 8)} 
        title="Featured Motorcycles"
        viewAllLink="/products" 
      />
      <CategoryShowcase />
      <TechSpecs />
      <FeaturedProducts 
        products={newArrivals.slice(0, 4)} 
        title="New Arrivals"
        viewAllLink="/products?filter=new" 
      />
      <Testimonials />
      <PromoBanner />
    </Layout>
  );
};

export default Index;
