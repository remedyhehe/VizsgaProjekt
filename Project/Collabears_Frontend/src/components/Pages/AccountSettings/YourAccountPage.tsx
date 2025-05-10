import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Footer from "../../Layouts/Footer";
import { toast } from "react-toastify";
import PublicSettings from "./PublicSettings";
import AccountSettings from "./Settings";

const YourAccountPage = () => {
  const [activeSection, setActiveSection] = useState<
    "public" | "settings" | "plan"
  >("public");

  const [user, setUser] = useState({
    name: "",
    bio: "",
    url: "",
    company: "",
    country: "",
    profile_picture: "",
    plan: "",
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
        setUser(data); // Ensure 'data.plan' is returned as 'Pro', 'Free', etc.
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/user/cancel-subscription",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to cancel subscription");

      setUser((prev) => ({ ...prev, plan: "Free Plan" }));
      toast.success("Subscription canceled successfully!", {
        className: "bg-green-500 text-white px-4 py-2 rounded shadow-lg",
      });
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("An error occurred while canceling the subscription.");
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "public":
        return <PublicSettings />;
      case "settings":
        return <AccountSettings />;
      case "plan":
        return (
          <div className="flex justify-center py-16 bg-gray-800 min-h-screen">
            <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">
                Current Subscription Plan
              </h2>

              <div className="bg-gray-700 rounded-lg py-4 px-6 mb-6">
                <p className="text-sm text-gray-400 mb-1">
                  You are currently on:
                </p>
                <p className="text-xl font-semibold text-orange-300">
                  {user.plan || "Free Plan"}
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <a
                  href="/premium"
                  className="w-full text-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition"
                >
                  Upgrade to Premium
                </a>
                {user.plan !== "Free Plan" && (
                  <button
                    className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-2 rounded-lg transition"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
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
            {user.plan || "Free subscription"}
          </h2>
          <div className="mx-10 md:mx-0">
            <a href="#" onClick={() => setActiveSection("public")}>
              <h2
                className={`p-2 font-thin mb-2  ${
                  activeSection === "public"
                    ? "bg-slate-700 text-orange-500"
                    : "hover:bg-slate-700 hover:text-orange-500"
                }`}
              >
                <i className="fa-regular fa-user "></i> Public Profile
              </h2>
            </a>
            <a href="#" onClick={() => setActiveSection("settings")}>
              <h2
                className={`p-2 font-thin mb-2 ${
                  activeSection === "settings"
                    ? "bg-slate-700 text-orange-500"
                    : "hover:bg-slate-700 hover:text-orange-500"
                }`}
              >
                <i className="fa-regular fa-user"></i> Settings
              </h2>
            </a>
            <a href="#" onClick={() => setActiveSection("plan")}>
              <h2
                className={`p-2 font-thin mb-2 ${
                  activeSection === "plan"
                    ? "bg-slate-700 text-orange-500"
                    : "hover:bg-slate-700 hover:text-orange-500"
                }`}
              >
                <i className="fa-regular fa-user"></i> Plan
              </h2>
            </a>
          </div>
        </div>

        <div className="bg-gray-800 w-full">{renderActiveSection()}</div>

        <div className="bg-gray-800 hidden sm:block sm:w-1/6"></div>
      </div>

      <Footer />
    </>
  );
};

export default YourAccountPage;
