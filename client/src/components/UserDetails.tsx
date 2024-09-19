import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "./hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

function UserDetails() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_USER_TOKEN
          )}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdate = () => {
    axios
      .put(
        `${import.meta.env.VITE_SERVER_URL}/user/update`,
        {
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              import.meta.env.VITE_USER_TOKEN
            )}`,
          },
        }
      )
      .then(() => {
        toast({
          title: "UserName Updated",
          variant: "success",
        });
      });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="ml-4 rounded-2xl p-[5px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <User className="cursor-pointer " size={28} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-center mb-1">Profile</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              className="col-span-3 bg-gray-900"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right ">
              Name
            </Label>
            <Input
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleUpdate}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      <Toaster />
    </Sheet>
  );
}
export default UserDetails;
