import { useState } from "react";
import { load, makeRequest } from "../axios";
import { SearchResult } from "../components/search/SearchResult";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        if (e.key !== "Enter") return;

        e.preventDefault();
        setQuery(search);
    };

    let displayQuery = query;
    if (query.length > 25) {
        displayQuery = displayQuery.substring(0, 25);
        displayQuery += "...";
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center p-4 pb-2 px-6 w-full">
                <form className="w-full">
                    <input
                        onKeyDown={handleSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        maxLength="35"
                        className="w-full rounded-lg px-3 py-2 bg-stone-600 border border-stone-800 ring-0 outline-none focus:border-twitter-secondary"
                        type="text"
                        placeholder="Search for content"
                    />
                </form>
            </div>

            <div className="border-t border-t-stone-600 w-full flex px-2 pt-2">
                {query && query.length >= 2 ? (
                    <div className="w-full gap-4 flex flex-col">
                        <div className="flex gap-3 justify-center items-center w-full">
                            <h1 className="text-xl">
                                Results for {displayQuery}
                            </h1>
                        </div>
                        <SearchResult query={query} />
                    </div>
                ) : (
                    <h1 className="text-xl">Recent searches</h1>
                )}
            </div>
        </div>
    );
};
