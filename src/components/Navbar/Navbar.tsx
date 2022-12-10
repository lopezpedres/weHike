import { Link } from "react-router-dom";
import { SearchIcon } from "../SearchIcon/SearchIcon";
import SaveIcon from "../SaveIcon/SaveIcon";
import { NavigateIcon } from "../NavigateIcon/NavigateIcon";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

interface Props {
  activeNavbar?: boolean;
}
const Navbar = ({ activeNavbar = true }: Props) => {
  return (
    <>
      {activeNavbar && (
        <nav className="fixed bottom-0 h-20 bg-white w-full border-t-2 px-4 ">
          <ul className="flex justify-between ">
            <Link to={"/"}>
              <li className="flex flex-col items-center">
                <div className="w-8 pt-2">
                  <SearchIcon />
                </div>
                <span className="mt-2 text-sm">Search</span>
              </li>
            </Link>
            <Link to={"/navigate"}>
              <li className="flex flex-col items-center">
                <div className="w-8 pt-2">
                  <NavigateIcon />
                </div>
                <span className="mt-2 text-sm">Navigate</span>
              </li>
            </Link>
            <Link to={"/my-trails"}>
              <li className="flex flex-col items-center">
                <div className="w-8 pt-2">
                  <SaveIcon />
                </div>
                <span className="mt-2 text-sm">Saved</span>
              </li>
            </Link>
            <Link to={"/profile"}>
              <li className="flex flex-col items-center">
                <div className="w-8 pt-2">
                  <ProfileIcon />
                </div>
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
