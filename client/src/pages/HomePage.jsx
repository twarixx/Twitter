import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
import { Post } from "../components/post/Post.jsx";

export const HomePage = () => {
    const { currentUser } = useContext(AuthContext);

    const posts = [];
    if (posts.length === 0) {
        return (
            <div className="p-2 w-full">
                <div className="flex w-full justify-center text-stone-00 mt-4">
                    <p>
                        There aren't any posts for you, perhaps you dont follow
                        anyone?
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-2">
            {posts.map((post, i) => (
                <Post key={i} post={post} showAuthorPicture />
            ))}
        </div>
    );
};
