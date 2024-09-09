import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormFields from "@/components/FormFields";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  price: z.coerce.number(),
  // imageUrl: z.string().min(6, {
  //   message: "Password must be at least 6 characters.",
  // }),
});

const AddProduct = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Cloudinary example

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD
          }/image/upload`,
          formData
        );
        setImageUrl(response.data.secure_url); // Get image URL from response
        console.log(response.data.secure_url);
      } catch (error) {
        toast({
          title: "Error uploading image",
          description: "Please try again.",
          variant: "destructive",
        });
        console.log(error);
      }
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const productData = { ...values, imageUrl };
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/product/add`, productData)
      .then((res) => {
        localStorage.setItem("token", `${res.data.token}`);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast({
          title: err.response.data.message,
          variant: "destructive",
        });
      });
    console.log(productData);
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl font-semibold mb-5">AddProduct</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 shadow-xl p-10 rounded-lg w-[30%] max-sm:w-[80%] dark:border dark:border-gray-700 "
          >
            <FormFields
              name="name"
              control={form.control}
              label="Product Name"
              placeholder="Enter ProductName"
            />
            <FormFields
              name="description"
              control={form.control}
              label="Description"
              placeholder="Enter Description"
              type="textarea"
            />
            <FormFields
              name="price"
              control={form.control}
              label="Price"
              placeholder="Enter Price in ₹"
              type="number"
            />
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className=""
                onChange={handleImageUpload}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </>
  );
};

export default AddProduct;
