import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

export const HomePage = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="">
            <p className="text-red-500">{currentUser.bio}</p>
        </div>
    );
};
