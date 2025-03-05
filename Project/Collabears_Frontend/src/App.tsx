/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layouts/Navbar";
import HomePage from "./components/Pages/HomePage";
import Footer from "./components/Layouts/Footer";
import MyProjects from "./components/Pages/MyProjects";
import NewProject from "./components/Pages/NewProject";
import Projects from "./components/Pages/Projects";
import ProjectDetails from "./components/Pages/ProjectDetails";
import RegisterPage from "./components/Pages/RegisterPage";
import LoginPage from "./components/Pages/LoginPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
