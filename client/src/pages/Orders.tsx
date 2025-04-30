import CardSkeleton from "@/components/CardSkeleton";
import Navbar from "@/components/Navbar";
import SubHeader from "@/components/SubHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PackageCheck, Calendar, Receipt, ShoppingBag } from "lucide-react";

interface Order {
  id: number;
  totalAmount: number;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_USER_TOKEN
          )}`,
        },
      })
      .then((res) => {
        setOrders(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto pt-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeader heading="My Orders" />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
              <CardSkeleton count={6} />
            </div>
          ) : orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="h-full border-0 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 h-2" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center">
                        <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <PackageCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Order #{order.id}
                          </h3>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0 px-3 py-1 text-xs font-medium rounded-full">
                        Paid
                      </Badge>
                    </CardHeader>

                    <CardContent className="pb-3 pt-2">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Receipt className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium">Amount:</span>
                          <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">
                            ₹{order.totalAmount.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium">Date:</span>
                          <span className="ml-2">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center max-w-md mx-auto"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here.
              </p>
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium transition-colors duration-200"
              >
                Browse Products
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
