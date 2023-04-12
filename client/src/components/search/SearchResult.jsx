import { Link, useNavigate } from "react-router-dom";
import { load } from "../../axios";
import { Username } from "../user/Username";

export const SearchResult = ({ query }) => {
    const navigate = useNavigate();
    const { data, isLoading, error } = load(
        ["search", query],
        `/api/search/${query}`
    );

    if (isLoading) return "Loading";
    if (error) return "Error";

    if (data.data.length === 1) {
        return navigate("/" + data.data[0].username);
    }

    return (
        <div className="flex w-full flex-col">
            {data.data.map((result) => {
                return (
                    <Link to={`/${result.username}`}>
                        <Username key={result.id} user={result} />
                    </Link>
                );
            })}
        </div>
    );
};
