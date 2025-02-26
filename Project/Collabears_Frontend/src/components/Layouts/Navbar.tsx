import { useState, useEffect } from "react";

const Navbar = () => {
  // State for burger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for user dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Burger menu toggle handler
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // User dropdown toggle handler
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        !document.getElementById("userIcon")?.contains(e.target as Node) &&
        !document.getElementById("userDropdown")?.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      <nav className="bg-gray-800 text-white sticky top-0 z-50 px-5 py-4 flex justify-between items-center">
        <a className="text-3xl font-bold leading-none" href="/">
          <img className="h-16" src="/images/maci.PNG" alt="Logo" />
        </a>

        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-white p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        <div
          className={`lg:flex ${
            isMenuOpen ? "" : "hidden"
          } absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:items-center lg:w-auto lg:space-x-6`}
        >
          <a
            href="/"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            aria-current="page"
          >
            <i className="fa-solid fa-house"></i> Home
          </a>
          <a
            href="/myprojects"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            <i className="fa-solid fa-plus"></i> My Projects
          </a>
          <a
            href="/projects"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            <i className="fa-solid fa-globe"></i> Browse
          </a>
          <a
            href="/settings"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
            aria-current="page"
          >
            <i className="fa-solid fa-gear"></i> Settings
          </a>
        </div>

        <div className="relative inline-block text-white">
          <button
            id="userIcon"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <i className="fa-solid fa-circle-user fa-2xl"></i>
          </button>
          {isDropdownOpen && (
            <div
              id="userDropdown"
              className="absolute right-0 mt-2 w-75 bg-white text-black rounded-lg shadow-lg p-4 z-10"
            >
              <a href="/login">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-md"
                >
                  Login
                </button>
              </a>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  You don't have an account yet?{" "}
                  <a
                    href="/register"
                    className="text-orange-500 hover:underline"
                  >
                    Sign up!
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div
        className={`navbar-menu sticky top-0 z-50 ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <div
          className="navbar-backdrop fixed top-0 inset-0 bg-gray-800 opacity-50"
          onClick={toggleMenu}
        ></div>
        <nav className="fixed top-0 z-50 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-4 px-5 bg-gray-800 overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="/">
              <img className="h-12" src="/images/maci.PNG" alt="Logo" />
            </a>
            <button className="navbar-close" onClick={toggleMenu}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Pages</h2>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-orange-500 rounded"
                  href="/"
                >
                  <i className="fa-solid fa-house"></i> Home
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-orange-500 rounded"
                  href="/myprojects"
                >
                  <i className="fa-solid fa-plus"></i> My Projects
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-orange-500 rounded"
                  href="/projects"
                >
                  <i className="fa-solid fa-globe"></i> Browse
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-orange-500 rounded"
                  href="/settings"
                >
                  <i className="fa-solid fa-gear"></i> Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
