/** @format */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../Function/LogoutButton";
import useLogin from "../Function/LoginFunction";
import UserMenu from "../Function/UserMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // USER MEGJELENÍTÉS
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    setUserName(storedName);
  }, [localStorage.getItem("user_name")]); // ❗ Figyeljük a változást!

  //LOGIN

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, message } = useLogin(); // Login függvény és üzenet

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); // Meghívjuk a login funkciót
  };

  //MENÜ

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };
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
      <nav className="bg-gray-800 text-white sticky top-0 z-50 px-5 py-4 flex justify-between items-center shadow-xl">
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
            isMenuOpen ? "hidden" : ""
          } hidden lg:items-center lg:space-x-6`}
        >
          <a
            href="/"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            <i className="fa-solid fa-house"></i> Home
          </a>
          <a
            href="/myprojects"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            <i className="fa-solid fa-plus"></i> My Projects
          </a>
          <a
            href="/projects"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            <i className="fa-solid fa-globe"></i> Browse
          </a>
          <a
            href="/premium"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            <i className="fa-solid fa-shield"></i> Premium
          </a>
        </div>

        <div className="hidden lg:inline-block relative text-white">
          <button
            id="userIcon"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="../images/avatar.png"
              alt=""
            />
          </button>
          {isDropdownOpen && (
            <div
              id="userDropdown"
              className="absolute right-0 mt-2 w-75 bg-white text-black rounded-lg shadow-lg p-2 z-10"
            >
              {/* HA BE VAN JELENTKEZVE */}
              {userName && (
                <div className="text-left">
                  <h2 className="text-center p-2 rounded-lg font-semibold">
                    Welcome, {userName}!
                  </h2>
                  <div className="my-2 text-center mx-auto w-2/3 h-[2px] bg-gray-200"></div>
                  <a href="/account">
                    <h2 className="p-2 hover:bg-slate-300 rounded-lg">
                      <i className="fa-regular fa-user"></i> Account
                    </h2>
                  </a>
                  <a href="/premium">
                    <h2 className="p-2 hover:bg-slate-300 rounded-lg">
                      <i className="fa-regular fa-circle-up"></i> Upgrade Plan
                    </h2>
                  </a>
                  <a href="/">
                    <h2 className="p-2 hover:bg-slate-300 rounded-lg">
                      <i className="fa-solid fa-gear"></i> Settings
                    </h2>
                  </a>
                  <div className="my-2 text-center mx-auto w-2/3 h-[2px] bg-gray-200"></div>
                  <LogoutButton />
                </div>
              )}
              {/* HA NINCS BEJELENTKEZVE */}
              {!userName && (
                <div>
                  <h3 className="text-center text-lg mb-1">Have an account?</h3>
                  <form onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white py-2 rounded-md cursor-pointer"
                    >
                      Login
                    </button>
                  </form>
                  {message && (
                    <p className="text-center text-red-500">{message}</p>
                  )}{" "}
                  {/* Hibák megjelenítése */}
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
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-50 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 bottom-0 w-5/6 max-w-sm bg-gray-800 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:hidden`}
      >
        <nav className="py-4 px-5">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="/">
              <img className="h-12" src="/images/maci.PNG" alt="Logo" />
            </a>
            <button className="navbar-close" onClick={toggleMenu}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer"
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
          <ul className="text-white">
            <li>
              <a className="block p-4 hover:text-orange-500" href="/">
                <i className="fa-solid fa-house"></i> Home
              </a>
            </li>
            <li>
              <a className="block p-4 hover:text-orange-500" href="/myprojects">
                <i className="fa-solid fa-plus"></i> My Projects
              </a>
            </li>
            <li>
              <a className="block p-4 hover:text-orange-500" href="/projects">
                <i className="fa-solid fa-globe"></i> Browse
              </a>
            </li>
            <li>
              <a className="block p-4 hover:text-orange-500" href="/premium">
                <i className="fa-solid fa-shield"></i> Premium
              </a>
            </li>
          </ul>
          {/* HA BE VAN JELENTKEZVE */}
          {userName && <UserMenu />}
          {/* HA NINCS BEJELENTKEZVE */}
          {!userName && (
            <div
              id="userDropdown"
              className="absolute m-auto mt-2 bg-slate-100 text-black rounded-lg shadow-lg p-4 z-10 mr-5"
            >
              <h3 className="text-center text-lg mb-1">Have an account?</h3>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-md cursor-pointer"
                >
                  Login
                </button>
              </form>
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
              <div className="shadow-lg rounded-lg p-2 w-full max-w-md mx-auto mt-2 bg-slate-100 min-h-20 text-center">
                <p className="text-gray-600 mb-4">Or continue with</p>
                <div className="flex space-x-3">
                  <button className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-200 transition">
                    <i className="fa-brands fa-google"></i> Google
                  </button>
                  <button className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-200 transition">
                    <i className="fa-brands fa-github"></i> GitHub
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
