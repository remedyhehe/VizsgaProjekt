import { CgBoard } from "react-icons/cg";
import { FaDotCircle, FaList, FaShare, FaSort } from "react-icons/fa";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoAddOutline, IoFilterSharp } from "react-icons/io5";
import Sidebar from "../Layouts/Sidebar";
import { DragEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiViewTimeline } from "react-icons/ci";
import { ITask, IColumn } from "../../utils/util";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  const [tasks, setTasks] = useState<{ [key: number]: ITask }>({
    1: { name: "Task 12", description: "Description for Task 1", column_id: 1 },
    2: { name: "Task 12", description: "Description for Task 2", column_id: 2 },
    3: { name: "Task 3", description: "Description for Task 3", column_id: 2 },
    4: { name: "Task 4", description: "Description for Task 4", column_id: 2 },
    5: { name: "Task 5", description: "Description for Task 5", column_id: 2 },
    6: { name: "Task 6", description: "Description for Task 6", column_id: 2 },
  });

  const [columns, setColumns] = useState<{
    [key: number]: IColumn & { taskIds: number[] };
  }>({
    1: {
      id: 1,
      name: "Column 1",
      project_id: 1,
      taskIds: [1],
    },
    2: {
      id: 2,
      name: "Column 2",
      project_id: 1,
      taskIds: [2, 3, 4, 5, 6],
    },
  });

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

  if (!project)
    return <h1 className="flex justify-center text-2xl p-5">Loading...</h1>;

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    taskId: number
  ) => {
    event.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, columnId: number) => {
    const taskId = parseInt(event.dataTransfer.getData("text/plain"), 10);

    const startColumn = Object.values(columns).find((column) =>
      column.taskIds.includes(taskId)
    );

    if (startColumn && startColumn.id !== columnId) {
      const newStartTaskIds = Array.from(startColumn.taskIds);
      newStartTaskIds.splice(newStartTaskIds.indexOf(taskId), 1);

      const newEndTaskIds = Array.from(columns[columnId].taskIds);
      newEndTaskIds.push(taskId);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [startColumn.id]: {
          ...startColumn,
          taskIds: newStartTaskIds,
        },
        [columnId]: {
          ...prevColumns[columnId],
          taskIds: newEndTaskIds,
        },
      }));

      setTasks((prevTasks) => ({
        ...prevTasks,
        [taskId]: {
          ...prevTasks[taskId],
          column_id: columnId,
        },
      }));
    }
  };

  return (
    <>
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto ml-32">
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {project.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-2xl font-bold text-white ml-10 pt-5 flex">
              {project.name}
            </h1>
            <div className="max-w-screen-xl flex flex-row items-center p-5 ml-5">
              <div className="w-full md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-md">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-5 gap-2 text-white rounded-sm md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                    >
                      <CgBoard />
                      Board
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-5 gap-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <CiViewTimeline /> Timeline
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-5 gap-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <FaList />
                      List
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-5 gap-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <FaTableCellsLarge />
                      Table
                    </a>
                  </li>
                </ul>
              </div>

              {/* Gombok jobb oldalra igazítása */}
              <div className="flex justify-end gap-5 w-full">
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <FaSort /> Sort
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <IoFilterSharp /> More Filters
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-200 dark:text-black dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <FaShare /> Share
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <IoAddOutline /> Add Task
                </button>
              </div>
            </div>
          </nav>

          {/* Card below navbar */}
          <div className="p-5 bg-gray-900 flex justify-start">
            <div className="taskview flex flex-col gap-4">
              {/* Oszlopok */}
              <ol className="taskcols p-3 mt-2 min-w-fit flex">
                {Object.values(columns).map((column) => (
                  <li
                    key={column.id}
                    className="taskcol bg-slate-800 p-2 rounded-lg shadow-sm mx-2 w-72 min-h-20 border border-slate-700"
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, column.id)}
                  >
                    <div className="columnheader flex justify-between p-2 pb-4">
                      <h2 className="text-font-semibold text-slate-100">
                        {column.name}
                      </h2>
                      <i className="fa-solid fa-ellipsis inline-block text-slate-500 cursor-pointer" />
                    </div>

                    {/* Feladatok az oszlopokban */}
                    <div className="task-list">
                      {column.taskIds.map((taskId) => (
                        <div
                          key={taskId}
                          className="taskbox bg-slate-700 shadow-md my-2 p-3 rounded cursor-pointer border border-slate-600"
                          draggable
                          onDragStart={(event) =>
                            handleDragStart(event, taskId)
                          }
                        >
                          <div className="flex justify-between flex-row">
                            <p className="flex text-lg font-medium text-slate-100">
                              {tasks[taskId].name}
                            </p>
                            <i className="flex fa-solid fa-ellipsis inline-block text-slate-500 cursor-pointer" />
                          </div>

                          <p className="text-slate-400 text-sm">
                            {tasks[taskId].description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
