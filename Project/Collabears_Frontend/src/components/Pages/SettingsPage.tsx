import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";

interface Project {
  name: string;
  description?: string;
  category?: string;
  member_number?: number;
  start_date?: string;
  end_date?: string;
}

const SettingsPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/projects/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.status) {
        alert("Project deleted successfully");
        navigate("/");
      } else {
        alert("Error deleting project: " + result.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!project)
    return <h1 className="flex justify-center text-2xl p-5">Loading...</h1>;

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
                      Settings
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </nav>
          <div className="bg-gray-900">
            <h1 className="text-2xl font-bold text-white ml-10 pt-5 flex">
              {project.name}
            </h1>

            {/* Project Form */}
            <div className="mt-8 mx-10 flex justify-center">
              <form className="bg-gray-800 p-6 rounded-lg shadow-md w-1/2 mb-10">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={project.name}
                    readOnly
                    className="mt-1 p-2 block w-full border text-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={project.description || ""}
                    readOnly
                    rows={4}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={project.category || ""}
                    readOnly
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="member_number"
                    className="block text-sm font-medium text-white"
                  >
                    Member Number
                  </label>
                  <input
                    type="number"
                    id="member_number"
                    value={project.member_number || ""}
                    readOnly
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="start_date"
                    className="block text-sm font-medium text-white"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    value={project.start_date || ""}
                    readOnly
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="end_date"
                    className="block text-sm font-medium text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    value={project.end_date || ""}
                    readOnly
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                  />
                </div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Save changes
                </button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
