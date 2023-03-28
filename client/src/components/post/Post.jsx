import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAccounts } from "../../data/accounts";
import { Avatar } from "../user/Avatar";

export const Post = ({
    post,
    hasBorder = false,
    showAuthorPicture = false,
}) => {
    const { currentUser } = useContext(AuthContext);
    const author = getAccounts().find((account) => account.id === post.user_id);

    return (
        <div>
            {post.image ? (
                <div
                    className={`${
                        showAuthorPicture && "mt-7 "
                    } border-b border-b-stone-600 pb-2`}
                >
                    <div className="relative max w-full">
                        <img
                            className="object-cover max-h-64 flex justify-center w-full center"
                            src={post.image}
                            alt="Image for the post."
                        />

                        {showAuthorPicture && (
                            <div className="absolute -top-5 left-[40%]">
                                <Avatar user={author} isLarge />
                            </div>
                        )}
                    </div>

                    <div className="mt-4 mx-1">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col">
                                <h1 className="font-semibold">
                                    {author.display_name}
                                </h1>

                                <div className="flex gap-2 mt-1">
                                    <button>L</button>
                                    <button>R</button>
                                    {currentUser.admin && <button>A</button>}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm">{post.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-b border-b-stone-600 pb-2">
                    <div className="ml-1.5 flex flex-row items-center gap-3">
                        <Avatar user={author} />
                        <div>
                            <p className="font-semibold">
                                {author.display_name}
                            </p>
                            <p className="text-sm -mt-1">{post.message}</p>
                        </div>
                    </div>

                    <div className="flex ml-1.5 gap-2 mt-2">
                        <button>L</button>
                        <button>R</button>
                        {currentUser.admin && <button>A</button>}
                    </div>
                </div>
            )}
        </div>
    );
};
