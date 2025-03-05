/** @format */

import { useEffect, useState } from "react";
import { Project } from "../../utils/util";
import MyProjectCard from "../MyProjectCard";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
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
      <div className="bg-white">
        <div className="flex flex-col p-5 items-center justify-center bg-white">
          <a href="/newproject">
            <button className="rounded-md bg-slate-800 py-2 px-4 text-white">
              New Project
            </button>
          </a>
        </div>

        <div className="flex flex-col p-5 items-center justify-center gap-10 bg-white">
          <h1 className="text-2xl font-bold">My Projects</h1>
        </div>

        <div className="flex-grow bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(10, 100).map((project) => (
                <MyProjectCard
                  projects={projects} // Ezt hozzá kell adni!
                  setProjects={setProjects} // Ezt is!
                  key={project.id}
                  project={project}
                  onEdit={openEditModal}
                />
              ))}
            </div>
          </div>
        </div>

        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="flex  justify-between items-center pb-4 border-b">
                <h3 className="text-lg font-semibold text-white">
                  Edit Project
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <form>
                <div className="flex flex-col gap-4 mb-4 sm:grid-cols-2 text-white">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      defaultValue={selectedProject.name}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      defaultValue={selectedProject.description}
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                  >
                    Done
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjects;
