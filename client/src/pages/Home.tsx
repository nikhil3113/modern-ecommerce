import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { truncateDescription } from "@/lib/utils";
import { productState } from "@/store/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import CardSkeleton from "@/components/CardSkeleton";
import { motion } from "framer-motion";
import { ShoppingBag, Shield, History, Star } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_USER_TOKEN
          )}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [setProducts]);

  return (
    <>
      <Navbar />
      {/* Hero Section with gradient background - Dark mode optimized */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24 md:py-32 px-6 md:px-12 lg:px-24 mt-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text font-suse">
            Modern Mart
          </h1>
          <p className="mt-6 mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Discover the next generation shopping experience with our modern UI
            and seamless checkout process
          </p>
          <Link to={"/products"}>
            <Button
              size={"lg"}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Explore Products
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section - Dark mode optimized */}
      <div className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            Why Choose Modern Mart?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            {/* Feature 1 - Dark mode optimized */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex gap-6 p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-md dark:shadow-gray-800/30"
            >
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-300">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-2xl mb-3 text-gray-800 dark:text-white">
                  Secure Payments
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Experience safe and secure payments with Razorpay, a trusted
                  and reliable payment gateway with advanced encryption
                  technologies. Multiple payment methods supported for your
                  convenience.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 - Dark mode optimized */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex gap-6 p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-md dark:shadow-gray-800/30"
            >
              <div className="flex-shrink-0">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-300">
                  <History className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-2xl mb-3 text-gray-800 dark:text-white">
                  Order History
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your order history with details like Order ID, amount
                  spent, and purchase time. Stay informed about transactions and
                  keep your order information organized.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 - Dark mode optimized */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex gap-6 p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-md dark:shadow-gray-800/30 md:col-span-2"
            >
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-300">
                  <Star className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-2xl mb-3 text-gray-800 dark:text-white">
                  Customer Reviews
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your experience with our products! Add reviews with
                  headlines and descriptions to help others make informed
                  decisions. Your feedback matters and helps us improve.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Products Section - Dark mode optimized */}
      <div className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading ? (
              <CardSkeleton count={3} />
            ) : (
              products.slice(0, 3).map((product, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  key={product.id}
                >
                  <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl dark:bg-gray-800 dark:shadow-gray-900/50">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        alt={product.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white">
                          <p className="font-medium text-lg">
                            {product.name.charAt(0).toUpperCase() +
                              product.name.slice(1)}
                          </p>
                          <p className="text-sm opacity-80">
                            {truncateDescription(product.description, 20)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4 dark:text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {truncateDescription(product.description, 15)}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{product.price}
                      </p>
                      <Link to={`/product/details/${product.id}`}>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 rounded-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/50"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* CTA Section - Dark mode optimized */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 py-16 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers who choose Modern Mart for
            quality products and exceptional service.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 rounded-full px-8 shadow-lg"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer - Dark mode optimized */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Modern Mart
            </h3>
            <p className="opacity-70 dark:opacity-80">
              Your one-stop shop for modern products with an exceptional
              shopping experience.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">
              Quick Links
            </h4>
            <ul className="space-y-2 opacity-70 dark:opacity-80">
              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300">
              Contact Us
            </h4>
            <p className="opacity-70 dark:opacity-80">
              Email: info@modernmart.com
            </p>
            <p className="opacity-70 dark:opacity-80">Phone: +1 234 567 890</p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center opacity-70 dark:opacity-60">
          <p>© {new Date().getFullYear()} Modern Mart. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
