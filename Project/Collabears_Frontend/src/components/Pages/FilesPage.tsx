import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { AiOutlineFileAdd } from "react-icons/ai";
import { toast } from "react-toastify";

interface File {
  name: string;
  type: string;
  size: string;
}

interface Project {
  name: string;
  files: File[];
  notes: string;
}

const FilesPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project>({
    name: "",
    files: [],
    notes: "",
  });

  // Load project data from localStorage on page load
  useEffect(() => {
    const storedProject = localStorage.getItem(`project_${id}`);
    const initialProject = storedProject ? JSON.parse(storedProject) : null;

    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/projects/${id}`);
        const result = await res.json();

        if (result.status && result.data) {
          // Merge fetched data with localStorage data
          const mergedProject = {
            ...initialProject, // Existing data from localStorage
            name: result.data.name, // Update name with fetched data
          };
          setProject(mergedProject);
        } else {
          console.error("Error fetching project:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (initialProject) {
      setProject(initialProject); // Use localStorage data if available
    } else {
      fetchProject(); // Fetch from API if nothing in localStorage
    }
  }, [id]);

  // Save project data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`project_${id}`, JSON.stringify(project));
  }, [project, id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    }));

    setProject((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));

    toast.success("Files uploaded successfully!");
  };

  const handleSaveNotes = () => {
    toast.success("Notes saved successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
          <nav
            className="flex justify-center bg-gray-900 text-white p-5"
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

        <main className="p-6 space-y-8">
          {/* Files Section */}
          <section className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Uploaded Files</h2>
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                <AiOutlineFileAdd className="mr-2" /> Add Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.files.map((file, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
                >
                  <h3 className="text-lg font-medium">{file.name}</h3>
                  <p className="text-sm text-gray-400">
                    {file.type || "Unknown type"}
                  </p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              ))}
            </div>
            {project.files.length === 0 && (
              <p className="text-gray-500 mt-4">
                No files uploaded yet. Use the “Add Files” button above to
                upload files.
              </p>
            )}
          </section>

          {/* Notes Section */}
          <section className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Project Notes</h2>
            <textarea
              value={project.notes}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full h-40 p-4 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Write your project notes here..."
            />
            <button
              onClick={handleSaveNotes}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Notes
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FilesPage;
