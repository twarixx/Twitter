import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

export const MainLayout = ({ children }) => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="bg-stone-800 text-twitter-text h-full">
      <div className="flex justify-between p-2">
        <p>Hey, {currentUser.username}</p>
        <p onClick={handleLogout}>Sign out</p>
      </div>
      <Outlet />
    </div>
  );
};
