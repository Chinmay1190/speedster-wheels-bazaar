
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useCart } from "../../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Sun, 
  Moon, 
  X 
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { categories } from "../../data/categories";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">SB</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden md:inline-block">
            SuperBikes
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
            All Bikes
          </Link>
          <div className="group relative inline-block">
            <button className="flex items-center text-foreground hover:text-primary transition-colors font-medium">
              Categories
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div className="hidden group-hover:block absolute z-10 w-48 mt-2 bg-background border border-border rounded-md shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground hover:text-primary">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:text-primary">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xl">SB</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">SuperBikes</span>
                  </Link>
                  <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link to="/" className="px-2 py-1 text-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/products" className="px-2 py-1 text-foreground hover:text-primary transition-colors">
                      All Bikes
                    </Link>
                  </SheetClose>
                  <div className="px-2 py-1">
                    <div className="font-medium mb-2">Categories</div>
                    <div className="pl-4 space-y-2">
                      {categories.map((category) => (
                        <SheetClose key={category.id} asChild>
                          <Link 
                            to={`/category/${category.id}`}
                            className="block text-sm text-foreground hover:text-primary transition-colors"
                          >
                            {category.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Link to="/about" className="px-2 py-1 text-foreground hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contact" className="px-2 py-1 text-foreground hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </SheetClose>
                </nav>
                <div className="mt-auto pt-6 border-t border-border">
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={toggleTheme} className="w-full">
                      {theme === "dark" ? (
                        <><Sun className="mr-2 h-4 w-4" /> Light Mode</>
                      ) : (
                        <><Moon className="mr-2 h-4 w-4" /> Dark Mode</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
