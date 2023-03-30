import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAccounts } from "../../data/accounts";
import { Avatar } from "../user/Avatar";
import { Username } from "../user/Username";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiCog } from "react-icons/bi";

export const Post = ({
    post,
    hasBorder = false,
    showAuthorPicture = false,
}) => {
    const { currentUser } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const author = getAccounts().find((account) => account.id === post.user_id);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className="border-b border-b-stone-600 pb-2 mt-2">
            {post.image && (
                <img
                    className="object-cover max-h-64 flex justify-center w-full center mb-0.5"
                    src={post.image}
                    alt="Image for the post."
                />
            )}
            <div className="ml-1.5 flex flex-row items-center gap-3">
                <Avatar hasBorder={hasBorder} user={author} />
                <div>
                    <Username user={author} />
                    <p className="text-sm -mt-1">{post.message}</p>
                </div>
            </div>

            <div className="flex ml-1.5 gap-2 mt-2">
                <button onClick={toggleLike}>
                    {liked ? (
                        <AiFillHeart fill="#67e8f9" className="w-5 h-5" />
                    ) : (
                        <AiOutlineHeart className="w-5 h-5" />
                    )}
                </button>
                <button>
                    <BiCommentDetail className="w-5 h-5" />
                </button>
                {currentUser.admin && (
                    <button>
                        <BiCog className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};
