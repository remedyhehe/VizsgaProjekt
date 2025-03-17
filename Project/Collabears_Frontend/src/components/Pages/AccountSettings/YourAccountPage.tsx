import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";

const YourAccountPage = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
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
      <div className="sm:flex">
        {/* Oldalsó nem látható sáv */}
        <div className="bg-blue-600 hidden sm:block sm:w-1/6">a</div>
        <div className="bg-red-600 w-screen sm:w-2/6 md:w-1/6">
          <h2 className="text-2xl font-semibold">username</h2>
          <h2 className="text-lg">Free subscription</h2>
        </div>
        <div className="bg-orange-600 w-screen sm:w-3/4 md:w-2/3">a</div>
        <div className="bg-blue-600 hidden sm:block sm:w-1/6">a</div>
      </div>
    </>
  );
};

export default YourAccountPage;
