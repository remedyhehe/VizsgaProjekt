import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FaRegFolder } from "react-icons/fa6";
import {
  IoPeopleOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { PiChats } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { FaDoorOpen, FaFolderOpen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHome } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoIosSettings, IoMdChatboxes } from "react-icons/io";

const Sidebar = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger gomb - csak mobilon látszik */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-white text-3xl"
      >
        <GiHamburgerMenu />
      </button>

      {/* Sidebar - mobilon elrejti ha nincs nyitva */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full bg-gray-800"
        } md:translate-x-0 transition-transform duration-300 md:static fixed top-0 left-0 h-screen w-32 bg-gray-800 text-white flex flex-col items-center p-5 z-40`}
      >
        <a href="/">
          <img className="h-16 mb-10" src="/images/maci.PNG" alt="Logo" />
        </a>
        <ul className="space-y-10 flex flex-col">
          <li>
            <a
              href="/"
              className="flex items-center hover:text-blue-500 text-2xl"
            >
              <MdHome />
              <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                Home
              </span>
            </a>
          </li>
          <li>
            <a
              href={`/projectDetails/${id || ""}`}
              className="flex items-center hover:text-blue-500 text-2xl"
            >
              <CgMenuGridR />
            </a>
          </li>
          <li>
            <a
              href={`/projectFiles/${id || ""}`}
              className="flex items-center hover:text-blue-500 text-2xl"
            >
              <FaFolderOpen />
            </a>
          </li>
          <li>
            <a
              href={`/projectMembers/${id || ""}`}
              className="flex items-center hover:text-blue-500 text-2xl"
            >
              <HiUsers />
            </a>
          </li>
          <li>
            <a
              href={`/projectChat/${id || ""}`}
              className="flex items-center hover:text-blue-500 text-2xl"
            >
              <IoMdChatboxes />
            </a>
          </li>
          <li>
            <a
              href={`/projectSettings/${id || ""}`}
              className="flex items-center hover:text-blue-500 text-2xl"
            >
              <IoSettingsSharp />
            </a>
          </li>
          <li>
            <a
              href="/myprojects"
              className="flex items-center text-red-600 text-2xl"
            >
              <FaDoorOpen />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
