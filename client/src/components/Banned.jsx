import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Banned = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="text-twitter-text h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="flex flex-col gap-3 m-4">
                <h1 className="text-center pb-2 text-xl font-bold">
                    Account has been banned.
                </h1>
                <p>
                    We regret to inform you that your access to Twitterr has
                    been restricted. We understand that this news may be
                    disappointing, but please know that this decision was not
                    taken lightly.
                </p>
                <p>
                    At Twitterr, we prioritize user behavior and community
                    guidelines to ensure a safe and inclusive environment for
                    all our users. Unfortunately, your actions have violated our
                    policies, and as a result, we cannot allow you to continue
                    using our platform.
                </p>
                <p>
                    Please note that this ban is final, and we will not be able
                    to reinstate your account. We appreciate your understanding
                    and cooperation in this matter.
                </p>
                <p>
                    We value your interest in Twitterr, and we hope you'll
                    respect our community guidelines
                </p>
                <button
                    className="w-full mt-2 bg-twitter-secondary px-4 py-2 rounded-md text-white"
                    onClick={logout}
                >
                    Log out
                </button>
            </div>
        </div>
    );
};
