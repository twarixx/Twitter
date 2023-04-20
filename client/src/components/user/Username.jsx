import { BiFork } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";

export const Username = ({ user }) => {
    return (
        <div className="relative">
            <p className="text-xl font-semibold break">{user.display_name}</p>

            {user.admin === 1 ? (
                <BiFork
                    color="#67e8f9"
                    className="absolute -top-1.5 -right-7 w-7 h-7"
                    title={`{user.display_name} is an admin.`}
                />
            ) : (
                ""
            )}

            {user.verified_on && user.admin === 0 ? (
                <MdVerifiedUser
                    color="#67e8f9"
                    className="absolute -top-0.5 -right-5 w-5 h-5"
                    title={`{user.display_name} is verified.`}
                />
            ) : (
                ""
            )}
        </div>
    );
};
