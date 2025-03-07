import { useEffect, useState } from "react";
import { Project } from "../../utils/util";
import ProjectCard from ".././Cards/ProjectCard";
import { motion } from "framer-motion";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const Counter = ({ targetNumber }: { targetNumber: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 másodperc animációs idő
    const interval = 20; // Frissítés 20ms-enként
    const steps = duration / interval;
    const increment = targetNumber / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, interval);

    return () => clearInterval(counter);
  }, [targetNumber]);

  return (
    <motion.h3
      className="text-4xl font-bold text-orange-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {count}
    </motion.h3>
  );
};

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [membersCount, setMembersCount] = useState<number>(0);

  const texts = [
    "Find your perfect team!",
    "Collaborate and innovate!",
    "Start or join amazing projects!",
  ];

  useEffect(() => {
    fetchProjects();
    loadFavorites();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/projects");
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setProjects(result.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
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

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 790 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".fade-in-element");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [projects]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setProjectsCount(result.projects_count);
      setMembersCount(result.members_count);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const countUpEffect = (target: number) => {
    let current = 0;
    const step = Math.ceil(target / 50); // number of steps for the animation
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      return current;
    }, 30); // adjust the interval timing
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-300 min-h-screen">
        <section className="relative bg-cover bg-center text-white py-20">
          <div className="absolute inset-0 bg-[url(/images/proj.jpeg)] bg-cover bg-center blur-[5px] rounded-lg"></div>

          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative container mx-auto px-6 text-center fade-in-element">
            <motion.h1
              key={texts[index]}
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {texts[index]}
            </motion.h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-10 mb-12 fade-in-element">
              <div>
                <Counter targetNumber={projectsCount} />
                <p className="text-gray-600">
                  <i className="fa-solid fa-play"></i> Started Projects
                </p>
              </div>
              <div>
                <Counter targetNumber={membersCount} />
                <p className="text-gray-600">
                  <i className="fa-solid fa-users"></i> Joined Members
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10 fade-in-element">
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
      <Footer />
    </>
  );
};

export default HomePage;
