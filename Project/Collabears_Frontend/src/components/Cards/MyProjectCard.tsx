import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Project } from "../../utils/util";

interface MyProjectCardProps {
  project: Project;
  projects: Project[];
  created_at: Date;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onEdit: (project: Project) => void;
}

const MyProjectCard = ({ project }: MyProjectCardProps) => {
  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-lg p-5 w-100 mx-auto transform transition-all duration-300 hover:scale-102">
      <div className="flex flex-row justify-between ">
        <h2 className="text-xl font-semibold mb-3 text-orange-500">
          {project.name}
        </h2>
        <div className="flex -space-x-4 rtl:space-x-reverse">
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="../images/avatar.png"
            alt=""
          />
        </div>
      </div>
      <p className="text-gray-300 text-md">{project.description}</p>

      <div className="flex justify-between items-center mt-5">
        <Link
          to={`/projectDetails/${project.id}`}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-medium px-4 py-2 rounded-lg transition-all"
        >
          <i className="fa-solid fa-eye"></i> View
        </Link>
      </div>
    </div>
  );
};

export default MyProjectCard;
