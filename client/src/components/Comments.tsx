import { comments } from "@/store/comment";
import axios from "axios";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface CommentsProps {
  productId: string | undefined;
}

const Comments = ({ productId }: CommentsProps) => {
  const [comment, setComment] = useRecoilState(comments);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/comment/${productId}`)
      .then((res) => {
        console.log(res.data.comments);
        setComment(res.data.comments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);
  return (
    <div>
      <div className="flex justify-between items-center mt-20">
        {/* <p className="text-3xl font-semibold font-suse mt-20">Reviews</p> */}
        <Link to={`/product/create-review/${productId}`}>
          <Button>Add a Review</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-1 gap-5 my-10">
        {comment.map((comment: any) => {
          return (
            <div key={comment.id} className="flex flex-col gap-2 px-20">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {comment.user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p >{comment.user.username}</p>
              </div>
              <div className="px-10">
                <p className="font-semibold">
                  {comment.headline.charAt(0).toUpperCase() +
                    comment.headline.slice(1)}
                </p>
                <p className="font-semibold mb-2">
                  {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {comment.content.charAt(0).toUpperCase() +
                    comment.content.slice(1)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
