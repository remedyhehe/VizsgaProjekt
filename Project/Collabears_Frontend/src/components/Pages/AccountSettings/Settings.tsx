import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Footer from "../../Layouts/Footer";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birth: "",
    phone_number: "",
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

        setUser((prevUser) => ({
          ...prevUser,
          first_name: data.first_name || prevUser.first_name,
          last_name: data.last_name || prevUser.last_name,
          email: data.email || prevUser.email,
          birth: data.birth || prevUser.birth,
          phone_number: data.phone_number || prevUser.phone_number,
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSaveChanges = async () => {
    if (!user.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (isNaN(Date.parse(user.birth))) {
      toast.error("Please enter a valid birth date.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(user),
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
        <div className="bg-gray-800 w-full">
          <h2 className="text-2xl text-white text-center md:text-left">Your Profile</h2>
          <div className="my-2 text-center mx-auto w-full h-[1px] bg-gray-700"></div>

          <div className="px-5 sm:flex">
            <div className="w-full lg:w-1/2">
              <div className="mt-5">
                <form>
                  <div className="mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-md font-medium text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.first_name || ""}
                        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                      />
                      <label className="block mb-2 text-md font-medium text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.last_name}
                        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                      />
                      <label className="block mb-2 text-md font-medium text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                      <label className="block mb-2 text-md font-medium text-white">
                        Birth Date
                      </label>
                      <input
                        type="date"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.birth}
                        onChange={(e) => setUser({ ...user, birth: e.target.value })}
                      />
                      <label className="block mb-2 text-md font-medium text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="bg-gray-700 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={user.phone_number}
                        onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                      />
                    </div>
                  </div>
                </form>
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

      <Footer />
    </>
  );
};

export default AccountSettings;