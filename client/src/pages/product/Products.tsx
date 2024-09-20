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
import { Pencil, SquarePlus } from "lucide-react";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);
  const admin = localStorage.getItem(import.meta.env.VITE_ADMIN_TOKEN) ;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
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
          err.message == "Malformed token" ||
          err.message == "Token expired"
        ) {
          alert("Please login to view products");
        }
      });
  }, [navigate, setProducts]);

  return (
    <>
      <Navbar />
      <div className="">
        <SubHeader heading="Products" />
        {admin!=null && (
          <div className="flex px-16 mt-2">
            <Link to="/admin/add">
             <SquarePlus color="red" size={32}/>
            </Link>
          </div>)}
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 my-5 gap-10 p-10">
          {loading ? (
            <CardSkeleton count={3} />
          ) : (
            products.map((product) => (
              <Card
                className="flex flex-col justify-center items-center shadow-lg"
                key={product.id}
              >
                <CardHeader>
                  <img
                    src={product.imageUrl}
                    className="w-full max-h-60 rounded-lg"
                  />
                  <CardDescription className="text-xl flex justify-between items-center ">
                    <p className="font-bold text-xl">
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1)}
                    </p>
                    {admin!=null && (
                      <Link to={`/admin/update/${product.id}`}>
                        <Pencil size={20} color="green" />
                      </Link>
                    )}
                    <p className="text-xl font-bold">{product.price} ₹</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{truncateDescription(product.description, 20)}</p>
                </CardContent>
                <CardFooter>
                  <div className="grid grid-cols-2 gap-32 max-sm:gap-5 font-semibold w-full">
                    <Link to={`/product/details/${product.id}`}>
                      <Button variant={"secondary"} className="w-full">
                        Details
                      </Button>
                    </Link>
                    <AddToCartButton id={product.id} />
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Products;
