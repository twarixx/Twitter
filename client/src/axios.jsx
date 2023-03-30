import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const makeRequest = axios.create({
    baseURL: "https://school.wesleyschreur.nl",
});

export function load(identifier, url) {
    return useQuery(
        identifier,
        () => {
            return makeRequest.get(url).then((result) => result.data);
        },
        { retry: false, refetchOnWindowFocus: false }
    );
}

export function loadWithExpiry(identifier, url, expiry) {
    return useQuery(
        identifier,
        () => {
            return makeRequest.get(url).then((result) => result.data);
        },
        { retry: false, refetchOnWindowFocus: false, refetchInterval: expiry }
    );
}

export function loadInfinite(identifier, url, page = 0) {
    return useInfiniteQuery(
        identifier,
        async ({ pageParam = 0 }) => {
            return makeRequest
                .get(url + "?cursor=" + pageParam)
                .then((result) => result.data);
        },
        {
            retry: false,
            refetchOnWindowFocus: false,
            getPreviousPageParam: (firstpage) =>
                firstpage.previousId ?? undefined,
            getNextPageParam: (lastpage) => lastpage.nextId ?? undefined,
        }
    );
}
