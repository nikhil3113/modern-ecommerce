import { Skeleton } from "./ui/skeleton";
interface ShimmerProps {
  count: number;
}

const CardSkeleton = ({ count }: ShimmerProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="flex flex-col space-y-3 justify-center items-center"
          key={index}
        >
          <Skeleton className="h-[175px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
