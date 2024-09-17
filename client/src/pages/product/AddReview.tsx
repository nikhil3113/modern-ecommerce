import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormFields from "@/components/FormFields";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

const formSchema = z.object({
  headline: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  content: z
    .string()
    .min(10, {
      message: "content must be at least 10 characters.",
    })
    .max(50, {
      message: "content must be at max 50 characters.",
    }),
});

const AddReview = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/comment/${productId}`, values,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_USER_TOKEN)}`,
        },
      })
      .then(() => {
        navigate("/product/details/" + productId);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast({
          title: err.response.data.message,
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl font-semibold mb-5">Add Review</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 shadow-xl p-10 rounded-lg w-[30%] max-sm:w-[80%] dark:border dark:border-gray-700 "
          >
            <FormFields
              name="headline"
              control={form.control}
              label="Enter Headline"
              placeholder="What's the most important to know"
            />
            <FormFields
              name="content"
              control={form.control}
              label="Description"
              placeholder="What you like or like? What did you use this peoduct for"
              type="textarea"
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </>
  );
};

export default AddReview;
