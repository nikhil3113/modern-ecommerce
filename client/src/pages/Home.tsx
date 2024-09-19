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
        <h1 className="text-5xl font-suse pl-16 mt-52 font-semibold max-sm:text-4xl">
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

      <div>
        <h1 className="text-5xl font-suse pl-16 mt-52 font-semibold max-sm:text-4xl">
          Features
        </h1>
        <div className="flex flex-col xl:flex-row md:flex-row md:px-10 justify-center items-center my-10">
          <div className="xl:w-[60%] w-[80%] flex flex-col gap-7">
            <h1 className="font-semibold text-3xl">Razorpay Gateway</h1>
            <p className="xl:w-[70%]" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              vestibulum ac magna in ornare. In bibendum aliquet turpis, ac
              fermentum arcu accumsan vitae. Etiam sit amet sem arcu. Quisque et
              libero libero. Ut nec dui sed nisi mattis molestie sed eu mi.
              Mauris nec rhoncus augue, faucibus tincidunt quam. In quis massa
              nec ligula dignissim rutrum eget sed dolor.{" "}
            </p>
          </div>
          <img src="/images/razorpay.png"  className="w-80" alt="" />  
        </div>
      </div>
    </>
  );
};

export default Home;
