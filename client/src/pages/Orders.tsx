import CardSkeleton from "@/components/CardSkeleton";
import Navbar from "@/components/Navbar";
import SubHeader from "@/components/SubHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

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
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <SubHeader heading="My Orders" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-5 px-5">
        {loading ? (
          <CardSkeleton count={6} />
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="shadow-lg font-semibold">
              <CardHeader>Order id: {order.id}</CardHeader>
              <CardContent>Amount: {order.totalAmount}</CardContent>
              <CardFooter className="flex justify-between">
                <p>
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <Badge variant={"success"} className="px-4 py-1 text-[12px]">
                  Paid
                </Badge>
              </CardFooter>
            </Card>
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Orders;
