import { Link } from "react-router-dom";
import { Project } from "../../utils/util";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFavorite: initialIsFavorite,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      await fetch(`http://localhost:8000/api/favorites/${project.id}/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // If you are using token-based auth
        },
      });

      setIsAnimating(true); // Start animation
      setTimeout(() => setIsAnimating(false), 500); // End animation after 500ms
      setIsFavorite(!isFavorite); // Update state
      onToggleFavorite(); // Notify parent component
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-3 text-center transform transition duration-500 hover:scale-102 bg-gray-700 text-white h-[450px] hover:shadow-[0_0_30px_rgba(0,183,255,0.5)]">
      <div className="flex justify-start p-3">
        <i
          className={`fa-${
            isFavorite ? "solid" : "regular"
          } fa-heart fa-xl py-5 cursor-pointer ${
            isFavorite ? "text-red-500" : "text-white"
          } ${isAnimating ? "animate-pump" : ""}`}
          onClick={handleToggleFavorite}
        ></i>
      </div>
      <img
        src={project.image_url || "/images/default.png"}
        alt="Card Image"
        className="w-full h-32 object-cover mb-4 rounded-md"
      />

      <h2 className="text-lg font-bold mb-2">{project.name}</h2>
      <p className="text-white">{project.description}</p>

      <div className="flex gap-6 mt-10 p-3 text-sm justify-center">
        <Link to={`/browseProject/${project.id}`}>
          <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-gray-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-orange-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                className="w-5 h-5 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              See more
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
