import { useEffect, useState } from "react";
import { Project } from "../../utils/util";
import MyProjectCard from "../Cards/MyProjectCard";
import Navbar from "../Layouts/Navbar";

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchProjects();
    loadFavorites();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("http://localhost:8000/api/projects");
    const result = await res.json();
    setProjects(result.data);
  };

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "{}"
    );
    setFavorites(savedFavorites);
  };

  const toggleFavorite = (projectId: number) => {
    const newFavorites = { ...favorites, [projectId]: !favorites[projectId] };
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <>
      <Navbar />
      <nav className="flex m-4 justify-center" aria-label="Breadcrumb">
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
        </ol>
      </nav>
      <div className="bg-white p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Left-aligned content */}
          <h1 className="text-2xl font-bold text-center lg:text-left">
            My Projects
          </h1>

          {/* Center-aligned dropdown */}
          <form className="flex justify-center">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Latest</option>
              <option value="US">Oldest</option>
            </select>
          </form>

          {/* Right-aligned "New Project" button */}
          <a href="/newproject">
            <button className="rounded-md bg-slate-800 py-2 px-4 text-white lg:w-auto">
              New Project
            </button>
          </a>
        </div>
      </div>

      <div className="flex-grow bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(10, 100).map((project) => (
              <MyProjectCard
                projects={projects}
                setProjects={setProjects}
                key={project.id}
                project={project}
                onEdit={(updatedProject) => {
                  const updatedProjects = projects.map((p) =>
                    p.id === updatedProject.id ? updatedProject : p
                  );
                  setProjects(updatedProjects);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
