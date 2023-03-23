import {
  BiHomeAlt2,
  BiSearchAlt2,
  BiPlus,
  BiCompass,
  BiUser,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const menus = [
    {
      name: "Feed",
      icon: <BiHomeAlt2 className="w-8 h-8" />,
      link: "/",
    },
    {
      name: "Search",
      icon: <BiSearchAlt2 className="w-8 h-8" />,
      link: "/",
    },
    {
      name: "New Post",
      icon: <BiPlus className="w-8 h-8" />,
      link: "/",
    },
    {
      name: "Explore",
      icon: <BiCompass className="w-8 h-8" />,
      link: "/",
    },
    {
      name: "Profile",
      icon: <BiUser className="w-8 h-8" />,
      link: "/",
    },
  ];

  return (
    <div className="bg-stone-800 text-twitter-text max-h-16 px-6 w-full">
      <ul className="list-none flex justify-between">
        {menus.map((menu, i) => (
          <li key={i}>
            <Link
              to={menu.link}
              className="flex flex-col items-center justify-center py-3"
              href="#"
            >
              {menu.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
