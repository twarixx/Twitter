import { Link } from "react-router-dom";

export const MenuItem = ({ icon, text, link = null, onClick = null }) => {
    if (link != null) {
        return (
            <li>
                <Link
                    to={link}
                    className="flex flex-col items-center justify-center py-3"
                >
                    {icon}
                </Link>
            </li>
        );
    }

    return (
        <li
            className="flex flex-col items-center justify-center py-3"
            onClick={onClick}
        >
            {icon}
        </li>
    );
};
