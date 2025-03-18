/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Footer from "../../Layouts/Footer";

const YourAccountPage = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    // API hívás az országok lekérésére
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country: any) => ({
          name: country.name.common,
        }));
        countryNames.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        );
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();

    // Avatar betöltése LocalStorage-ból
    const savedAvatar = localStorage.getItem("user_avatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
  }, []);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("user_avatar", avatar);
    window.dispatchEvent(new Event("avatarChanged"));
  };

  return (
    <>
      <Navbar />
      <div className="sm:flex overflow-x-hidden">
        {/* Oldalsó nem látható sáv */}
        <div className="bg-gray-800 hidden sm:block sm:w-1/10"></div>

        {/* Bal oldalsó látható sáv (Menü opciók) */}
        <div className="bg-gray-800 w-full sm:w-2/6 md:w-1/4 text-white">
          <h2 className="text-2xl font-semibold">username</h2>
          <h2 className="text-lg text-gray-500">Free subscription</h2>
          <div>
            <a href="#">
              <h2 className="p-2 hover:bg-slate-700 font-thin hover:text-orange-500 mb-2 border-b-1 border-orange-500">
                <i className="fa-regular fa-user "></i> Public Profile
              </h2>
            </a>
            <a href="#">
              <h2 className="p-2 hover:bg-slate-700 font-thin hover:text-orange-500 mb-2">
                <i className="fa-regular fa-user"></i> Settings
              </h2>
            </a>
            <a href="#">
              <h2 className="p-2 hover:bg-slate-700 font-thin hover:text-orange-500 mb-2">
                <i className="fa-regular fa-user"></i> Plan
              </h2>
            </a>
          </div>
        </div>

        {/* Main */}
        <div className="bg-gray-800 w-full">
          <h2 className="text-2xl text-white">Your Public Profile</h2>
          <div className="my-2 text-center mx-auto w-full h-[1px] bg-gray-700"></div>
          {/* Elválasztó */}
          <div className="px-5 sm:flex">
            {/* Bal oldalsó */}
            <div className="w-full lg:w-1/2">
              <div className="mt-5">
                <form>
                  <div className="mb-6 md:grid-cols-2">
                    <div>
                      {/* Username */}
                      <label className="block mb-2 text-md font-medium text-white">
                        Username
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        It's a nickname, better not to include your full name
                      </p>

                      {/* BIO */}
                      <label className="block mb-2 text-md font-medium text-white">
                        Bio
                      </label>
                      <textarea
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        Write something about yourself
                      </p>

                      {/* URL */}
                      <label className="block mb-2 text-md font-medium text-white">
                        URL
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        If you have a own page, link it
                      </p>

                      {/* Company */}
                      <label className="block mb-2 text-md font-medium text-white">
                        Company
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        Mention your company
                      </p>

                      {/* Country */}
                      <label className="block mb-2 text-md font-medium text-white">
                        Country
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="" disabled>
                          Select a country
                        </option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Jobb oldalsó */}
            <div className="w-full lg:w-1/2">
              <div className="mt-10">
                <img
                  className="w-2/3 h-2/3 rounded-full text-center mx-auto"
                  src="https://i.imgur.com/kHNQ3vD.jpeg"
                  alt="Rounded avatar"
                />
              </div>
              <div className="flex flex-col items-center py-10">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Oldalsó nem látható sáv */}
        <div className="bg-gray-800 hidden sm:block sm:w-1/6"></div>
      </div>
      <Footer />
    </>
  );
};

export default YourAccountPage;
