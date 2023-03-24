import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import {
    BiHomeAlt2,
    BiSearchAlt2,
    BiPlus,
    BiCompass,
    BiUser,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { MenuItem } from "./MenuItem.jsx";

export const Navigation = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="bg-stone-800 text-twitter-text max-h-16 px-6 w-full">
            <ul className="list-none flex justify-between">
                <MenuItem
                    icon={<BiHomeAlt2 className="w-8 h-8" />}
                    link="/"
                    text="Feed"
                />
                <MenuItem
                    icon={<BiSearchAlt2 className="w-8 h-8" />}
                    onClick={() => alert("Search")}
                    text="Search"
                />
                <MenuItem
                    icon={<BiPlus className="w-8 h-8" />}
                    onClick={() => alert("New post")}
                    text="New post"
                />
                <MenuItem
                    icon={<BiCompass className="w-8 h-8" />}
                    link="/explore"
                    text="Explore"
                />
                <MenuItem
                    icon={<BiUser className="w-8 h-8" />}
                    link={`/${currentUser.username}`}
                    text="Profile"
                />
            </ul>
        </div>
    );
};
