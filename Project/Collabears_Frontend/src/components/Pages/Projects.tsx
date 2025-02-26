import { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";
import { Project } from "../../utils/util";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const res = await fetch("http://localhost:8000/api/projects");
    const result = await res.json();
    setProjects(result.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
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
                Browse
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="bg-gray-100 py-5">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 sm:flex sm:justify-around sm:gap-0">
            <a href="#" className="px-3 py-2 hover:text-orange-500">
              Games
            </a>
            <a href="#" className="px-3 py-2 hover:text-orange-500">
              Programs
            </a>
            <a href="#" className="px-3 py-2 hover:text-orange-500">
              Music
            </a>
            <a href="#" className="px-3 py-2 hover:text-orange-500">
              Technology
            </a>
            <a href="#" className="px-3 py-2 hover:text-orange-500">
              Movies
            </a>
            <a href="#" className="px-3 py-2 hover:text-orange-500">
              Fashion
            </a>
            <a href="#" className="px-3 py-2 text-orange-500">
              All
            </a>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
