import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { truncateDescription } from "@/lib/utils";
import { productState } from "@/store/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import CardSkeleton from "@/components/CardSkeleton";

const Home = () => {
  // const navigate = useNavigate();
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
        // console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [setProducts]);

  return (
    <>
      <Navbar />
      <div className="p-48 max-sm:p-20 max-sm:py-32 mt-5 text-center font-semibold">
        <h1 className="text-7xl max-sm:text-5xl font-suse ">Modern Mart</h1>
        <p className="mt-5 mb-5 text-base">
          Modern Ecommerce Website with Morder UI
        </p>
        <Link to={"/products"}>
          <Button size={"lg"} className="hover:bg-blue-800 text-[18px]">
            Explore
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-5xl font-suse pl-16 mt-48 font-semibold max-sm:text-4xl max-sm:pl-10">
          Features
        </h1>
        <div className="flex md:px-10 justify-evenly items-center my-10 ">
          <div className="xl:w-[40%] w-[80%] flex flex-col gap-5 shadow-xl p-4 border rounded-lg xl:shadow-none md:shadow-none xl:p-0 md:p-0 xl:border-none md:border-none ">
            <h1 className="font-semibold text-3xl">Razorpay Gateway</h1>
            <p className="">
              Experience safe and secure payments with Razorpay, a trusted and
              reliable payment gateway. Razorpay ensures complete protection of
              your sensitive information with advanced encryption technologies.
              Seamlessly integrated for hassle-free transactions, it supports
              multiple payment methods for your convenience. Your data privacy
              is our top priority, with strict security protocols in place.
              Choose Razorpay for a smooth and secure online payment experience.
            </p>
          </div>
          <img
            src="/images/razorpay.png"
            className="w-80 max-sm:hidden"
            alt=""
          />
        </div>
        <div className="flex  md:px-10 justify-evenly items-center my-10">
          <img src="/images/orders.png" className="w-80 max-sm:hidden" alt="" />
          <div className="xl:w-[40%] w-[80%] flex flex-col gap-5 shadow-xl p-4 border rounded-lg xl:shadow-none md:shadow-none xl:p-0 md:p-0 xl:border-none md:border-none ">
            <h1 className="font-semibold text-3xl">Order History</h1>
            <p className="  ">
              Track your order history easily on our platform. View details like
              your Order ID, total amount spent, and the date and time of each
              purchase. Stay informed about your past transactions and monitor
              your spending all in one place. Keep your order information
              organized and accessible for your convenience
            </p>
          </div>
        </div>
        <div className="flex  md:px-10 justify-evenly items-center my-10">
          <div className="xl:w-[40%] w-[80%] flex flex-col gap-5 shadow-xl p-4 border rounded-lg xl:shadow-none md:shadow-none xl:p-0 md:p-0 xl:border-none md:border-none ">
            <h1 className="font-semibold text-3xl">Reviews</h1>
            <p className="  ">
              Share your experience with our products! You can easily add a
              review, including a headline and a detailed description, to let
              others know what you think. Whether you loved it or found room for
              improvement, your feedback helps others make informed decisions.
              Rate the product and provide a helpful review to guide future
              buyers. Your opinion matters!
            </p>
          </div>
          <img
            src="/images/reviews.png"
            className="w-80 max-sm:hidden"
            alt=""
          />
        </div>
      </div>

      <div>
        <h1 className="text-5xl font-suse pl-16 mt-52 font-semibold max-sm:text-4xl max-sm:pl-10">
          Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-5 gap-10 p-10">
          {loading ? (
            <CardSkeleton count={3} />
          ) : (
            products.slice(0, 3).map((product) => (
              <Card
                className="flex flex-col justify-center items-center shadow-lg"
                key={product.id}
              >
                <CardHeader>
                  <img
                    src={product.imageUrl}
                    className="w-full h-60 rounded-lg"
                  />
                  <CardDescription className="text-xl ">
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{truncateDescription(product.description, 20)}</p>
                </CardContent>
                <CardFooter>
                  <div className="grid grid-cols-2 gap-44 max-sm:gap-5">
                    <p className="text-xl font-semibold max-sm:mt-2">
                      {product.price} ₹
                    </p>
                    <Link to={"/products"}>
                      <Button size={"default"} className="hover:bg-blue-800 ">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
