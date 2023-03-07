import {Outlet, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";
import {useContext} from "react";

export const MainLayout = ({ children }) => {
    const {logout, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="bg-gray-100 h-full">
            <div className="flex justify-between p-2">
                <p>Hey, {currentUser.username}</p>
                <p onClick={handleLogout}>Log out</p>
            </div>
            <Outlet/>
        </div>
    )
}