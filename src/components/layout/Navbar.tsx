
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useCart } from "../../contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Sun, 
  Moon, 
  X,
  Home,
  ChevronDown
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { categories } from "../../data/categories";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

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
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-racing-red to-black flex items-center justify-center shadow-lg hover:shadow-racing-red/30 transition-shadow">
            <span className="text-primary-foreground font-bold text-xl">VR</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-racing-red to-primary/80">
              VELOCITY RUSH
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground -mt-1">
              Premium Motorcycles
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-1 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/products">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Motorcycles
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/category/${category.id}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explore our {category.name.toLowerCase()} collection
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="text-foreground hover:text-primary transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center animate-pulse-light">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-foreground hover:text-primary">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-racing-red to-black flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xl">VR</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold tracking-tight">VELOCITY RUSH</span>
                      <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground -mt-1">
                        Premium Motorcycles
                      </span>
                    </div>
                  </Link>
                  <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link to="/" className="px-2 py-1 text-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/products" className="px-2 py-1 text-foreground hover:text-primary transition-colors">
                      All Motorcycles
                    </Link>
                  </SheetClose>
                  <div className="px-2 py-1">
                    <div className="font-medium mb-2 flex items-center">
                      Categories <ChevronDown className="h-4 w-4 ml-1" />
                    </div>
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
