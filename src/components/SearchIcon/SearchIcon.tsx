import { useLocation } from "react-router-dom";

export const SearchIcon = () => {
  const { pathname } = useLocation();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={pathname === "/trails" ? 3 : 1.5}
      stroke={pathname === "/trails" ? "#fabc3c" : "currentColor"}
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};
