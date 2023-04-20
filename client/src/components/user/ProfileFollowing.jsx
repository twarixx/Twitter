import { Link } from "react-router-dom";
import { UserSearchResult } from "../search/UserSearchResult";

export const ProfileFollowing = ({ user }) => {
    return (
        <div className="mt-2 px-2 pt-1">
            <h1 className="text-center mb-2 text-lg">
                {user.following.length === 0
                    ? "Doesn't follow anyone"
                    : "Following"}
            </h1>
            <div className="flex w-full flex-col gap-4">
                {user.following.map((result, i) => {
                    return (
                        <Link key={i} to={`/${result.username}`}>
                            <UserSearchResult key={result.id} user={result} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
