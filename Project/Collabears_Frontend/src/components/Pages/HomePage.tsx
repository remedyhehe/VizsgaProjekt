import { useEffect, useState } from "react";
import { Project } from "../../utils/util";
import ProjectCard from "../ProjectCard";

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const fetchProjects = async () => {
    const res = await fetch("http://localhost:8000/api/projects");
    const result = await res.json();
    setProjects(result.data);
  };

  useEffect(() => {
    fetchProjects();
    loadFavorites();
  }, []);

  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 790) {
        setSlidesPerView(1); // If the screen is smaller than 790px, show 1 card
      } else {
        setSlidesPerView(3); // Default to 3 cards
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer Hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    // Select all elements to observe
    const elements = document.querySelectorAll(".fade-in-element");
    elements.forEach((el) => observer.observe(el));

    return () => {
      // Cleanup the observer
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
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

  return (
    <div className="bg-gray-300 min-h-screen">
      <section className="relative bg-cover bg-center text-white py-20">
        <div className="absolute inset-0 bg-[url(/images/proj.jpeg)] bg-cover bg-center blur-[5px]"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-6 text-center fade-in-element">
          <h1 className="text-4xl font-bold mb-4">Find your perfect team!</h1>
          <p className="text-lg mb-6">
            Start your own project or join others to do great things together.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="myprojects"
              className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700"
            >
              <i className="fa-solid fa-folder-plus"></i> My Projects
            </a>
            <a
              href="projects"
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900"
            >
              Browse between projects
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8 mb-12 fade-in-element">
            <div>
              <h3 className="text-4xl font-bold text-orange-500">0</h3>
              <p className="text-gray-600">
                <i className="fa-solid fa-play"></i> Started Projects
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-orange-500">0</h3>
              <p className="text-gray-600">
                <i className="fa-solid fa-users"></i> Joined Members
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-orange-500">0</h3>
              <p className="text-gray-600">
                <i className="fa-solid fa-check"></i> Active Projects
              </p>
            </div>
          </div>

          <div className="text-center fade-in-element">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Why you should use our site?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-orange-500 group-hover:stroke-white">
                  <i className="fa-solid fa-bolt"></i> Fast recruitment
                </h3>
                <p className="text-gray-600 group-hover:text-orange-500">
                  Find the right team members for your project quickly and
                  easily.
                </p>
              </div>
              <div className="group bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-orange-500">
                  <i className="fa-solid fa-magnifying-glass"></i> Easy
                  searching
                </h3>
                <p className="text-gray-600 group-hover:text-orange-500">
                  Filter by projects and skills to easily find what you're
                  looking for.
                </p>
              </div>
              <div className="group bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-orange-500">
                  <i className="fa-solid fa-earth-europe"></i> Wide community
                </h3>
                <p className="text-gray-600 group-hover:text-orange-500">
                  Join an active and inspiring community where everyone works
                  together to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 fade-in-element">
            Top Projects <i className="fa-solid fa-star"></i>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
            {projects.slice(0, 3).map((project) => (
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

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 fade-in-element">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            How it works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-orange-500 text-4xl mb-4">1</div>
              <p className="text-gray-600">
                Create a project or browse existing ones.
              </p>
            </div>
            <div>
              <div className="text-orange-500 text-4xl mb-4">2</div>
              <p className="text-gray-600">Add roles and skills.</p>
            </div>
            <div>
              <div className="text-orange-500 text-4xl mb-4">3</div>
              <p className="text-gray-600">
                Find team members or join a project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 fade-in-element">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            User reviews <i className="fa-solid fa-comment"></i>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">
                "Thanks to the platform, I found the perfect team for app
                development!"
              </p>
              <p className="text-gray-800 mt-4 font-bold">- Gergő</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">
                "Easy and quick way to get started, fantastic community."
              </p>
              <p className="text-gray-800 mt-4 font-bold">- Peti</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">
                "I have been looking for a platform like this for a long time.
                Thank you!"
              </p>
              <p className="text-gray-800 mt-4 font-bold">- Zoli</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
