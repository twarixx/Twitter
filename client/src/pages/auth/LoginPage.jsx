import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = {
            username: 'Admin',
        };

        login(user);
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <button onClick={handleLogin} className="bg-amber-500 px-4 py-2 rounded-md text-amber-50">Sign in as Admin</button>
        </div>
    )
}