/** @format */

import { CgBoard } from "react-icons/cg";
import { FaCalendar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiViewTimeline } from "react-icons/ci";
import Sidebar from "../Layouts/Sidebar";
import Tasks from "./ProjectDetailsFolder/Tasks";
import Calendar from "./ProjectDetailsFolder/Calendar";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import Diagram from "./ProjectDetailsFolder/Diagram";
import TimeLine from "./ProjectDetailsFolder/TimeLine";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const [project, setProject] = useState<{ id: number; name: string } | null>(
    null
  );
  const { id } = useParams();

  const [smallSiteId, setSmallSiteId] = useState(0);

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
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Navbar */}
          <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
            <nav
              className="flex justify-start ml-10 bg-gray-900 text-white p-5"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {project.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-2xl font-bold text-white ml-10 pt-5 flex">
              {project.name}
            </h1>
            <div className="max-w-screen-xl flex flex-row items-center p-5 ml-5 mt-5">
              <div className="w-full md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-md">
                  <li>
                    <button
                      onClick={() => setSmallSiteId(0)}
                      className={`flex items-center p-5 gap-2 rounded-sm md:border-0 md:p-0
    ${
      smallSiteId === 0
        ? " text-orange-500"
        : "text-gray-900 hover:bg-gray-100 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    }`}
                    >
                      <CgBoard />
                      Board
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setSmallSiteId(4)}
                      className={`flex items-center p-5 gap-2 rounded-sm md:border-0 md:p-0
                        ${
                          smallSiteId === 4
                            ? " text-orange-500"
                            : "text-gray-900 hover:bg-gray-100 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        }`}
                    >
                      <FaCalendar />
                      Calendar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toast.error(
                          "The diagram feature is only available in the PRO version."
                        );
                      }}
                      className={`flex items-center p-5 gap-2 rounded-sm md:border-0 md:p-0 text-gray-400 hover:text-gray-600`}
                    >
                      <FiLock />
                      Diagram
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toast.error(
                          "The timeline feature is only available in the PRO version."
                        );
                      }}
                      className="flex items-center p-5 gap-2 rounded-sm md:border-0 md:p-0 text-gray-400 hover:text-gray-600"
                    >
                      <FiLock />
                      TimeLine
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Változó tartalom innen -------------------------------------------------------------------------------------------- */}

          {smallSiteId === 0 && <Tasks />}
          {smallSiteId === 1 && <TimeLine tasks={[]} />}
          {smallSiteId === 4 && <Calendar />}
          {smallSiteId === 5 && <Diagram />}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
