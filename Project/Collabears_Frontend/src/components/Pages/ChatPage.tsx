import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { FcAddImage } from "react-icons/fc";
import { MdAttachFile, MdOutlineEmojiEmotions } from "react-icons/md";
import { BsFillEmojiSmileFill } from "react-icons/bs";

import { IoSend } from "react-icons/io5";

const ChatPage = () => {
  interface Project {
    name: string;
  }

  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/projects/${id}`);
        const result = await res.json();
        if (result.status) {
          setProject(result.data);
        } else {
          console.error("Error fetching project:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, [id]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { user: "You", text: newMessage }]);
    setNewMessage("");
  };

  if (!project)
    return <h1 className="flex justify-center text-2xl p-5">Loading...</h1>;

  return (
    <div className="flex h-screen ml-32">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-900 text-white">
        {/* Navbar */}
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
                    Chat
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </nav>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col justify-between p-5">
          <h1 className="text-2xl font-bold">{project.name}</h1>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg mt-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.user === "You"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input (Always Visible at Bottom) */}
          <div className="bg-gray-800 p-4 rounded-lg mt-4 flex items-center gap-5">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <a href="#" className="text-2xl text-yellow-400">
              <BsFillEmojiSmileFill />
            </a>
            <a href="#" className="text-2xl">
              <MdAttachFile />
            </a>
            <a href="#" className="text-2xl">
              <FcAddImage />
            </a>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={sendMessage}
            >
              <IoSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
