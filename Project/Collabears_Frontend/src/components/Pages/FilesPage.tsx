/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";

interface Project {
  name: string;
  files: { name: string; type: string; size: string }[];
}

const FilesPage = () => {
  const [project, setProject] = useState<Project | null>(null);
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
                      Files
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </nav>

          {/* Projekt neve */}
          <div className="bg-gray-900 p-5 h-screen">
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <div className="container p-10 mx-auto">
              <div className="mx-auto p-6 pb-1  bg-gray-800 text-white rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-center justify-between mb-1 -m-2">
                  <div className="w-auto p-2">
                    <h2 className="text-xl font-semibold text-coolGray-900">
                      Files
                    </h2>
                    <p className="text-md text-coolGray-500 font-medium">
                      Manage the project files
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full border-coolGray-100">
                    <div className="flex flex-wrap items-center justify-between py-4 -m-2">
                      <div className="w-auto p-2">
                        <div className="flex flex-wrap items-center -m-2">
                          <div className="w-auto p-2">
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                              >
                                <path
                                  fill="#F59E0B"
                                  d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM5 18C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V14.58L7.3 11.29C7.48693 11.1068 7.73825 11.0041 8 11.0041C8.26175 11.0041 8.51307 11.1068 8.7 11.29L15.41 18H5ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H18.23L14.42 14.17L15.3 13.29C15.4869 13.1068 15.7382 13.0041 16 13.0041C16.2618 13.0041 16.5131 13.1068 16.7 13.29L20 16.58V17ZM20 13.76L18.12 11.89C17.5501 11.3424 16.7904 11.0366 16 11.0366C15.2096 11.0366 14.4499 11.3424 13.88 11.89L13 12.77L10.12 9.89C9.55006 9.34243 8.79036 9.03663 8 9.03663C7.20964 9.03663 6.44994 9.34243 5.88 9.89L4 11.76V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V13.76Z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="w-auto p-2">
                            <h2 className="text-sm font-medium text-coolGray-900">
                              Photos
                            </h2>
                            <h3 className="text-xs font-medium text-coolGray-400">
                              44 photos
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-xs text-coolGray-500 font-medium">
                          128 GB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-b border-coolGray-100">
                    <div className="flex flex-wrap items-center justify-between py-4 -m-2">
                      <div className="w-auto p-2">
                        <div className="flex flex-wrap items-center -m-2">
                          <div className="w-auto p-2">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                              >
                                <path
                                  fill="#2AD168"
                                  d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38C13.2784 2.05174 13.1662 2.01434 13.05 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H15C14.7348 8 14.4804 7.89464 14.2929 7.70711C14.1054 7.51957 14 7.26522 14 7V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V7C12 7.79565 12.3161 8.55871 12.8787 9.12132C13.4413 9.68393 14.2044 10 15 10H18V19Z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="w-auto p-2">
                            <h2 className="text-sm font-medium text-coolGray-900">
                              Folders
                            </h2>
                            <h3 className="text-xs font-medium text-coolGray-400">
                              33 folders
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-xs text-coolGray-500 font-medium">
                          256 GB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between py-4 -m-2">
                      <div className="w-auto p-2">
                        <div className="flex flex-wrap items-center -m-2">
                          <div className="w-auto p-2">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-50 text-green-500 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M21.53 7.15C21.378 7.06223 21.2055 7.01603 21.03 7.01603C20.8545 7.01603 20.682 7.06223 20.53 7.15L17 8.89C16.9715 8.11357 16.6429 7.37847 16.0834 6.83944C15.5238 6.3004 14.777 5.99948 14 6H5C4.20435 6 3.44129 6.31607 2.87868 6.87868C2.31607 7.44129 2 8.20435 2 9V15C2 15.7957 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18H14C14.777 18.0005 15.5238 17.6996 16.0834 17.1606C16.6429 16.6215 16.9715 15.8864 17 15.11L20.56 16.89C20.6963 16.9599 20.8468 16.9975 21 17C21.1872 17.0006 21.3709 16.9486 21.53 16.85C21.6741 16.7599 21.7929 16.6346 21.8751 16.4859C21.9574 16.3372 22.0003 16.1699 22 16V8C22.0003 7.83006 21.9574 7.66283 21.8751 7.51411C21.7929 7.36538 21.6741 7.24007 21.53 7.15ZM15 15C15 15.2652 14.8946 15.5196 14.7071 15.7071C14.5196 15.8946 14.2652 16 14 16H5C4.73478 16 4.48043 15.8946 4.29289 15.7071C4.10536 15.5196 4 15.2652 4 15V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H14C14.2652 8 14.5196 8.10536 14.7071 8.29289C14.8946 8.48043 15 8.73478 15 9V15ZM20 14.38L17 12.88V11.12L20 9.62V14.38Z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="w-auto p-2">
                            <h2 className="text-sm font-medium text-coolGray-900">
                              Movies
                            </h2>
                            <h3 className="text-xs font-medium text-coolGray-400">
                              3 videos
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-xs text-coolGray-500 font-medium">
                          3 GB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fájlok megjelenítése */}
        </div>
      </div>
    </>
  );
};

export default FilesPage;
