/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import MyProjects from "./components/Pages/MyProjects";
import NewProject from "./components/Pages/NewProject";
import Projects from "./components/Pages/Projects";
import ProjectDetails from "./components/Pages/ProjectDetails";
import RegisterPage from "./components/Pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import PremiumPage from "./components/Pages/PremiumPage";
import SettingsPage from "./components/Pages/SettingsPage";
import NotificationPage from "./components/Pages/NotificationPage";
import ChatPage from "./components/Pages/ChatPage";
import MembersPage from "./components/Pages/MembersPage";
import FilesPage from "./components/Pages/FilesPage";
import YourAccountPage from "./components/Pages/AccountSettings/YourAccountPage";
import Settings from "./components/Pages/AccountSettings/Settings";
import PublicSettings from "./components/Pages/AccountSettings/PublicSettings";
import BrowseProjectMore from "./components/Pages/BrowseProjectMore";
import LegalPages from "./components/Pages/LegalPages";

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
          <Route path="/account" element={<YourAccountPage />} />
          <Route path="/publicSettings" element={<PublicSettings />} />
          <Route path="/settings" element={<Settings />} />
          
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/projectDetails/:id" element={<ProjectDetails />} />
          <Route path="/projectSettings/:id" element={<SettingsPage />} />
          <Route path="/legals" element={<LegalPages />} />
          <Route path="/browseProject/:id" element={<BrowseProjectMore />} />
          <Route
            path="/projectNotification/:id"
            element={<NotificationPage />}
          />
          <Route path="/projectChat/:id" element={<ChatPage />} />
          <Route path="/projectMembers/:id" element={<MembersPage />} />
          <Route path="/projectFiles/:id" element={<FilesPage />} />
        </Routes>
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
