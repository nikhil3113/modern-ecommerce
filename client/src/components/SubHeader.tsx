import { ArrowLeft } from "lucide-react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

interface SubHeaderProps {
  heading: string;
}

const SubHeader = ({ heading }: SubHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-16 max-sm:flex-col max-sm:px-10">
      <div className="flex justify-center items-center max-sm:justify-start gap-5 max-sm:gap-2">
        <ArrowLeft
          size={32}
          className="mt-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="mt-5 text-5xl font-semibold font-suse max-sm:text-3xl">
          {heading}
        </h1>
      </div>
      <div className="max-sm:w-10">
        <Cart />
      </div>
    </div>
  );
};

export default SubHeader;
