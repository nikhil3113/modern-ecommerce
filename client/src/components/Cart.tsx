import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { itemsState } from "@/store/cart";
import { userId } from "@/store/user";
import { toast } from "@/components/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Payment from "@/pages/Payment";

interface CartItemProps {
  id: number;
  quantity: number;
  product: {
    price: number;
    imageUrl: string;
    name: string;
  };
}

function Cart() {
  const [cartItems, setCartItems] = useRecoilState(itemsState);
  const user_Id = useSetRecoilState(userId);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        user_Id(res.data.userId);
        setCartItems(res.data.items);
        // console.log(cartItems)
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }, [navigate, setCartItems, user_Id]);

  const handleDeleteCartItem = (id: string | number) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/cart/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
        },
        data: {
          cartItemId: id,
        },
      })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error(err.response.data);
        toast({
          title: "Failed to delete item from cart",
          variant: "destructive",
        });
      });
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleDeleteCartItem(id);
      return;
    }

    axios
      .put(
        `${import.meta.env.VITE_SERVER_URL}/cart/update`,
        {
          cartItemId: id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
          },
        }
      )
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((err) => {
        console.error(err.response.data);
        toast({
          title: "Failed to update quantity",
          variant: "destructive",
        });
      });
  };

  const calculateTotal = (items: CartItemProps[]): number => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/cart/clear`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
        },
      })
      .then(() => {
        setCartItems([]);
      })
      .catch((err) => {
        console.error("Failed to clear cart", err.response?.data);
      });
  };

  const handleOrders = async (
    amount: string | number,
    cartId: string | number
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/order`,
        {
          amount,
          cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
          },
        }
      );
      console.log("Order created:", response.data);
      console.log(cartId, amount);
      clearCart();
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <ShoppingCart className="mt-8 text-xl cursor-pointer" size={38} />
          {cartItems.length > 0 && (
            <div className="absolute top-0 right-0 -mt-0  -mr-2  bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartItems.length}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            Check your cart and proceed to checkout
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {cartItems.length > 0
            ? cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-10 h-10 object-cover rounded-md mr-5"
                  />
                  <p className="flex-1 text-left text-[18px]">
                    {item.product.name}
                  </p>
                  <div className="flex items-center space-x-2 mr-5">
                    <Button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      variant="outline"
                    >
                      <Minus size={16} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      variant="outline"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  <Trash2
                    onClick={() => handleDeleteCartItem(item.id)}
                    className="cursor-pointer"
                    color="red"
                  />
                </div>
              ))
            : "No items in cart"}
        </div>
        <div className="flex justify-between px-4 py-2 border-t border-gray-200">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">{calculateTotal(cartItems)} ₹</span>
        </div>
        <DialogFooter>
          {cartItems.length > 0 && (
            <Payment
              amount={calculateTotal(cartItems)}
              onPaymentSuccess={() =>
                handleOrders(calculateTotal(cartItems), cartItems[0]?.cartId)
              }
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Cart;
