import AddToCartButton from "@/components/AddToCartButton";
import Navbar from "@/components/Navbar";
import SubHeader from "@/components/SubHeader";
import {
  ProductDescriptionState,
  ProductImageUrlState,
  ProductNamState,
  ProductPriceState,
} from "@/store/product";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

const ProductDetails = () => {
  const { id } = useParams();
  const [name, setName] = useRecoilState(ProductNamState);
  const [description, setDescription] = useRecoilState(ProductDescriptionState);
  const [imageUrl, setImageUrl] = useRecoilState(ProductImageUrlState);
  const [price, setPrice] = useRecoilState(ProductPriceState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/product/details/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.product.name);
        setDescription(res.data.product.description);
        setImageUrl(res.data.product.imageUrl);
        setPrice(res.data.product.price);
      })
      .catch((err) => {
        console.error(err);
        if (
          err.message == "Malformed token" ||
          err.message == "Token expired"
        ) {
          alert("Please login to view products");
        }
      });
  }, [id]);
  return (
    <>
      <Navbar />
      <SubHeader heading="Details" />
      <div className="flex mt-10 px-20 gap-10 max-sm:flex-col ">
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
      </div>
    </>
  );
};

export default ProductDetails;
