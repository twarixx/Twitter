import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState } from "react";
import { Navigation } from "../Navigation.jsx";
import { SearchModal } from "../modals/SearchModal";
import useSearchModalStore from "../../hooks/useSearchModalStore";

export const MainLayout = ({ children }) => {
    const { isOpen, closeModal } = useSearchModalStore();
    const { logout, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    return (
        <div className="text-twitter-text h-full">
            {/* <div className="flex justify-between p-2">
        <p>Hey, {currentUser.username}</p>
        <p onClick={handleLogout}>Sign out</p>
      </div> */}
            <Outlet />
            <SearchModal visible={isOpen} onClose={closeModal} />

            <div className="flex items-center justify-center bottom-0 fixed w-full">
                <Navigation />
            </div>
        </div>
    );
};
