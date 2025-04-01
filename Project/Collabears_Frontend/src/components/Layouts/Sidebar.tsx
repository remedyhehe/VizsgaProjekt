import { CgMenuGridR } from "react-icons/cg";
import { FaRegFolder } from "react-icons/fa6";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { PiChats } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { FaDoorOpen } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const { id } = useParams();
  return (
    <div className="w-32 bg-gray-800 text-white h-full fixed left-0 flex flex-col items-center p-5">
      <a href="/">
        <img className="h-16 mb-10" src="/images/maci.PNG" alt="Logo" />
      </a>
      <ul className="space-y-10 flex flex-col">
        <li>
          <a
            href="/"
            className="flex items-center hover:text-orange-500 text-2xl"
          >
            <AiOutlineHome />
            <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
              Home
            </span>
          </a>
        </li>
        <li>
          <a
            href={`/projectDetails/${id || ""}`}
            className="flex items-center hover:text-orange-500 text-2xl"
          >
            <CgMenuGridR />
          </a>
        </li>
        <li>
          <a
            href={`/projectFiles/${id || ""}`}
            className="flex items-center hover:text-orange-500 text-2xl"
          >
            <FaRegFolder />
          </a>
        </li>
        <li>
          <a
            href={`/projectMembers/${id || ""}`}
            className="flex items-center hover:text-orange-500 text-2xl"
          >
            <IoPeopleOutline />
          </a>
        </li>
        <li>
          <a
            href={`/projectChat/${id || ""}`}
            className="flex items-center hover:text-orange-500 text-2xl"
          >
            <PiChats />
          </a>
        </li>
        <li>
          <a
            href={`/projectSettings/${id || ""}`}
            className="flex items-center hover:text-orange-500 text-2xl"
          >
            <IoSettingsOutline />
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
  );
};

export default Sidebar;
