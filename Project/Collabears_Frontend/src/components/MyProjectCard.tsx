import { Link } from "react-router-dom";
import { Project } from "../utils/util"; // vagy a megfelelő elérési útvonal

interface MyProjectCardProps {
  project: Project;
}

const MyProjectCard: React.FC<MyProjectCardProps> = ({ project }) => {
  return (
    <div className="border rounded-lg shadow-lg p-3 text-center text-white mx-auto w-sm h-60 bg-gray-700 cursor-pointer hover:bg-gradient-to-t from-gray-500 via-gray-400 to-gray-500 transition-all duration-300 ease-in-out block justify-center items-center transform hover:scale-110">
      <h2 className="text-lg font-bold mb-2">Project Name: {project.name}</h2>
      <p className="text-white">Project description: {project.description}</p>
      <div className="block gap-6 mt-10 p-3 text-sm justify-center">
        <button
          type="button"
          className="transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 text-black bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
        >
          <Link to={`/project/${project.id}`}>
            View <i className="fa-solid fa-eye"></i>
          </Link>
        </button>
        <button
          type="button"
          className=" transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-100   focus:outline-none text-black bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-emerald-900"
        >
          Edit <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          type="button"
          className="transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-100   focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-red-900"
        >
          Delete <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default MyProjectCard;
