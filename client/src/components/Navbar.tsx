import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import {
  ArrowLeftToLine,
  LogInIcon,
  Menu,
  X,
  HomeIcon,
  PackageOpen,
  User,
  Ticket,
} from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Tooltip } from "./ui/tooltip";
import UserDetails from "./UserDetails";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const Navbar = () => {
  const token = localStorage.getItem(import.meta.env.VITE_USER_TOKEN);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_USER_TOKEN);
    localStorage.removeItem(import.meta.env.VITE_ADMIN_TOKEN);
    navigate("/");
  };

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"} className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Modern Mart"
                className="h-20 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Products
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <TooltipProvider>
              {token ? (
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/orders"
                        className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <Ticket size={20} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Orders</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="hidden md:block">
                    <UserDetails />
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleLogout}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <ArrowLeftToLine size={20} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogInIcon size={18} />
                    <span className="hidden md:inline">Login</span>
                  </Button>
                </Link>
              )}
            </TooltipProvider>

            <div className="flex items-center pl-3 border-l border-gray-200 dark:border-gray-700">
              <ModeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HomeIcon size={18} />
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PackageOpen size={18} />
                Products
              </Link>
              {token && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <div className="md:hidden px-3 py-2">
                    <UserDetails />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
