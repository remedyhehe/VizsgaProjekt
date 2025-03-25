import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { GoCheck } from "react-icons/go";

interface Project {
  name: string;
  description?: string;
  category?: string;
  member_number?: number;
  start_date?: string;
  end_date?: string;
}

const SettingsPage = () => {
  const { register, handleSubmit, reset } = useForm<Project>();

  const [project, setProject] = useState<Project | null>(null);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal állapot
  const { id } = useParams();
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    newMembers: true,
    deadlineReminders: true,
  });
  const navigate = useNavigate();
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };
  const formSubmit: SubmitHandler<Project> = async (formData) => {
    const data = { ...formData, description: input };
    try {
      const response = await fetch("http://localhost:8000/api/projects/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Project updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          backgroundColor: "#008000",
          color: "#fff",
          fontWeight: "bold",
        },
        icon: <GoCheck color="black" />,
      });
      navigate("/myprojects");
    } catch (error) {
      console.error("Error:", error);
      // Handle network or other errors
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/projects/${id}`);
        const result = await res.json();
        if (result.status) {
          setProject(result.data);
          reset(result.data);
        } else {
          console.error("Error fetching project:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, [id]);
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/projects/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.status) {
        toast.success("Project deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          style: {
            backgroundColor: "#FF0000",
            color: "#fff",
            fontWeight: "bold",
          },
          icon: <FaTrash color="black" />,
        });

        navigate("/myprojects");
      } else {
        alert("Error deleting project: " + result.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setShowModal(false); // Modal bezárása törlés után
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-32">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
          <nav
            className="flex justify-start ml-5 bg-gray-900 text-white p-5"
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
                    {project ? project.name : "Loading..."}
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
                    Settings
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </nav>
        <div className="bg-gray-900 p-6 sm:p-4">
          <h1 className="text-2xl font-bold text-white mb-6">
            Project Settings
          </h1>

          <div className="flex flex-col lg:flex-row gap-6">
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="bg-gray-800 p-6 rounded-lg shadow-md w-full lg:w-1/2 "
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Project Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  className="mt-1 p-2 block w-full border text-white border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                >
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  id="description"
                  rows={4}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-white"
                >
                  Category
                </label>
                <input
                  {...register("category", { required: true })}
                  type="text"
                  id="category"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="member_number"
                  className="block text-sm font-medium text-white"
                >
                  Member Number
                </label>
                <input
                  {...register("member_number", { required: true })}
                  type="number"
                  id="member_number"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-white"
                >
                  Start Date
                </label>
                <input
                  {...register("start_date", { required: true })}
                  type="date"
                  id="start_date"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-white"
                >
                  End Date
                </label>
                <input
                  {...register("end_date", { required: true })}
                  type="date"
                  id="end_date"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1 text-gray-900 bg-green-500 border border-green-300 focus:outline-none hover:bg-green-500 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:text-black dark:border-green-500 dark:hover:bg-green-500 dark:hover:border-green-500 dark:focus:ring-green-500"
              >
                Save changes
              </button>
            </form>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-xl text-white mb-4">Notification Settings</h2>

              {/* Project Notifications */}
              <h3 className="text-lg text-gray-300 mb-2">
                Project Notifications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "projectUpdates",
                    label: "Receive updates about project changes",
                  },
                  {
                    id: "taskAssignments",
                    label: "Get notified about new task assignments",
                  },
                  {
                    id: "deadlineReminders",
                    label: "Reminders for upcoming deadlines",
                  },
                  {
                    id: "newFiles",
                    label: "Alert when new files are uploaded",
                  },
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-3">
                    <label className="relative inline-block h-6 w-10 cursor-pointer rounded-full bg-gray-300 transition has-[:checked]:bg-gray-900">
                      <input className="peer sr-only" type="checkbox" id={id} />
                      <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:start-6 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                    </label>
                    <label htmlFor={id} className="text-white">
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              {/* User Notifications */}
              <h3 className="text-lg text-gray-300 mt-6 mb-2">
                User Notifications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "newMembers",
                    label: "Notify me when new members join",
                  },
                  { id: "mentions", label: "Alert when someone mentions me" },
                  {
                    id: "directMessages",
                    label: "Receive notifications for direct messages",
                  },
                  {
                    id: "teamInvites",
                    label: "Be notified of team invitations",
                  },
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-3">
                    <label className="relative inline-block h-6 w-10 cursor-pointer rounded-full bg-gray-300 transition has-[:checked]:bg-gray-900">
                      <input className="peer sr-only" type="checkbox" id={id} />
                      <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:start-6 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                    </label>
                    <label htmlFor={id} className="text-white">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="flex items-center mt-5 text-gray-900 bg-green-500 border border-green-300 focus:outline-none hover:bg-green-500 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:text-black dark:border-green-500 dark:hover:bg-green-500 dark:hover:border-green-500 dark:focus:ring-green-500"
              >
                Save changes
              </button>
            </div>
          </div>
          <button
            className="bg-red-600 px-4 py-2 mt-10 text-white rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Delete Project
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
              <div className="group select-none w-[300px] flex flex-col p-5 relative items-center justify-center bg-gray-900 border border-gray-800 shadow-lg rounded-2xl">
                <div className="text-center p-3 flex-auto justify-center">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-500 fill-red-500 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <h2 className="text-xl font-bold py-4 text-gray-200">
                    Are you sure?
                  </h2>
                  <p className="font-bold text-sm text-gray-500 px-2">
                    Do you really want to continue? This process cannot be
                    undone.
                  </p>
                </div>
                <div className="p-2 mt-2 text-center space-x-2">
                  <button
                    className="bg-gray-500 px-5 py-2 text-sm text-white rounded-xl"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 px-5 py-2 text-sm text-white rounded-xl"
                    onClick={handleDelete}
                  >
                    Delete project
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
