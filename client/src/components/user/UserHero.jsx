import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Avatar } from "./Avatar";
import { Username } from "./Username";
import { BiCog } from "react-icons/bi";
import { Link } from "react-router-dom";

export const UserHero = ({ user }) => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="border-b border-b-stone-600 pb-2">
            <div className="h-32 relative shadow-md">
                <img
                    className="object-cover h-32 flex w-full"
                    src={user.banner || "/images/default_banner.svg"}
                    fill="true"
                    alt={`Banner of ${user.display_name}`}
                ></img>

                <div className="absolute -bottom-5 left-4">
                    <Avatar user={user} isLarge hasBorder />
                </div>
            </div>

            <div className="mt-6 mx-4 flex justify-between">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <Username user={user} />
                        <p className="text-xs text-stone-400 -mt-1">
                            @{user.username}
                        </p>
                    </div>

                    <div className="mt-3 text-sm text-stone-300">
                        <p>{user.bio}</p>
                    </div>
                </div>

                <div className="absolute right-3 flex-col-reverse flex gap-2 -mt-4 -mr-1.5 space-x-2">
                    {currentUser.id === user.id ? (
                        <Link to={`/${currentUser.username}/edit`}>
                            <button className="bg-white rounded-xl px-4 py-1 text-stone-600">
                                Edit
                            </button>
                        </Link>
                    ) : (
                        <button className="bg-white rounded-xl px-4 py-1 text-stone-600">
                            Follow
                        </button>
                    )}
                </div>
            </div>

            <div className="ml-4 mt-2 flex text-sm text-stone-400 justify-between">
                <div className="flex gap-5">
                    <p>
                        <span className="font-semibold text-stone-300">
                            {user.following}
                        </span>{" "}
                        following
                    </p>
                    <p>
                        <span className="font-semibold text-stone-300">
                            {user.followers}
                        </span>{" "}
                        followers
                    </p>
                </div>

                <div className="mr-2">
                    {currentUser.admin ? (
                        <Link to={`/${user.username}/edit`}>
                            <BiCog className="h-6 w-6 text-red-500" />
                        </Link>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};
