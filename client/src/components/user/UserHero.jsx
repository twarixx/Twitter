import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Avatar } from "./Avatar";

export const UserHero = ({ user }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="border-b border-b-stone-600 pb-2">
            <div className="bg-twitter-secondary h-32 relative shadow-md">
                {user.banner && (
                    <img
                        className="object-cover"
                        src={user.banner}
                        fill
                        alt={`Banner of ${user.display_name}`}
                    ></img>
                )}

                <div className="absolute -bottom-5 left-4">
                    <Avatar user={user} isLarge hasBorder />
                </div>
            </div>

            <div className="mt-6 mx-4 flex justify-between">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold">
                            {user.display_name}
                        </p>
                        <p className="text-xs text-stone-400 -mt-1">
                            @{user.username}
                        </p>
                    </div>

                    <div className="mt-3 text-sm text-stone-300">
                        <p>{user.bio}</p>
                    </div>
                </div>

                <div className="-mt-4 -mr-1.5 space-x-2">
                    {currentUser.admin && (
                        <button className="bg-red-600 text-stone-50 rounded-xl px-3 py-1">
                            Admin
                        </button>
                    )}
                    <button className="bg-white rounded-xl px-4 py-1 text-stone-600">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};
