import profile from "/assets/icons/profile.svg";
import bookmark from "/assets/icons/bookmark.svg";
import search from "/assets/icons/search.svg";
import mapPin from "/assets/icons/map-pin.svg";
import { Link } from "react-router-dom";

interface Props {
  activeNavbar: boolean;
}
const Navbar = ({ activeNavbar = true }: Props) => {
  return (
    <>
      {activeNavbar && (
        <nav className="fixed bottom-0 h-20 bg-white w-full border-t-2 px-4 ">
          <ul className="flex justify-between ">
            <Link to={"/"}>
              <li className="flex flex-col items-center">
                <img className="w-8 pt-2" src={search} />
                <span className="mt-2 text-sm">Search</span>
              </li>
            </Link>
            <Link to={"/navigate"}>
              <li className="flex flex-col items-center">
                <img className="w-8 pt-2" src={mapPin} />
                <span className="mt-2 text-sm">Navigate</span>
              </li>
            </Link>
            <Link to={"/"}>
              <li className="flex flex-col items-center">
                <img className="w-8 pt-2" src={bookmark} />
                <span className="mt-2 text-sm">Saved</span>
              </li>
            </Link>
            <Link to={"/"}>
              <li className="flex flex-col items-center">
                <img className="w-8 pt-2" src={profile} />
                <span className="mt-2 text-sm">Profile</span>
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
