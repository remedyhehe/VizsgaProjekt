import { useEffect, useState } from "react";
import { Project } from "../../utils/util";
import MyProjectCard from "../Cards/MyProjectCard";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { motion } from "framer-motion";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 gap-5 items-center justify-items-center">
          {/* Left-aligned content */}
          <h1 className="text-2xl font-bold text-center">My Projects</h1>

          {/* Center-aligned dropdown */}
          <div className="relative group rounded-lg w-5/6 bg-gray-100 overflow-hidden before:absolute before:w-12 before:h-12 before:content['']  before:rounded-full before:blur-lg ]">
            <svg
              y="0"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              width="100"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              height="100"
              className="w-8 h-8 absolute right-0 -rotate-45 stroke-orange-500 top-1.5 group-hover:rotate-0 duration-300"
            >
              <path
                stroke-width="4"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                className="svg-stroke-primary"
              ></path>
            </svg>
            <select className="appearance-none hover:placeholder-shown:bg-emerald-500 relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 text-sm font-bold rounded-lg block w-full p-2.5">
              <option className="">Latest</option>
              <option className="">Oldest</option>
              <option className="">Most popular</option>
            </select>
          </div>

          {/* Right-aligned "New Project" button */}
          <a href="/newproject">
            <button className="rounded-lg relative w-43 h-10 cursor-pointer flex items-center border border-orange-500 bg-orange-500 group hover:bg-orange-500 active:bg-orange-500 active:border-orange-500">
              <span className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
                New Project
              </span>
              <span className="absolute right-0 h-full w-10 rounded-lg bg-orange-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg
                  className="svg w-8 text-white"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </span>
            </button>
          </a>
        </div>
      </div>

      <div className="flex-grow bg-white py-15 mx-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(9, 100).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }} // Egyenkénti megjelenés
              >
                <MyProjectCard
                  projects={projects}
                  setProjects={setProjects}
                  key={project.id}
                  project={project}
                  created_at={project.created_at}
                  onEdit={(updatedProject) => {
                    const updatedProjects = projects.map((p) =>
                      p.id === updatedProject.id ? updatedProject : p
                    );
                    setProjects(updatedProjects);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
