import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

export const ExplorePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="">
      <p className="text-green-500">Explore</p>
    </div>
  );
};
