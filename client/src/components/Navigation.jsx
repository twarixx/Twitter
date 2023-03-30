import { useContext, useState } from "react";
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
import { SearchModal } from "./modals/SearchModal";
import useSearchModalStore from "../hooks/useSearchModalStore";

export const Navigation = () => {
    const { openModal: openSearchModal } = useSearchModalStore();
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="bg-stone-800 text-twitter-text pt-3 pb-2 px-6 w-full">
            <ul className="list-none flex items-center justify-between">
                <MenuItem
                    icon={<BiHomeAlt2 className="w-8 h-8" />}
                    link="/"
                    text="Feed"
                />
                <MenuItem
                    icon={<BiSearchAlt2 className="w-8 h-8" />}
                    onClick={() => openSearchModal()}
                    text="Search"
                />
                <MenuItem
                    icon={<BiPlus className="w-10 h-10" />}
                    onClick={() => alert("New post")}
                    text="New post"
                    isMiddle
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
