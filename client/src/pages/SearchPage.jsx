import { useState } from "react";

export const SearchPage = () => {
    const [search, setSearch] = useState("");

    // const { data, isLoading, error } = axios.post(
    //     ["search", search],
    //     `/api/search`
    // );

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center p-4 pb-2 px-6 w-full">
                <form className="w-full">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        maxLength="35"
                        className="w-full rounded-lg px-3 py-2 bg-stone-600 border border-stone-800 ring-0 outline-none focus:border-twitter-secondary"
                        type="text"
                        placeholder="Search for content"
                    />
                </form>
            </div>

            <div className="border-t border-t-stone-600 w-full flex px-2 text-center justify-center pt-2">
                {search && search.length >= 3 ? (
                    <h1 className="text-xl">Results for {search}:</h1>
                ) : (
                    <h1 className="text-xl">Recent searches</h1>
                )}
            </div>
        </div>
    );
};
