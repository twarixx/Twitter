import { Link, useNavigate } from "react-router-dom";
import { load } from "../../axios";
import { Username } from "../user/Username";
import Puff from "../loading/Puff";
import { UserSearchResult } from "./UserSearchResult";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export const SearchResult = ({ query }) => {
    const { currentUser } = useContext(AuthContext);
    const { data, isLoading, error } = load(
        ["search", query],
        `/api/search/${query}/${currentUser.token}`
    );

    if (isLoading)
        return (
            <div className="w-full h-full flex justify-center mt-2.5">
                <Puff width="66" height="66" stroke="#e5e5e5" />
            </div>
        );

    if (error)
        return (
            <div>
                <p className="text-stone-400 text-sm text-center">
                    Could not find any results!
                </p>
            </div>
        );

    return (
        <div className="flex w-full flex-col gap-4">
            {data.data.map((result) => {
                return (
                    <Link key={result.id} to={`/${result.username}`}>
                        <UserSearchResult key={result.id} user={result} />
                    </Link>
                );
            })}
        </div>
    );
};
