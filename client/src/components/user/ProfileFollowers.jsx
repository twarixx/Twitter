import { Link } from "react-router-dom";
import { UserSearchResult } from "../search/UserSearchResult";

export const ProfileFollowers = ({ user }) => {
    return (
        <div className="mt-2 px-2 pt-1">
            <h1 className="text-center mb-2 text-lg">
                {user.followers.length === 0
                    ? "Doesn't have any followers"
                    : "Followers"}
            </h1>
            <div className="flex w-full flex-col gap-4">
                {user.followers.map((result, i) => {
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
