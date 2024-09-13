import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface PaymentProps {
  amount: number;
  clearCart: () => void;
}

const Payment = ({ amount, clearCart }: PaymentProps) => {
  const initPayment = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Ecommerce",
      description: "checking out",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = import.meta.env.VITE_SERVER_URL + "/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          if(data.message == "Payment Verified"){
            clearCart();
          }
          // console.log(data);
          // alert(data.message);
          toast({
            title: "Payment successfull",
            variant: "success",
          });
        } catch (error) {
          console.log(error);
          toast({
            title: "Payment failed",
            variant: "destructive",
          });
        }
      },
      prefill: {
        name: "Nikhil Chavan",
        email: "nihkil@example.com",
      },
      notes: {
        address: "Remote ",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error);
    });
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = import.meta.env.VITE_SERVER_URL + "/payment/order";
      const { data } = await axios.post(orderUrl, { amount });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Payment failed",
        variant: "destructive",
      });
    }
  };
  return <Button onClick={handlePayment}>Proceed</Button>;
};

export default Payment;
