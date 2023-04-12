import { Username } from "../user/Username";
import { Avatar } from "../user/Avatar";
import { BiUser } from "react-icons/bi";

export const UserSearchResult = ({ user }) => {
    return (
        <div className="bg-stone-600 rounded-lg p-2 mx-1 flex justify-between">
            <div className="flex gap-3">
                <Avatar user={user} isLarge />
                <div className="flex flex-col items-start justify-center">
                    <Username user={user} />
                    <p className="text-xs text-stone-400 -mt-1">
                        @{user.username}
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <BiUser className="w-8 h-8 text-stone-400 m-1" />
            </div>
        </div>
    );
};
