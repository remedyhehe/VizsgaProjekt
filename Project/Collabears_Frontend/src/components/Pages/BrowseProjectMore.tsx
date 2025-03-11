import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

interface Project {
  name: string;
  description: string;
  member_number: number;
  category: string;
  start_date: string;
  end_date: string;
  // Add other properties of the project here
}

const BrowseProjectMore = () => {
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
    return <h1 className="flex justify-center text-2xl p-5">Loading...</h1>;
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
                Browse
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
      <div className="p-10 flex justify-center gap-5 flex-col items-center">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-lg">{project.description}</p>
      </div>
      <div className="flex-grow bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Members
              </h5>
              <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
                How many members do we need in the project?
              </p>
              <div className="flex justify-center p-5">
                <h1 className="text-4xl font-bold text-orange-500">
                  {project.member_number}
                </h1>
              </div>
            </div>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Category
              </h5>
              <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
                What is the category of the project?
              </p>
              <div className="flex justify-center p-5">
                <h1 className="text-2xl font-bold text-orange-500">
                  {project.category}
                </h1>
              </div>
            </div>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Time
              </h5>
              <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
                How long will the project take?
              </p>
              <div className="flex justify-center p-5">
                <h1 className="text-4xl font-bold text-orange-500">
                  {project.start_date} - {project.end_date}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Kapcsolatfelvételi és jelentkezési szekció */}
      <div className="bg-gray-100 py-10 p-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 justify-center">
          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Apply Now
            </h2>
            <p className="mt-4 text-gray-700 flex justify-center">
              If you are interested, fill the forms below and apply for this
              project.
            </p>

            {/* Jelentkezési űrlap */}
            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Why do you want to join?
                </label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Contact the Project Owner
            </h2>
            <p className="mt-4 text-gray-700 flex justify-center">
              You can contact the project owner for more information.
            </p>

            {/* Jelentkezési űrlap */}
            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrowseProjectMore;
