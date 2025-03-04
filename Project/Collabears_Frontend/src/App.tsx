import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layouts/Navbar";
import HomePage from "./components/Pages/HomePage";
import Footer from "./components/Layouts/Footer";
import MyProjects from "./components/Pages/MyProjects";
import NewProject from "./components/Pages/NewProject";
import Projects from "./components/Pages/Projects";
import ProjectDetails from "./components/Pages/ProjectDetails";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
