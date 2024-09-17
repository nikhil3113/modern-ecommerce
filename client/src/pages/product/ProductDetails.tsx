import AddToCartButton from "@/components/AddToCartButton";
import Comments from "@/components/Comments";
import Navbar from "@/components/Navbar";
import SubHeader from "@/components/SubHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import {
  ProductDescriptionState,
  ProductImageUrlState,
  ProductNamState,
  ProductPriceState,
} from "@/store/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

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
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
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
      <SubHeader heading="Details" />
      <div className="flex mt-10 px-8 xl:px-20 md:px-20 gap-10 flex-col xl:flex-row md:flex-col  ">
        {loading ? (
          <>
            <Skeleton className="w-[200px] h-[150px] xl:w-[500px] xl:h-[400px] md:w-[300px] xl:mb-5" />
            <div className="space-y-2 xl:space-y-5 flex flex-col justify-center items-center">
              <Skeleton className="h-4 w-[200px] xl:w-[500px]" />
              <Skeleton className="h-4 w-[200px] xl:w-[500px]" />
              <Skeleton className="h-4 w-[200px] xl:w-[500px] " />
              <Skeleton className="h-4 w-[200px] xl:w-[500px] " />
            </div>
          </>
        ) : (
          <>
            {" "}
            <img
              src={imageUrl}
              alt={name}
              className="w-full rounded-lg shadow-xl max-w-[700px] "
            />
            <div className="flex flex-col gap-10 pr-32 max-sm:pr-0">
              <p className="text-4xl font-bold ">{name}</p>
              <p className="font-semibold">{description}</p>
              <div className="flex-grow"></div>

              <div className="flex justify-between max-sm:flex-col max-sm:gap-5 max-sm:mb-10">
                <p className="text-2xl font-semibold">{price} ₹</p>
                <AddToCartButton id={id} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-5 xl:px-32 md:px-5">
        <Comments productId={id} />
      </div>
      <Toaster />
    </>
  );
};

export default ProductDetails;
