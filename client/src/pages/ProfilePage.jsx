import { useParams } from "react-router-dom";
import { load } from "../axios";
import { Post } from "../components/post/Post";
import { UserHero } from "../components/user/UserHero";
import { UnknownPage } from "./UnknownPage";
import Puff from "../components/loading/Puff";

export const ProfilePage = () => {
    const { username } = useParams();

    const { data, isLoading, error } = load(
        ["user", username],
        `/api/user/${username}`
    );

    if (isLoading)
        return (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <Puff width="66" height="66" stroke="#e5e5e5" />
            </div>
        );

    if (error) return <UnknownPage />;

    const user = data.data;

    return (
        <div>
            <UserHero user={user} />
            <div className="mt-2">
                {/* {!posts ? (
                    <div className="flex justify-center text-stone-300 mt-4">
                        <p>This user hasn't posted anything!</p>
                    </div>
                ) : (
                    <div>
                        {posts.map((post, i) => (
                            <Post key={i} post={post} hasBorder />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
};
