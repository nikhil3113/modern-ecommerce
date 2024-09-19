import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { ArrowLeftToLine, LogInIcon } from "lucide-react";
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
    <div className="flex flex-wrap items-center justify-between mx-auto p-8">
      <div>
        <Link to={"/"}>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Logo
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-8 ">
        <TooltipProvider>
          {token ? (
            <div className="flex justify-center items-center gap-5">
              <Link to={"/orders"} className="text-xl font-semibold">Orders</Link>
              <UserDetails />
              <Tooltip>
                <TooltipTrigger asChild>
                  <ArrowLeftToLine
                    onClick={handleLogout}
                    className="cursor-pointer"
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
