import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext(JSON.parse(localStorage.getItem("user") || null));
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

    const login = (input) => {
        setCurrentUser(input);
    }

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    });

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};