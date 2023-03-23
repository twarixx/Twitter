import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from "./pages/HomePage.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { ExplorePage } from "./pages/ExplorePage.jsx";
import { UnknownPage } from "./pages/UnknownPage.jsx";

import { MainLayout } from "./layouts/MainLayout.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  function detectMobile() {
    return Math.min(window.screen.width, window.screen.height) < 768;
  }

  const LoggedIn = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/auth" />;
    }

    return children;
  };

  const LoggedOut = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LoggedIn>
          <MainLayout />
        </LoggedIn>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/explore",
          element: <ExplorePage />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <LoggedOut>
          <Outlet />
        </LoggedOut>
      ),
      children: [
        {
          path: "/auth",
          element: <AuthPage />,
        },
      ],
    },
    {
      path: "*",
      element: <UnknownPage />,
    },
  ]);

  if (!detectMobile()) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <img src="/images/logo.png" alt="Twiterr Logo" />
        <h1 className="text-3xl text-twitter-text font-semibold">
          We are mobile only!
        </h1>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
