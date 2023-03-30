import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getAccounts } from "../data/accounts.jsx";
import { toaster } from "evergreen-ui";
import { useCallback } from "react";

export const AuthPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [variant, setVariant] = useState("register");

    const { login: authLogin } = useContext(AuthContext);

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === "register" ? "login" : "register"));
    }, []);

    const login = (event) => {
        event.preventDefault();

        if (name === "" || password === "") {
            toaster.danger("Please fill all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "empty-fields",
            });
            return;
        }

        const user = getAccounts().find((account) => account.username === name);
        if (!user) {
            toaster.danger("Could not find this user!", {
                hasCloseButton: true,
                duration: 3,
                id: "user-not-found",
            });
            return;
        }

        authLogin(user);
        toaster.success("Successfully logged in!", {
            hasCloseButton: true,
            duration: 3,
            id: "login-success",
        });
        navigate("/");
    };

    const register = (event) => {
        event.preventDefault();

        if (
            name === "" ||
            password === "" ||
            email === "" ||
            confirmPassword === ""
        ) {
            toaster.danger("Please fill all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "empty-fields",
            });
            return;
        }

        const user = getAccounts().find((account) => account.username === name);
        if (user) {
            toaster.danger("This user already exists!", {
                hasCloseButton: true,
                duration: 3,
                id: "user-already-exists",
            });
            return;
        }

        toaster.success("Shoudld've registered now :D", {
            hasCloseButton: true,
            duration: 3,
            id: "login-success",
        });
    };

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('/images/background.jpg')] bg-center bg-cover">
            <div className="flex flex-col bg-stone-800 bg-opacity-70 pb-16 w-[85%] rounded-xl p-6 items-center">
                <div className="mt-7 mb-10">
                    <img src="/images/logo.png" alt="Twiterr Logo" />
                </div>

                <form className="justify-center flex flex-col gap-4 items-center w-full text-twitter-text">
                    <input
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        className="border-stone-800 focus:border-twitter-primary ring-0 border outline-none w-full p-2 rounded bg-stone-700"
                        name="username"
                        type="text"
                        placeholder={
                            variant === "register"
                                ? "Username"
                                : "Username or Email"
                        }
                    />

                    {variant === "register" && (
                        <input
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            className="border-stone-800 focus:border-twitter-primary ring-0 border outline-none w-full p-2 rounded bg-stone-700"
                            name="email"
                            type="text"
                            placeholder={"Email"}
                        />
                    )}

                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        className="border-stone-800 focus:border-twitter-primary ring-0 border outline-none w-full p-2 rounded bg-stone-700"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    {variant === "register" && (
                        <input
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            value={confirmPassword}
                            className="border-stone-800 focus:border-twitter-primary ring-0 border outline-none w-full p-2 rounded bg-stone-700"
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}

                    <div className="mt-6 w-full flex">
                        <button
                            onClick={variant === "register" ? register : login}
                            className="bg-twitter-primary px-4 py-2 w-full h-12 rounded-md text-twitter-text_secondary"
                        >
                            {variant === "register" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </form>

                <div className="flex mt-0.5 w-full justify-between text-twitter-text text-sm">
                    <p onClick={() => toggleVariant()}>
                        {variant === "register"
                            ? "Already have an account?"
                            : "Don't have an account?"}
                    </p>
                    <p onClick={() => toggleVariant()}>
                        {variant === "register" ? "Sign in!" : "Sign up!"}
                    </p>
                </div>
            </div>
        </div>
    );
};
