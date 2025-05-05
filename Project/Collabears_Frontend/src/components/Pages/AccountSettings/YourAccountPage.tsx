/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Footer from "../../Layouts/Footer";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";


const YourAccountPage = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
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
    console.log("useEffect triggered");
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
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

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
