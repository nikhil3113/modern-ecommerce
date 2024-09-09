import React from "react";
import { toast } from "./hooks/use-toast";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userId } from "@/store/user";
import { itemsState } from "@/store/cart";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

const AddToCartButton = ({id}:{id:string | number}) => {
  const user_id = useRecoilValue(userId);
  const setCartItems = useSetRecoilState(itemsState);
  const handleAddToCard = (productId: number | string) => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/cart/add`,
        {
          user_id,
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        axios
          .get(`${import.meta.env.VITE_SERVER_URL}/cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setCartItems(res.data.items);
            toast({
              title: "Product added to cart successfully",
              variant: "success",
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        if (err.status == 403) {
          toast({
            title: "Please login to add products to cart",
            variant: "destructive",
          });
        }
      });
  };
  return (
    <Button onClick={() => handleAddToCard(id)} className="">
      <ShoppingBag className="mr-2" />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
