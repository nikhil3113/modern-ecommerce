import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormFields from "@/components/FormFields";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/admin/login`, values)
      .then((res) => {
        localStorage.setItem(`${import.meta.env.VITE_ADMIN_TOKEN}`, `${res.data.token}`);
        navigate("/");
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
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-3xl font-semibold mb-10">Admin Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 shadow-xl p-10 rounded-lg w-[30%] max-sm:w-[80%] border dark:border-gray-800"
          >
            <FormFields
              name="email"
              control={form.control}
              label="Email"
              placeholder="Email"
            />
            <FormFields
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter Password"
              type="password"
            />

            <Button type="submit">Submit</Button>
            <p>Don't Have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link></p>
          </form>
        </Form>
      </div>
      <Toaster />
    </>
  );
};

export default AdminLogin;
