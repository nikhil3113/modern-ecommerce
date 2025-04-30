import AddToCartButton from "@/components/AddToCartButton";
import Comments from "@/components/Comments";
import Navbar from "@/components/Navbar";
import SubHeader from "@/components/SubHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";

import {
  ProductDescriptionState,
  ProductImageUrlState,
  ProductNamState,
  ProductPriceState,
} from "@/store/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Heart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [name, setName] = useRecoilState(ProductNamState);
  const [description, setDescription] = useRecoilState(ProductDescriptionState);
  const [imageUrl, setImageUrl] = useRecoilState(ProductImageUrlState);
  const [price, setPrice] = useRecoilState(ProductPriceState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/product/details/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_USER_TOKEN
          )}`,
        },
      })
      .then((res) => {
        setName(res.data.product.name);
        setDescription(res.data.product.description);
        setImageUrl(res.data.product.imageUrl);
        setPrice(res.data.product.price);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (
          err.message == "Malformed token" ||
          err.message == "Token expired"
        ) {
          alert("Please login to view products");
        }
      });
  }, [id, setDescription, setImageUrl, setName, setPrice]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto pt-8 px-6 md:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300">
              {loading ? "Loading..." : name}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SubHeader heading="Product Details" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {loading ? (
              <>
                <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Skeleton className="w-full aspect-square" />
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-6 w-1/3" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="pt-6">
                    <Skeleton className="h-12 w-full rounded-full" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                >
                  <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <button className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full text-rose-500 hover:bg-white hover:text-rose-600 dark:hover:bg-gray-700 transition-all duration-300">
                    <Heart size={20} />
                  </button>
                  <div className="absolute left-4 top-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-500/90 backdrop-blur-sm text-white border-0 px-3 py-1"
                    >
                      New Arrival
                    </Badge>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col"
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </h1>

                  <div className="flex items-center mt-4 mb-6">
                    <span className="text-green-600 dark:text-green-500 text-sm font-medium">
                      In Stock
                    </span>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      Description
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5 mt-auto">
                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <Truck
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Free delivery on orders over ₹500
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ShieldCheck
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          1 Year Warranty
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Price
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ₹{price}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ₹{Math.round(price * 1.2)}
                          </span>
                        </div>
                      </div>
                      <div className="w-[180px]">
                        <AddToCartButton id={id} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* Comments section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
              <Comments productId={id} />
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ProductDetails;
