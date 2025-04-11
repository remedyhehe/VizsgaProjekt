/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { MdEdit, MdOutlineGifBox } from "react-icons/md";
import { IoArrowUndoOutline, IoArrowUndoSharp, IoSend } from "react-icons/io5";
import { FaFaceSmile, FaGift, FaTrash } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import GifPicker from "gif-picker-react";
import { EmojiClickData } from "emoji-picker-react";

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
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal állapot
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

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

  const sendMessage = (content: string) => {
    if (content.trim() === "") return;
    const timestamp = new Date().toLocaleTimeString();
    const newMessageData = {
      user: userName || "You",
      text: content,
      timestamp,
    };

    const updatedMessages = [...messages, newMessageData];
    setMessages(updatedMessages); // Update state
    localStorage.setItem(`messages_${id}`, JSON.stringify(updatedMessages)); // Update localStorage

    setNewMessage(""); // Clear the input field
  };
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    setNewMessage((prev) => prev + emoji); // Append the selected emoji to the input field
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".overflow-y-auto");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  const handleDeleteMessage = () => {
    if (messageToDelete !== null) {
      const updatedMessages = messages.filter(
        (_, index) => index !== messageToDelete
      );
      setMessages(updatedMessages);
      localStorage.setItem(`messages_${id}`, JSON.stringify(updatedMessages));
      setShowModal(false); // Modal bezárása a törlés után
    }
  };

  const handleOpenModal = (index: number) => {
    setMessageToDelete(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessageToDelete(null);
  };

  // Minden üzenet frissítéskor újragörgeti

  if (!project)
    return (
      <div className="bg-gray-900 h-screen">
        <div className="flex gap-3 flex-wrap justify-center p-4 md:p-12 ">
          <button
            disabled={true}
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 text-center inline-flex items-center animate-pulse dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-5 h-5 mr-2 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              ></path>
            </svg>
            Please wait..
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen ">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-900 text-white">
        {/* Modal */}
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
                    Chat
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </nav>
        <div className="flex-1 flex flex-col justify-between p-5 h-screen">
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
                        onClick={() => handleOpenModal(index)}
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

          <div className="bg-gray-800 p-4 rounded-lg mt-4 flex items-center gap-5 flex-wrap">
            <button
              title="Add New"
              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="30px"
                viewBox="0 0 24 24"
                className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke-width="1.5"
                ></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
            <input
              type="text"
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a message..."
              value={newMsg}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(newMsg)}
            />
            {showModal && (
              <div className="fixed inset-0 bg-transparent  flex items-center justify-center">
                <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-700 border border-gray-800 shadow-lg rounded-2xl">
                  <div className="">
                    <div className="text-center p-3 flex-auto justify-center">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-500 fill-red-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          fill-rule="evenodd"
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
                    <div className="p-2 mt-2 text-center space-x-1 md:block">
                      <button
                        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider  rounded-xl"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-red-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-xl"
                        onClick={handleDeleteMessage}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="relative">
              {/* FaFaceSmile ikon */}
              <FaFaceSmile
                className="hover:text-amber-300 text-2xl "
                onClick={() => setShowEmojiPicker((prev) => !prev)} // Kattintás esemény: emoji picker megjelenítése/eltüntetése
              />

              {/* EmojiPicker megjelenítése */}
              {showEmojiPicker && (
                <div
                  className="fixed bottom-25 right-6"
                  style={{ display: showEmojiPicker ? "block" : "none" }}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <MdOutlineGifBox
              onClick={() => setShowGifPicker((prev) => !prev)}
              className="hover:text-blue-300 text-3xl"
            />
            {showGifPicker && (
              <div
                className="fixed bottom-25 right-6"
                style={{ display: showGifPicker ? "block" : "none" }}
              >
                <GifPicker tenorApiKey="AIzaSyBqQJobmLXxQJfbHmLfsWJzpqPZ4Ia86CI" />
              </div>
            )}
            <FaGift className="hover:text-purple-300 text-2xl" />
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              onClick={() => sendMessage(newMsg)}
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
