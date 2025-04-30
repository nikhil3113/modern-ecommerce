import { comments } from "@/store/comment";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import CardSkeleton from "./CardSkeleton";
import { motion } from "framer-motion";
import { MessageSquarePlus, Star } from "lucide-react";

interface CommentsProps {
  productId: string | undefined;
}

interface User {
  username: string;
}

interface CommentsTypes {
  id: string;
  content: string;
  createdAt: string;
  headline: string;
  user: User;
  length?:string
}

const Comments = ({ productId }: CommentsProps) => {
  const [comment, setComment] = useRecoilState<CommentsTypes[]>(comments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/comment/${productId}`)
      .then((res) => {
        setComment(res.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [productId, setComment]);

  // Generate random rating for demo purposes (would be replaced with actual ratings)
  const getRandomRating = () => Math.floor(Math.random() * 2) + 4; // 4 or 5 stars

  return (
    <div className="mt-8">
      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-10 w-[150px] rounded-full" />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
            </div>
            <Link to={`/product/create-review/${productId}`}>
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 px-5">
                <MessageSquarePlus size={18} className="mr-2" />
                Write a Review
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton count={3} />
        </div>
      ) : comment.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center"
        >
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <MessageSquarePlus
              size={28}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Be the first to share your thoughts about this product
          </p>
          <Link to={`/product/create-review/${productId}`}>
            <Button className="rounded-full">Write a Review</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comment.map((c: CommentsTypes, index) => {
            const rating = getRandomRating();
            const randomColor = `hsl(${Math.floor(
              Math.random() * 360
            )}, 65%, 35%)`;

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-white shadow-sm">
                        <AvatarFallback
                          style={{ backgroundColor: randomColor }}
                          className="text-white"
                        >
                          {c.user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.user.username}`}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {c.user.username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(c.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md text-xs font-medium text-blue-700 dark:text-blue-300">
                      Verified
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-700"
                        }
                      />
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {c.headline.charAt(0).toUpperCase() + c.headline.slice(1)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {c.content.charAt(0).toUpperCase() + c.content.slice(1)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;
