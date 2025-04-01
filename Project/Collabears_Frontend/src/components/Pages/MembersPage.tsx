/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import ReactCountryFlag from "react-country-flag";
import { FaRegEdit } from "react-icons/fa";
import React from "react";
import { IoMdClose } from "react-icons/io";
interface IUser {
  name: string;
  email: string;
}

const MembersPage = () => {
  interface Project {
    name: string;
    // Add other properties as needed
  }

  const [project, setProject] = useState<Project | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users");
      const result = await res.json();
      if (result.status) {
        setUsers(result.data); // Frissíti a users állapotot
      } else {
        console.error("Error fetching users:", result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpen = () => setOpen(!open);
  const { id } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/projects/${id}`);
        const result = await res.json();
        if (result.status) {
          setProject(result.data);
        } else {
          console.error("Error fetching project:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, [id]);
  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    setUserName(storedName);
  }, []);

  if (!project)
    return (
      <div className="bg-gray-900 h-screen">
        <div className="flex gap-3 flex-wrap justify-center p-4 md:p-12 ">
          <button
            disabled={true}
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 text-center inline-flex items-center animate-pulse dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-5 h-5 mr-2 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              ></path>
            </svg>
            Please wait..
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto ml-32">
          {/* Navbar */}
          <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
            <nav
              className="flex justify-start ml-5 bg-gray-900 text-white p-5"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-orange-500"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      My Projects
                    </span>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {project.name}
                    </span>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      Members
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </nav>
          <div className="bg-gray-900 h-screen">
            <div className="bg-gray-900 justify-between items-center p-5 ">
              <h1 className="text-2xl font-bold text-white ml-10 pt-5 flex">
                {project.name}
              </h1>

              <div className="relative flex flex-col w-full h-full text-white p-5 mt-5 bg-gray-800 shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-white bg-gray-800 rounded-none bg-clip-border">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    <div>
                      <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Members list
                      </h5>
                      <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-white">
                        See information about all members
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button className="text-zinc-500 hover:text-orange-600 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-orange-600 duration-700">
                        View All
                      </button>
                      <button
                        onClick={handleOpen}
                        className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          stroke-width="2"
                          className="w-4 h-4"
                        >
                          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                        </svg>
                        Add member
                      </button>
                      {open && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
                          <div className="relative w-full max-w-lg p-6 bg-gray-700 rounded-lg shadow-lg">
                            <button
                              onClick={handleOpen} // Bezáráskor is meghívja a handleOpen-t
                              className="px-4 py-2 text-white bg-slate-900 rounded-md flex justify-items-center absolute top-5 right-5"
                            >
                              <IoMdClose className="text-red-500" />
                            </button>
                            <div className="flex justify-between p-5">
                              <div className="flex flex-col gap-3">
                                <h2 className="text-xl font-semibold text-white">
                                  Add New Member
                                </h2>
                                <p>
                                  Discover the right people for your team.
                                  Invite members who match your project’s needs
                                  and collaborate efficiently!"
                                </p>
                              </div>
                            </div>

                            <form className="max-w-md mx-auto mt-5">
                              <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-white sr-only dark:text-black"
                              >
                                Search
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  type="search"
                                  id="default-search"
                                  className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-lg bg-gray-50 dark:bg-gray-100  dark:text-black"
                                  placeholder="Search members"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </form>
                            <div className="mt-4 max-h-60 overflow-y-auto">
                              {filteredUsers.map((user) => (
                                <div
                                  key={user.email}
                                  className="p-3 border-b border-gray-600 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center"
                                >
                                  <span className="flex items-center gap-3 mb-2 sm:mb-0">
                                    <img
                                      src="../images/avatar.png"
                                      className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                    />
                                    {user.name}
                                  </span>
                                  <button className="px-3 py-1 text-white bg-orange-600 rounded-md hover:bg-orange-700">
                                    Add
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="block w-full overflow-hidden md:w-max">
                      <nav>
                        <ul
                          role="tablist"
                          className="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60"
                        >
                          <li
                            role="tab"
                            className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                            data-value="all"
                          >
                            <div className="z-20 text-inherit">
                              &nbsp;&nbsp;All&nbsp;&nbsp;
                            </div>
                            <div className="absolute inset-0 z-10 h-full bg-gray-700 rounded-md shadow"></div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="w-full md:w-72">
                      <div className="p-5 overflow-hidden w-[60px] h-[30px] hover:w-[270px] bg-orange-500 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
                        <div className="flex items-center justify-center fill-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Isolation_Mode"
                            data-name="Isolation Mode"
                            viewBox="0 0 24 24"
                            width="22"
                            height="17"
                          >
                            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="Search"
                          className="outline-none text-md bg-transparent w-full text-white font-normal px-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 px-0">
                  <table className="w-full mt-4 text-left table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Member
                          </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Country
                          </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Role
                          </p>
                        </th>

                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Added
                          </p>
                        </th>
                        <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <img
                              src="../images/avatar.png"
                              alt="John Michael"
                              className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                            />
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {userName}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="w-max">
                            <ReactCountryFlag
                              countryCode="HU"
                              svg
                              style={{
                                width: "2em",
                                height: "2em",
                              }}
                              title="HU"
                            />
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              Owner
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            -
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a href="#">
                            <FaRegEdit className="text-xl text-yellow-500" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersPage;
