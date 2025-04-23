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
      transition={{ duration: 2 }}
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
        <section className="flex flex-col md:flex-row items-center text-white px-6 py-20 md:px-20 bg-gradient-to-r from-orange-500 to-orange-700">
          <motion.div
            className="w-full md:w-1/2 pr-0 md:pr-10 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }} // Kezdőállapot: teljesen áttetsző és lentebb
            animate={{ opacity: 1, y: 0 }} // Animáció: fokozatosan jelenjen meg és mozogjon felfelé
            transition={{ duration: 1, ease: "easeOut" }} // Lassú, sima megjelenés
          >
            <motion.h1
              key={texts[index]}
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {texts[index]}
            </motion.h1>
            <p className="text-xl md:text-2xl mb-6">
              Start your own project or join others to do great things together.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
              <a
                href="myprojects"
                className="px-6 py-3 bg-slate-100 border-b-4 text-black font-medium rounded-lg shadow-md hover:bg-slate-200"
              >
                <i className="fa-solid fa-folder-plus"></i> My Projects
              </a>
              <a
                href="projects"
                className="relative px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg border-2 border-orange-700 hover:border-orange-500 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,165,0,0.6)] active:scale-95"
              >
                Browse projects
              </a>
            </div>
          </motion.div>
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
            <motion.img
              src="/images/hatterke.png"
              alt="Web development illustration"
              className="rounded-lg w-full md:w-auto max-w-md md:max-w-lg"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-10 mb-12 fade-in-element">
              <div>
                <Counter targetNumber={projectsCount} />
                <p className="text-gray-600">
                  <i className="fa-solid fa-play"></i> Started Projects
                </p>
              </div>

              <div>
                <Counter targetNumber={projectsCount} />
                <p className="text-gray-600">
                  <i className="fa-solid fa-user-plus"></i> Subscribed members
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

        <div className="py-10 w-full">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Top Projects <i className="fa-solid fa-star"></i>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
              {projects.slice(0, 3).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <ProjectCard
                    project={project}
                    isFavorite={favorites[project.id] || false}
                    onToggleFavorite={() => toggleFavorite(project.id)}
                  />
                </motion.div>
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
