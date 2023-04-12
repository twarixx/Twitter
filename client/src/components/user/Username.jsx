import { MdVerifiedUser } from "react-icons/md";

export const Username = ({ user }) => {
    return (
        <div className="relative">
            <p className="text-xl font-semibold">{user.display_name}</p>

            {user.verified ? (
                <MdVerifiedUser
                    color="#67e8f9"
                    className="absolute -top-0.5 -right-5 w-5 h-5"
                    title={`{user.display_name} is verified.`}
                />
            ) : ""}
        </div>
    );
};
