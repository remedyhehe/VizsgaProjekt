/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Footer from "../../Layouts/Footer";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";


const YourAccountPage = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
<<<<<<< Updated upstream
  const [user, setUser] = useState({
    name: "",
    bio: "",
    url: "",
    company: "",
    country: "",
    profile_picture: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<string>("");
=======
>>>>>>> Stashed changes
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const [user, setUser] = useState({
    name: "",
    bio: "",
    url: "",
    company: "",
    country: "",
    profile_picture: ""
  });

  useEffect(() => {
<<<<<<< Updated upstream
=======
    console.log("useEffect triggered");
>>>>>>> Stashed changes
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: {
            Accept: "application/json",
<<<<<<< Updated upstream
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // ha szükséges
          },
        });

        if (!response.ok) {
          throw new Error("User fetch failed");
        }

        const data = await response.json();
        setUser({ ...user, name: data.name }); // feltételezve, hogy a válaszban van 'name'
=======
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        if (!response.ok) throw new Error("User fetch failed");

        const data = await response.json();

        // Csak akkor állítsd be az állapotot, ha az adatok változtak
        setUser((prevUser) => ({
          ...prevUser,
          name: data.name || prevUser.name,
          bio: data.bio || prevUser.bio,
          url: data.url || prevUser.url,
          company: data.company || prevUser.company,
          country: data.country || prevUser.country,
          profile_picture: data.profile_picture || prevUser.profile_picture,
        }));

        if (data.profile_picture && data.profile_picture !== selectedAvatar) {
          setSelectedAvatar(data.profile_picture);
        }
>>>>>>> Stashed changes
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

<<<<<<< Updated upstream
    fetchUser();
    // API hívás az országok lekérésére
=======
>>>>>>> Stashed changes
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country: any) => ({
          name: country.name.common,
        }));
        countryNames.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchUser();
    fetchCountries();
  }, []); // Üres lista biztosítja, hogy csak egyszer fusson le

  const handleAvatarSelect = () => {
    if (newUrl) {
      setSelectedAvatar(newUrl);
      setUser((prev) => ({ ...prev, profile_picture: newUrl }));
      localStorage.setItem("user_avatar", newUrl);
    }
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          ...user,
          profile_picture: selectedAvatar,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();
      setUser(updatedUser);
      toast.success("Profile updated successfully!", {
        className: "bg-red-500 text-white px-4 py-2 rounded shadow-lg",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="sm:flex overflow-x-hidden bg-gray-800 pt-3">
        <div className="bg-gray-800 hidden sm:block sm:w-1/10"></div>

        <div className="bg-gray-800 w-full sm:w-2/6 md:w-1/4 text-white">
          <h2 className="text-2xl font-semibold text-center sm:text-left">
            {user.name || "username"}
          </h2>
          <h2 className="text-lg text-gray-500 text-center sm:text-left mb-3">
            Free subscription
          </h2>
          <div className="mx-10 md:mx-0">
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

        <div className="bg-gray-800 w-full">
          <h2 className="text-2xl text-white text-center md:text-left">Your Public Profile</h2>
          <div className="my-2 text-center mx-auto w-full h-[1px] bg-gray-700"></div>

          <div className="px-5 sm:flex">
            <div className="w-full lg:w-1/2">
              <div className="mt-5">
                <form>
                  <div className="mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-md font-medium text-white">
                        Username
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
<<<<<<< Updated upstream
                        required
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
=======
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
>>>>>>> Stashed changes
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        It's a nickname, better not to include your full name
                      </p>

                      <label className="block mb-2 text-md font-medium text-white">
                        Bio
                      </label>
                      <textarea
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        Write something about yourself
                      </p>

                      <label className="block mb-2 text-md font-medium text-white">
                        URL
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.url}
                        onChange={(e) => setUser({ ...user, url: e.target.value })}
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        If you have a own page, link it
                      </p>

                      <label className="block mb-2 text-md font-medium text-white">
                        Company
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.company}
                        onChange={(e) => setUser({ ...user, company: e.target.value })}
                      />
                      <p className="text-sm pl-1 text-gray-400 mb-4">
                        Mention your company
                      </p>

                      <label className="block mb-2 text-md font-medium text-white">
                        Country
                      </label>
                      <select
                        value={user.country}
                        onChange={(e) => setUser({ ...user, country: e.target.value })}
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

            <div className="w-full lg:w-1/2">
              <div className="mt-10 text-center">
                <label className="block mb-2 text-md font-medium  text-white">
                  Profile Picture
                </label>
                <div
                  className="relative w-40 h-40 mx-auto rounded-full transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => setModalOpen(true)}
                >
                  <img
                    className={`w-full h-full rounded-full object-cover transition-opacity duration-300 ${
                      hover ? "opacity-70 cursor-pointer" : "opacity-100"
                    }`}
                    src={selectedAvatar || "/images/avatar.png"}
                    alt="Profile"
                  />
                  {hover && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Pencil className="w-8 h-8 text-white bg-black/50 p-2 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center py-10">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 hidden sm:block sm:w-1/6"></div>
      </div>

      <Footer />

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-white mb-4">
              Change Profile Picture
            </h2>
            <input
              type="text"
              placeholder="Enter image URL (e.g., Imgur link)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAvatarSelect}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourAccountPage;
