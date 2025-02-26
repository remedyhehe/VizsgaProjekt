import { Project } from "../utils/util"; // vagy a megfelelő elérési útvonal

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border rounded-lg shadow-lg p-3 text-center transform transition duration-500 hover:scale-105 bg-gray-700 text-white">
      <img
        src="/images/kep2.png"
        alt="Card Image"
        className="w-full h-32 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-bold mb-2">{project.name}</h2>
      <p className="text-white">{project.description}</p>
      <div className="flex gap-6 mt-10 p-3 text-sm justify-center">
        <i className="fa-regular fa-heart fa-xl py-5"></i>
        <button className="bg-emerald-500 p-3 rounded text-black hover:bg-gray-100 font-semibold">
          More
        </button>
        <i className="fa-regular fa-star fa-xl py-5 right-0"></i>
      </div>
    </div>
  );
};

export default ProjectCard;
