import { useEffect, useState } from "react";
import ProjectCard from ".././Cards/ProjectCard";
import { Project } from "../../utils/util";
import { FaLaptopCode } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import { MdMovieCreation } from "react-icons/md";
import { FaShirt } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchProjects(selectedCategory);
    loadFavorites();
  }, [selectedCategory]);

  const fetchProjects = async (category: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/projects");
      const result = await res.json();
      const filteredProjects =
        category === "All"
          ? result.data
          : result.data.filter(
              (project: Project) => project.category === category
            );
      setProjects(filteredProjects || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
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

  const categories = [
    { name: "All", icon: null },
    { name: "Favorites", icon: <MdFavorite /> },
    { name: "Games", icon: <IoGameController /> },
    { name: "Programing", icon: <FaLaptopCode /> },
    { name: "Music", icon: <FaMusic /> },
    { name: "Technology", icon: <GrTechnology /> },
    { name: "Movies", icon: <MdMovieCreation /> },
    { name: "Fashion", icon: <FaShirt /> },
  ];
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundCategory = categories.find(
      (category) => category.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setSelectedCategory(foundCategory ? foundCategory.name : "All");
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 sm:flex sm:gap-0 justify-center">
            {categories.map((category) => (
              <a
                key={category.name}
                href="#"
                className={`px-3 py-2 flex items-center ${
                  selectedCategory === category.name
                    ? "text-orange-500"
                    : "hover:text-orange-500"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.name}
              </a>
            ))}
          </div>
          <form className="max-w-md mx-auto pt-4" onSubmit={handleSearch}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-grow bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 9).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFavorite={favorites[project.id] || false}
                onToggleFavorite={() => toggleFavorite(project.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
