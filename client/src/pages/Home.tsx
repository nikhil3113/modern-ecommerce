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
import {
  Shield,
  History,
  Star,
  ArrowRight,
  Sparkles,
  ShoppingCart,
} from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px] dark:opacity-10"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 lg:px-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>New Collection Available</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10bda4] via-[#b0d456] to-[#f7c407] ">
              Modern Shopping
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 mb-10 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the seamless fusion of aesthetic design and effortless
            checkout. Curated products for the modern lifestyle.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to={"/products"}>
              <Button
                size="lg"
                className="h-14 px-8 rounded-full text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 py-24 px-6 lg:px-24 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Modern Mart?
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Everything you need for a perfect shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                desc: "Bank-grade encryption with Razorpay integration.",
                color: "text-blue-500",
                bg: "bg-blue-50 dark:bg-blue-900/20",
              },
              {
                icon: History,
                title: "Smart History",
                desc: "Track orders in real-time with detailed analytics.",
                color: "text-purple-500",
                bg: "bg-purple-50 dark:bg-purple-900/20",
              },
              {
                icon: Star,
                title: "Verified Reviews",
                desc: "Community driven ratings you can actually trust.",
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-900/20",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 py-24 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Trending Now
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Top picks for this week
              </p>
            </div>
            <Link to="/products">
              <Button
                variant="ghost"
                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
              >
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <CardSkeleton count={3} />
            ) : (
              products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden rounded-3xl hover:shadow-2xl transition-all duration-500">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link to={`/product/details/${product.id}`}>
                          <Button className="rounded-full bg-white text-black hover:bg-slate-200 border-none">
                            View Details
                          </Button>
                        </Link>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        New
                      </div>
                    </div>

                    <CardContent className="pt-6 px-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate pr-4">
                          {product.name}
                        </h3>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{product.price}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                        {truncateDescription(product.description, 20)}
                      </p>
                    </CardContent>

                    <CardFooter className="px-6 pb-6 pt-0">
                      <Link
                        to={`/product/details/${product.id}`}
                        className="w-full"
                      >
                        <Button className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors duration-300 rounded-xl group-hover:shadow-lg">
                          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-24 pb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 dark:bg-indigo-950 px-6 py-20 text-center shadow-2xl">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ready to elevate your lifestyle?
            </h2>
            <p className="text-slate-300 text-lg">
              Join thousands of satisfied customers who choose Modern Mart.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                className="h-14 px-10 bg-white text-slate-900 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 rounded-full text-lg font-semibold"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text mb-4">
              Modern Mart
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Curating the best products for the modern world. Quality, speed,
              and aesthetics in one place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/products"
                  className="hover:text-indigo-500 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">
              Stay Updated
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <Button
                size="sm"
                className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Modern Mart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
