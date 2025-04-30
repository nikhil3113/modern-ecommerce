import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { productState } from "@/store/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { truncateDescription } from "@/lib/utils";
import SubHeader from "@/components/SubHeader";
import AddToCartButton from "@/components/AddToCartButton";
import CardSkeleton from "@/components/CardSkeleton";
import { motion } from "framer-motion";
import { Pencil, SquarePlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const admin = localStorage.getItem(import.meta.env.VITE_ADMIN_TOKEN);

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
        if (
          err.message === "Malformed token" ||
          err.message === "Token expired"
        ) {
          alert("Please login to view products");
        }
      });
  }, [navigate, setProducts]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="pt-8 px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SubHeader heading="Products" />
            </motion.div>

            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
              <div className="relative w-full md:w-96">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                {admin != null && (
                  <Link to="/admin/add">
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-4 shadow-md transition-all duration-300">
                      <SquarePlus size={20} />
                      <span>Add Product</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <CardSkeleton count={6} />
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-2xl font-medium text-gray-600 dark:text-gray-400">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-500">
                    Try adjusting your search
                  </p>
                </div>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden border-0 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-gray-800 dark:border-gray-700">
                      <div className="relative overflow-hidden group">
                        <img
                          src={product.imageUrl}
                          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={product.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                            <span className="text-white font-semibold bg-blue-600/90 py-1 px-3 rounded-full text-sm">
                              ₹{product.price}
                            </span>
                            {admin != null && (
                              <Link to={`/admin/update/${product.id}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-transparent"
                                >
                                  <Pencil size={14} className="mr-1" /> Edit
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      <CardHeader className="pb-2 pt-4">
                        <CardDescription className="flex justify-between items-center p-0">
                          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
                            {product.name.charAt(0).toUpperCase() +
                              product.name.slice(1)}
                          </h3>
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pb-4 flex-grow">
                        <p className="text-gray-600 dark:text-gray-300">
                          {truncateDescription(product.description, 20)}
                        </p>
                      </CardContent>

                      <CardFooter className="pt-0">
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <Link
                            to={`/product/details/${product.id}`}
                            className="w-full"
                          >
                            <Button
                              variant="outline"
                              className="w-full rounded-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                              Details
                            </Button>
                          </Link>
                          <div className="w-full">
                            <AddToCartButton id={product.id} />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Products;
