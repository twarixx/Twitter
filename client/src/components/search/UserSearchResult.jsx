import { Username } from "../user/Username";
import { Avatar } from "../user/Avatar";
import { BiUser } from "react-icons/bi";

export const UserSearchResult = ({ user }) => {
    return (
        <div className="relative h-20 rounded-lg">
            <img
                className="relative object-cover rounded-lg h-20 flex w-full"
                src={user.banner || "/images/default_banner.svg"}
                fill="true"
                alt={`Banner of ${user.display_name}`}
            ></img>
            <div className="absolute top-0 bg-opacity-60 rounded-lg bg-black h-full w-full"></div>

            <div className="absolute top-2 left-2">
                <div className="flex gap-4 items-center">
                    <Avatar user={user} isLarge />
                    <div>
                        <Username user={user} />
                        <p className="text-xs text-stone-400 -mt-1">
                            @{user.username}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
