import {useContext} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthContext} from "./context/AuthContext.jsx";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/auth/LoginPage.jsx";
import {RegisterPage} from "./pages/auth/RegisterPage.jsx";
import {UnknownPage} from "./pages/UnknownPage.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";

function App() {
    const {currentUser} = useContext(AuthContext);
    const queryClient = new QueryClient()

    function detectMobile() {
        return (Math.min(window.screen.width, window.screen.height) < 768);
    }


    const LoggedIn = ({children}) => {
        if (!currentUser) {
            return <Navigate to="/login"/>;
        }

        return children;
    }

    const LoggedOut = ({children}) => {
        if (currentUser) {
            return <Navigate to="/"/>;
        }

        return children;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <LoggedIn>
                    <MainLayout/>
                </LoggedIn>
            ),
            children: [
                {
                    path: "/",
                    element: <HomePage/>,
                },
            ],
        },
        {
            path: "/",
            element: (<LoggedOut><Outlet/></LoggedOut>),
            children: [
                {
                    path: "/login",
                    element: <LoginPage/>,
                },
                {
                    path: "/register",
                    element: <RegisterPage/>,
                },
            ],
        },
        {
            path: "*",
            element: <UnknownPage/>,
        }
    ]);

    if (!detectMobile()) {
        return (
            <div className="flex justify-center items-center h-[100vh]">
                <h1 className="text-5xl font-semibold">We are mobile only!</h1>
            </div>
        )
    }

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
