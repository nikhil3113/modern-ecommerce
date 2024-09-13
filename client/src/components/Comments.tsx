import { comments } from "@/store/comment";
import axios from "axios";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import CardSkeleton from "./CardSkeleton";

interface CommentsProps {
  productId: string | undefined;
}
interface User{
  username:string;
  }
interface Comments {
  id: string;
  content: string;
  createdAt: string;
  headline: string;
  user: User
}

const Comments = ({ productId }: CommentsProps) => {
  const [comment, setComment] = useRecoilState(comments);
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
  }, [productId]);
  return (
    <div>
      {loading ? (
        <Skeleton className="h-7 w-[100px] mt-10" />
      ) : (
        <div className="flex justify-between items-center mt-20">
          {/* <p className="text-3xl font-semibold font-suse mt-20">Reviews</p> */}
          <Link to={`/product/create-review/${productId}`}>
            <Button>Add a Review</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-5 my-10">
        {loading ? (
          <CardSkeleton count={3} />
        ) : (
          comment.map((c:Comments) => {
            return (
              <div key={c.id} className="flex flex-col gap-2 px-5 xl:px-20 md:px-10">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {c.user.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{c.user.username}</p>
                </div>
                <div className="px-10 max-sm:px-0">
                  <p className="font-semibold">
                    {c.headline.charAt(0).toUpperCase() +
                      c.headline.slice(1)}
                  </p>
                  <p className="font-semibold mb-2">
                    {new Date(c.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    {c.content.charAt(0).toUpperCase() +
                      c.content.slice(1)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comments;
