import { Username } from "../user/Username";
import { Avatar } from "../user/Avatar";

export const UserSearchResult = ({ user }) => {
    return (
        <div className="flex gap-3 bg-stone-600 rounded-lg p-2 mx-1">
            <Avatar user={user} isLarge />
            <div className="flex flex-col items-start justify-center">
                <Username user={user} />
                <p className="text-xs text-stone-400 -mt-1">@{user.username}</p>
            </div>
        </div>
    );
};
