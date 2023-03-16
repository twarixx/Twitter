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
            <button onClick={handleLogin} className="bg-twitter-primary px-4 py-2 rounded-md text-twitter-text_secondary">Sign in as Admin</button>
        </div>
    )
}