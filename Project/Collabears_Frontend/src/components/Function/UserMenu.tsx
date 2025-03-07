import React, { useState } from "react";
import LogoutButton from "./LogoutButton"; // Importáld a logout komponenst

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = localStorage.getItem("user_name") || "Guest";

  return (

    <div className="text-left">
        <div className="my-2 text-center h-[2px] bg-slate-700"></div>

      {/* Gomb a menü nyitásához */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-auto p-4 text-white hover:text-orange-500" // Csak annyi szélességet használ, amennyire szükség van
      >
        <i className="fa-regular fa-user"></i> Your Account
      </button>

      {/* Dropdown Menü */}
      {isOpen && (
        <div className="block left-0 w-48 bg-white shadow-md rounded-lg p-2 mt-2 z-10">
          <h2 className="text-left p-2 rounded-lg font-semibold">Welcome, {userName}!</h2>
          <div className="my-2 mx-auto w-2/3 h-[2px] bg-gray-200"></div>

          <a href="/account" className="block p-2 hover:bg-slate-300 rounded-lg">
            <i className="fa-regular fa-user"></i> Account
          </a>
          <a href="/premium" className="block p-2 hover:bg-slate-300 rounded-lg">
            <i className="fa-regular fa-circle-up"></i> Upgrade Plan
          </a>
          <a href="/" className="block p-2 hover:bg-slate-300 rounded-lg">
            <i className="fa-solid fa-gear"></i> Settings
          </a>

          <div className="my-2 mx-auto w-2/3 h-[2px] bg-gray-200"></div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
