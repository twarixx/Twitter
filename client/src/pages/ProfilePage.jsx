import { useParams } from "react-router-dom";
import { load } from "../axios";
import { Post } from "../components/post/Post";
import { UserHero } from "../components/user/UserHero";
import { UnknownPage } from "./UnknownPage";
import Puff from "../components/loading/Puff";
import { AuthContext } from "../context/AuthContext";
import { useCallback, useContext, useState } from "react";
import { ProfilePosts } from "../components/user/ProfilePosts";
import { ProfileFollowers } from "../components/user/ProfileFollowers";
import { ProfileFollowing } from "../components/user/ProfileFollowing";

export const ProfilePage = () => {
    const { currentUser } = useContext(AuthContext);
    const { username } = useParams();
    const [variant, setVariant] = useState("posts");

    const { data, isLoading, error } = load(
        ["user", username],
        `/api/user/${username}/${currentUser.token}`
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
            <UserHero variant={setVariant} user={user} />
            {variant === "posts" ? <ProfilePosts user={user} /> : ""}
            {variant === "followers" ? <ProfileFollowers user={user} /> : ""}
            {variant === "following" ? <ProfileFollowing user={user} /> : ""}
        </div>
    );
};
