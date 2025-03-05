import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { Project } from "../utils/util";
interface MyProjectCardProps {
  project: Project;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onEdit: (project: Project) => void;
}

const MyProjectCard = ({
  project,
  projects,
  setProjects,
  onEdit,
}: MyProjectCardProps) => {
  const deleteProject = async (id: number) => {
    if (confirm("Are you sure you want to delete?")) {
      const res = await fetch(`http://localhost:8000/api/projects/` + id, {
        method: "DELETE",
      });
      // Update UI after successful deletion
      const newProjects = projects.filter((project) => project.id !== id);
      setProjects(newProjects);
      toast("Project deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#34c24a",
          color: "#fff",
          fontSize: "18px",
          padding: "16px",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-3 text-center text-white mx-auto w-sm h-60 bg-gray-700 cursor-pointer hover:bg-gradient-to-t from-gray-500 via-gray-400 to-gray-500 transition-all duration-300 ease-in-out transform hover:scale-110">
      <h2 className="text-lg font-bold mb-2">Project Name: {project.name}</h2>
      <p className="text-white">Project description: {project.description}</p>
      <div className="block gap-6 mt-10 p-3 text-sm justify-center">
        <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-black bg-emerald-400 hover:bg-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          <Link to={`/project/${project.id}`}>
            View <i className="fa-solid fa-eye"></i>
          </Link>
        </button>
        <button
          onClick={() => onEdit(project)}
          className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 text-black bg-emerald-400 hover:bg-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Edit <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={() => deleteProject(project.id)}
          className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Delete <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default MyProjectCard;
