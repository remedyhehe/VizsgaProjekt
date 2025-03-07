import { Project } from "..//../utils/util";
import { PiCursorClickBold } from "react-icons/pi";

interface ProjectCardProps {
  project: Project;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="border rounded-lg shadow-lg p-3 text-center transform transition duration-500 hover:scale-105 bg-gray-700 text-white">
      <div className="flex justify-start p-3">
        <i
          className={`fa-${
            isFavorite ? "solid" : "regular"
          } fa-heart fa-xl py-5 cursor-pointer ${
            isFavorite ? "text-red-500" : "text-white"
          }`}
          onClick={onToggleFavorite}
        ></i>
      </div>
      <img
        src="/images/kep2.png"
        alt="Card Image"
        className="w-full h-32 object-cover mb-4 rounded-md"
      />

      <h2 className="text-lg font-bold mb-2">{project.name}</h2>
      <p className="text-white">{project.description}</p>

      <div className="flex gap-6 mt-10 p-3 text-sm justify-center">
        <button className="bg-emerald-500 p-3 rounded text-black hover:bg-gray-100 font-semibold flex">
          Click More <PiCursorClickBold />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
