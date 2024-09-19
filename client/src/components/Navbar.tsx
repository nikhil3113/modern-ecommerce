import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { ArrowLeftToLine, LogInIcon, ShoppingCart } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Tooltip } from "./ui/tooltip";
import UserDetails from "./UserDetails";

const Navbar = () => {
  const token = localStorage.getItem(import.meta.env.VITE_USER_TOKEN);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_USER_TOKEN);
    localStorage.removeItem(import.meta.env.VITE_ADMIN_TOKEN);
    navigate("/");
  };
  return (
    <div className="flex flex-wrap items-center justify-between mx-auto ">
      <div>
        <Link to={"/"}>
          {/* <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Logo
          </span> */}
          <img src="/images/logo.png" width={125} />
        </Link>
      </div>

      <div className="flex items-center space-x-8 max-sm:space-x-5 px-5">
        <TooltipProvider>
          {token ? (
            <div className="flex justify-center items-center gap-5 max-sm:gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={"/orders"} className="text-xl font-semibold">
                    <ShoppingCart size={28} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-center">Orders</p>
                </TooltipContent>
              </Tooltip>
              <UserDetails />
              <Tooltip>
                <TooltipTrigger asChild>
                  <ArrowLeftToLine
                    onClick={handleLogout}
                    className="cursor-pointer"
                    size={28} 
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-center">Logout</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/login"} className="font-semibold cursor-pointer">
                  <LogInIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-center">Login</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
