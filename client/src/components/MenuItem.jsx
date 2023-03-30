import { Link } from "react-router-dom";

export const MenuItem = ({
    icon,
    text,
    link = null,
    onClick = null,
    isMiddle = false,
}) => {
    if (link != null) {
        return (
            <li>
                <Link
                    to={link}
                    className={`${
                        isMiddle && "bg-twitter-primary w-8 h-8 "
                    } flex flex-col items-center justify-center`}
                >
                    {icon}
                </Link>
            </li>
        );
    }

    return (
        <li
            className={`flex flex-col items-center justify-center`}
            onClick={onClick}
        >
            <div
                className={`${
                    isMiddle && "bg-twitter-secondary p-1 rounded-full"
                }`}
            >
                {icon}
            </div>
        </li>
    );
};
