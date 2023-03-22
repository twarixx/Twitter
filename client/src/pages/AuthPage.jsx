import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getAccounts } from "../data/accounts.jsx";
import { toaster } from "evergreen-ui";

export const AuthPage = () => {
  const [input, setInput] = useState({ username: "", password: "" });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (input.username === "" || input.password === "") {
      toaster.danger("Please fill all the fields!", {
        hasCloseButton: true,
        duration: 3,
        id: "empty-fields",
      });
      return;
    }

    const user = getAccounts().find(
      (account) => account.username === input.username
    );
    if (!user) {
      toaster.danger("Could not find this user!", {
        hasCloseButton: true,
        duration: 3,
        id: "user-not-found",
      });
      return;
    }

    login(user);
    toaster.success("Successfully logged in!", {
      hasCloseButton: true,
      duration: 3,
      id: "login-success",
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('/images/background.jpg')] bg-center bg-cover">
      <div className="flex flex-col bg-stone-800 bg-opacity-70 h-[60%] w-[85%] rounded-xl p-6 items-center">
        <div className="mt-7 mb-10">
          <img src="/images/logo.png" alt="Twiterr Logo" />
        </div>

        <form className="justify-center flex flex-col gap-4 items-center w-full text-twitter-text">
          <input
            onChange={handleChange}
            value={input.username}
            className="border-twitter-primary border outline-none w-full p-2 rounded bg-stone-700"
            name="username"
            type="text"
            placeholder="Username or Email"
          />
          <input
            onChange={handleChange}
            value={input.password}
            className="border-twitter-primary border outline-none w-full p-2 rounded bg-stone-700"
            name="password"
            type="password"
            placeholder="Password"
          />

          <div className="mt-6 w-full flex">
            <button
              onClick={handleLogin}
              className="bg-twitter-primary px-4 py-2 w-full h-12 rounded-md text-twitter-text_secondary"
            >
              Sign in!
            </button>
          </div>
        </form>

        <div className="flex mt-0.5 w-full justify-between text-twitter-text text-sm">
          <p onClick={() => navigate("/register")}>Don't have an account?</p>
          <p onClick={() => navigate("/register")}>Sign up!</p>
        </div>
      </div>
    </div>
  );
};
