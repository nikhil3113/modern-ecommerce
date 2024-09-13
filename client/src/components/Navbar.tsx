import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { ArrowLeftToLine, LogInIcon } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Tooltip } from "./ui/tooltip";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
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
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/login"} className="font-semibold cursor-pointer">
                  <LogInIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-center">Logout</p>
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
