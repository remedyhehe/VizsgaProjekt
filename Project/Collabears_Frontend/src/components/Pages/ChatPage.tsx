import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { MdEdit, MdOutlineGifBox } from "react-icons/md";
import { IoArrowUndoOutline, IoArrowUndoSharp, IoSend } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaFaceSmile, FaGift, FaTrash } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

const ChatPage = () => {
  interface Project {
    name: string;
  }
  interface Message {
    user: string;
    text: string;
    timestamp: string;
  }

  const [project, setProject] = useState<Project | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMessage] = useState("");
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [id]);

  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    setUserName(storedName);
  }, []);

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
    if (newMsg.trim() === "") return;
    const timestamp = new Date().toLocaleTimeString();
    const newMessageData = { user: userName || "You", text: newMsg, timestamp };

    const updatedMessages = [...messages, newMessageData];
    setMessages(updatedMessages); // Állapot frissítése
    localStorage.setItem(`messages_${id}`, JSON.stringify(updatedMessages)); // LocalStorage frissítése

    setNewMessage(""); // Üzenet mező törlése
  };
  const deleteMessage = (index: number) => {
    const confirmDelete = window.confirm(
      "Biztosan törölni szeretnéd ezt az üzenetet?"
    );
    if (confirmDelete) {
      const updatedMessages = messages.filter((_, i) => i !== index);
      setMessages(updatedMessages); // Állapot frissítése
      localStorage.setItem(`messages_${id}`, JSON.stringify(updatedMessages)); // LocalStorage frissítése
    }
  };
  useEffect(() => {
    const chatContainer = document.querySelector(".overflow-y-auto");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]); // Minden üzenet frissítéskor újragörgeti

  if (!project)
    return <h1 className="flex justify-center text-2xl p-5">Loading...</h1>;

  return (
    <div className="flex h-screen ml-32">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-900 text-white">
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
        <div className="flex-1 flex flex-col justify-between p-5">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <div className="flex-1 overflow-y-auto bg-gray-800 p-2 pr-8 pt-5 rounded-lg mt-4 max-h-[calc(100vh-200px)]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="relative flex items-start gap-3 mb-2 p-2 rounded-lg hover:bg-gray-700 text-gray-200"
                onMouseEnter={() => setHoveredMessage(index)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <img
                  src="../images/avatar.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <strong>{userName}</strong>
                  <span className="text-sm text-gray-400 ml-2">
                    {msg.timestamp}
                  </span>
                  <p>{msg.text}</p>
                </div>
                {hoveredMessage === index && (
                  <div className="absolute right-2 top-4 flex space-x-4 bg-gray-700 p-1 rounded-lg">
                    <div className="relative group">
                      <a href="#" className="text-xl">
                        <IoArrowUndoSharp className="duration-200 ease-in-out transform hover:scale-120" />
                      </a>
                      <span className="absolute bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white py-1 px-2 rounded">
                        Response
                      </span>
                    </div>

                    <div className="relative group">
                      <a href="#" className="text-xl ">
                        <FaFaceSmile className="duration-200 ease-in-out transform hover:scale-120" />
                      </a>
                      <span className="absolute bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white py-1 px-2 rounded">
                        Emoji
                      </span>
                    </div>

                    <div className="relative group">
                      <a href="#" className="text-xl">
                        <MdEdit className="duration-200 ease-in-out transform hover:scale-120" />
                      </a>
                      <span className="absolute bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white py-1 px-2 rounded">
                        Edit
                      </span>
                    </div>

                    <div className="relative group">
                      <a
                        href="#"
                        className="text-xl text-red-500"
                        onClick={() => deleteMessage(index)}
                      >
                        <FaTrash className="duration-200 ease-in-out transform hover:scale-120" />
                      </a>
                      <span className="absolute bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white py-1 px-2 rounded">
                        Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mt-4 flex items-center gap-5">
            <IoIosAddCircle className="text-2xl" />
            <input
              type="text"
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a message..."
              value={newMsg}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <div className="relative">
              {/* FaFaceSmile ikon */}
              <FaFaceSmile
                className="hover:text-amber-300 text-2xl cursor-pointer"
                onClick={() => setShowEmojiPicker((prev) => !prev)} // Kattintás esemény: emoji picker megjelenítése/eltüntetése
              />

              {/* EmojiPicker megjelenítése */}
              {showEmojiPicker && (
                <div
                  className="fixed bottom-25 right-6"
                  style={{ display: showEmojiPicker ? "block" : "none" }}
                >
                  <EmojiPicker />
                </div>
              )}
            </div>

            <MdOutlineGifBox className="hover:text-blue-300 text-3xl" />
            <FaGift className="hover:text-purple-300 text-2xl" />
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
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
