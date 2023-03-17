import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = {
            id: 1,
            email: 'abc@abc.nl',
            username: 'Admin',
            display_name: 'Admin User',
            bio: 'I am the admin user',
            avatar: null,
            banner: null,
            admin: true,
            active: true,
            deactivated_on: null,
            created_at: 1610000000000,
            last_updated: 3000,
        };

        login(user);
        navigate("/");
    }

    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="flex flex-col bg-stone-800 twitterr-shadow h-[70%] w-[90%] rounded-xl p-6 justify-center items-center">
                <img src="/images/logo.png" alt="Twiterr Logo"/>
                <button onClick={handleLogin} className="bg-twitter-primary px-4 py-2 rounded-md text-twitter-text_secondary">Sign in as Admin</button>
            </div>
        </div>
    )
}