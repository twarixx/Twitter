import { useParams } from "react-router-dom";
import { load } from "../axios";
import { Post } from "../components/post/Post";
import { UserHero } from "../components/user/UserHero";
import { getAccounts } from "../data/accounts";
import { getPosts } from "../data/posts";
import { UnknownPage } from "./UnknownPage";

export const ProfilePage = () => {
    const { username } = useParams();

    const { data, isLoading, error } = load(
        ["user", username],
        `/api/user/${username}`
    );

    if (isLoading) return <p>Loading...</p>;
    if (error) return <UnknownPage />;

    const user = data.data;
    const posts = getPosts().filter((post) => post.user_id === user.id);

    return (
        <div>
            <UserHero user={user} />
            <div className="mt-2">
                {!posts ? (
                    <div className="flex justify-center text-stone-300 mt-4">
                        <p>This user hasn't posted anything!</p>
                    </div>
                ) : (
                    <div>
                        {posts.map((post, i) => (
                            <Post key={i} post={post} hasBorder />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
