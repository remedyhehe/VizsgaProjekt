import { useState, useEffect } from "react";
import LogoutButton from "../Function/LogoutButton";
import useLogin from "../Function/LoginFunction";
import UserMenu from "../Function/UserMenu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotDropdownOpen, setIsNotDropdownOpen] = useState(false);

  // USER MEGJELENÍTÉS
  const [user, setUser] = useState({
    name: "",
    profile_picture: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        if (!response.ok) throw new Error("User fetch failed");

        const data = await response.json();
        setUser({
          name: data.name || "",
          profile_picture: data.profile_picture || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []); // Üres lista biztosítja, hogy csak egyszer fusson le

  // LOGIN

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, message } = useLogin(); // Login függvény és üzenet

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); // Meghívjuk a login funkciót
  };

  // MENÜ

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
    setIsNotDropdownOpen(false); // Bezárja az értesítési dropdown-t
  };

  const notificationDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotDropdownOpen((prev) => !prev);
    setIsDropdownOpen(false); // Bezárja a user dropdown-t
  };
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        !document.getElementById("userIcon")?.contains(e.target as Node) &&
        !document.getElementById("userDropdown")?.contains(e.target as Node) &&
        !document.getElementById("notIcon")?.contains(e.target as Node) &&
        !document.getElementById("notDropDown")?.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsNotDropdownOpen(false);
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
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded"
          >
            <i className="fa-solid fa-house"></i> Home
          </a>
          <a
            href="/myprojects"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded"
          >
            <i className="fa-solid fa-plus"></i> My Projects
          </a>
          <a
            href="/projects"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded"
          >
            <i className="fa-solid fa-globe"></i> Browse
          </a>
          <a
            href="/premium"
            className="px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded"
          >
            <i className="fa-solid fa-shield"></i> Premium
          </a>
        </div>

        <div className="hidden lg:inline-block relative text-white">
          <div className="flex gap-5 items-center">
            <a href="#">
              <IoMdNotificationsOutline
                id="notIcon"
                onClick={notificationDropdown}
                className="text-2xl"
              />
            </a>
            <button
              id="userIcon"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                className="w-9 h-9 border-2 border-white rounded-full dark:border-gray-800"
                src={ user.profile_picture || "/images/avatar.png"}
                alt=""
              />
            </button>
          </div>
          {isNotDropdownOpen && (
            <div
              id="notDropDown"
              className="absolute right-0 mt-7 w-lg bg-white text-black rounded-lg shadow-lg p-5 z-10"
            >
              <h3 className="text-xl font-semibold mb-5">Notifications</h3>
              <hr className="text-gray-300" />
              <div className="flex flex-col p-10 my-10 items-center">
                <img
                  className="p-5 h-40 w-40"
                  src="/images/sleepBear.png"
                  alt="Sleep Bear"
                />

                <p className="text-lg font-semibold">
                  You do not have any notification
                </p>
              </div>
            </div>
          )}
          {isDropdownOpen && (
            <div
              id="userDropdown"
              className="absolute right-0 mt-7 w-75 bg-white text-black rounded-lg shadow-lg p-2 z-10"
            >
              {/* HA BE VAN JELENTKEZVE */}
              {user.name && (
                <div className="text-left">
                  <h2 className="text-center p-2 rounded-lg font-semibold">
                    Welcome, {user.name}!
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
                  <a href="/settings">
                    <h2 className="p-2 hover:bg-slate-300 rounded-lg">
                      <i className="fa-solid fa-gear"></i> Settings
                    </h2>
                  </a>
                  <div className="my-2 text-center mx-auto w-2/3 h-[2px] bg-gray-200"></div>
                  <LogoutButton />
                </div>
              )}
              {/* HA NINCS BEJELENTKEZVE */}
              {!user.name && (
                <div>
                  <h3 className="text-center text-lg mb-1">Have an account?</h3>
                  <form onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }} // Megakadályozza, hogy a kattintás a dropdown bezáródását okozza
                      className="w-full px-3 py-2 border rounded-md mb-2  "
                      required
                    />
                    <div className="relative mb-4">
                      <input
                        type={showPassword ? "text" : "password"} // Jelszó láthatóságának váltogatása
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onClick={(e) => {
                          e.stopPropagation();
                        }} // Megakadályozza, hogy a kattintás a dropdown bezáródását okozza
                        className="w-full px-3 py-2 border rounded-md "
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event from propagating to the document
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.stopPropagation();
                      }} // Megakadályozza, hogy a kattintás a dropdown bezáródását okozza
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

          {isDropdownOpen && (
            <div
              id="userDropdown"
              className="absolute right-0 mt-7 w-75 bg-white text-black rounded-lg shadow-lg p-2 z-10"
            >
              {/* HA BE VAN JELENTKEZVE */}
              {user.name && (
                <div className="text-left">
                  <h2 className="text-center p-2 rounded-lg font-semibold">
                    Welcome, {user.name}!
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
                  <a href="/settings">
                    <h2 className="p-2 hover:bg-slate-300 rounded-lg">
                      <i className="fa-solid fa-gear"></i> Settings
                    </h2>
                  </a>
                  <div className="my-2 text-center mx-auto w-2/3 h-[2px] bg-gray-200"></div>
                  <LogoutButton />
                </div>
              )}
              {/* HA NINCS BEJELENTKEZVE */}
              {!user.name && (
                <div>
                  <h3 className="text-center text-lg mb-1">Have an account?</h3>
                  <form onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }} // Megakadályozza, hogy a kattintás a dropdown bezáródását okozza
                      className="w-full px-3 py-2 border rounded-md mb-2  "
                      required
                    />
                    <div className="relative mb-4">
                      <input
                        type={showPassword ? "text" : "password"} // Jelszó láthatóságának váltogatása
                        placeholder="Password..."
                        value={password}
                        onClick={(e) => {
                          e.stopPropagation();
                        }} // Megakadályozza, hogy a kattintás a dropdown bezáródását okozza
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md "
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event from propagating to the document
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.stopPropagation();
                      }} // Megakadályozza, hogy a kattintás a dropdown bezáródását okozza
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
          {user.name && <UserMenu />}
          {/* HA NINCS BEJELENTKEZVE */}
          {!user.name && (
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
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"} // Jelszó láthatóságának váltogatása
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from propagating to the document
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>

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
