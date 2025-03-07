import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { Project } from "../../utils/util";
interface MyProjectCardProps {
  project: Project;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onEdit: (project: Project) => void;
}

const MyProjectCard = ({ project }: MyProjectCardProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-3 text-center text-white mx-auto w-sm h-60 bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
      <h2 className="text-lg font-bold mb-2">Project Name: {project.name}</h2>
      <p className="text-white">Project description: {project.description}</p>
      <div className="block gap-6 mt-10 p-3 text-sm justify-center">
        <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-black bg-emerald-400 hover:bg-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          <Link to={`/projectDetails/${project.id}`}>
            View <i className="fa-solid fa-eye"></i>
          </Link>
        </button>
        <div className="flex justify-center p-5">
          <p>{project.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProjectCard;
