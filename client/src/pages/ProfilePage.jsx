import { useParams } from "react-router-dom";
import { Post } from "../components/post/Post";
import { UserHero } from "../components/user/UserHero";
import { getAccounts } from "../data/accounts";
import { getPosts } from "../data/posts";
import { UnknownPage } from "./UnknownPage";

export const ProfilePage = () => {
    const { username } = useParams();

    const user = getAccounts().find((account) => account.username === username);
    if (!user) return <UnknownPage />;

    const posts = getPosts().filter((post) => post.userId === user.id);

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
