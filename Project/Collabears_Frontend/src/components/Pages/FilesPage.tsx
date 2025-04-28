/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";

interface File {
  name: string;
  type: string;
  size: string;
}

interface Project {
  name: string;
  files: File[] | null;
}

const FilesPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Files");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/projects/${id}`);
        const result = await res.json();
        if (result.status) {
          setProject({
            name: result.data.name,
            files: result.data.files || [], // Ensure files is initialized as an empty array if undefined
          });
        } else {
          console.error("Error fetching project:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, [id]);

  if (!project)
    return (
      <div className="bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading project details...</div>
      </div>
    );

  const tabs = ["Documentation", "Files", "Database"];
  const handleTabClick = (tab: string) => setActiveTab(tab);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Documentation":
        return <DocumentationTab />;
      case "Files":
        return <FilesTab project={project} />;
      case "Database":
        return <DatabaseTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
          <nav
            className="flex justify-start ml-10 bg-gray-900 text-white p-5"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    My Projects
                  </span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {project.name}
                  </span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Files
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </nav>
        {/* Header */}
        <div className="bg-white shadow-md p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center bg-gray-200 py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-6 py-2 mx-2 font-medium text-gray-700 rounded ${
                activeTab === tab ? "bg-white shadow" : "hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

const DocumentationTab = () => {
  return (
    <div className="text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Project Documentation</h2>
      <p>Here you can add, edit, or view the documentation for this project.</p>
    </div>
  );
};

const FilesTab = ({ project }: { project: Project }) => {
  // Check if files exist before rendering
  if (!project.files || project.files.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No files available for this project.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Files</h2>
        <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          <AiOutlineFileAdd className="mr-2" /> Add File
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded hover:shadow-md transition"
          >
            <h3 className="text-gray-800 font-medium">{file.name}</h3>
            <p className="text-gray-500 text-sm">{file.type || "Unknown"}</p>
            <p className="text-gray-400 text-xs">{file.size}</p>
          </div>
        ))}
      </div>

      {/* Drag and Drop részt is kiegészítjük */}
      <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded text-center">
        <BsCloudUpload className="text-3xl text-gray-500 mx-auto mb-2" />
        <p className="text-gray-500">
          Drag and drop files here or click to upload
        </p>
        <label className="block mt-2">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
            Upload Files
          </span>
        </label>
      </div>
    </div>
  );
};

const DatabaseTab = () => {
  return (
    <div className="text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Database Overview</h2>
      <p>Manage and view database tables for this project.</p>
    </div>
  );
};

export default FilesPage;
