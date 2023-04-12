import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext(
    JSON.parse(localStorage.getItem("user") || null)
);
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = (input) => {
        setCurrentUser(input);
    };

    const logout = () => {
        const id = currentUser.id;
        setCurrentUser(null);
        localStorage.removeItem("user");

        makeRequest.post("/api/logout");
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    });

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
