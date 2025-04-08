import {
  FaPlus,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUserAstronaut,
} from "react-icons/fa";
import { DragEvent, useState, useEffect } from "react";
import { RxActivityLog } from "react-icons/rx";
import { ITask, IColumn } from "../../../utils/util";
import { useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import { GrTextAlignFull } from "react-icons/gr";
import { IoSend } from "react-icons/io5";

const Tasks = () => {
  const { id: projectIdParam } = useParams();
  const projectId = parseInt(projectIdParam || "0", 10);
  const [tasks, setTasks] = useState<{ [key: number]: ITask }>({});
  const [columns, setColumns] = useState<{
    [key: number]: IColumn & { taskIds: number[] };
  }>({});
  const [nextColumnId, setNextColumnId] = useState(1);
  const [nextTaskId, setNextTaskId] = useState(1);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(
    "Részletesebb leírás hozzáadása..."
  );

  const [newColumnName, setNewColumnName] = useState("");
  const [showNewColumnInput, setShowNewColumnInput] = useState(false);
  const [newTaskData, setNewTaskData] = useState<{
    columnId: number | null;
    name: string;
  }>({ columnId: null, name: "" });
  const [showTaskModal, setShowTaskModal] = useState<null | number>(null);
  const [showColumnDeleteId, setShowColumnDeleteId] = useState<number | null>(
    null
  );
  // Add state to manage the confirmation modal visibility and the column to be deleted
  const [confirmDeleteColumnId, setConfirmDeleteColumnId] = useState<
    number | null
  >(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/columns?project_id=${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        const columnsData = data;
        setColumns(() => {
          const newColumns: typeof columns = {};
          for (const column of columnsData) {
            newColumns[column.id] = { ...column, taskIds: [] };
          }
          return newColumns;
        });
        setNextColumnId(columnsData.length + 1);
      })
      .catch((error) => console.error("Error fetching columns:", error));

    fetch(`http://localhost:8000/api/tasks?project_id=${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        const tasksData = data.reduce((acc: any, task: ITask) => {
          acc[task.id] = task;
          return acc;
        }, {});
        setTasks(tasksData);
        setNextTaskId(Object.keys(tasksData).length + 1);

        setColumns((prev) => {
          const newColumns = { ...prev };
          Object.values(newColumns).forEach((col) => (col.taskIds = []));
          data.forEach((task: ITask) => {
            if (newColumns[task.column_id]) {
              newColumns[task.column_id].taskIds.push(task.id);
            }
          });
          return newColumns;
        });
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [projectId]);

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    taskId: number
  ) => {
    event.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLLIElement>, columnId: number) => {
    const taskId = parseInt(event.dataTransfer.getData("text/plain"), 10);
    const startColumn = Object.values(columns).find((column) =>
      column.taskIds.includes(taskId)
    );

    if (startColumn && startColumn.id !== columnId) {
      const newStartTaskIds = [...startColumn.taskIds].filter(
        (id) => id !== taskId
      );
      const newEndTaskIds = [...columns[columnId].taskIds, taskId];

      setColumns((prev) => ({
        ...prev,
        [startColumn.id]: { ...startColumn, taskIds: newStartTaskIds },
        [columnId]: { ...prev[columnId], taskIds: newEndTaskIds },
      }));

      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], column_id: columnId },
      }));

      fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ column_id: columnId }),
      });
    }
  };

  const confirmAddColumn = async () => {
    if (!newColumnName.trim()) return;
    const newId = nextColumnId;
    const res = await fetch("http://localhost:8000/api/columns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newColumnName,
        project_id: projectId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setColumns((prev) => ({
          ...prev,
          [data.id]: {
            ...data,
            taskIds: [],
          },
        }));
        setNextColumnId(newId + 1);
        setNewColumnName("");
        setShowNewColumnInput(false);
      })
      .catch((error) => {
        console.error("Error adding column:", error);
        alert(`Error adding column: ${error.message}`);
      });
  };

  const deleteColumn = (columnId: number) => {
    const taskIdsToRemove = columns[columnId].taskIds;
    const updatedTasks = { ...tasks };
    taskIdsToRemove.forEach((id) => delete updatedTasks[id]);

    const updatedColumns = { ...columns };
    delete updatedColumns[columnId];

    setTasks(updatedTasks);
    setColumns(updatedColumns);
    setShowColumnDeleteId(null);

    fetch(`http://localhost:8000/api/columns/${columnId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskIds: taskIdsToRemove }),
    }).catch((error) => console.error("Error deleting column:", error));
  };

  const confirmAddTask = async () => {
    if (!newTaskData.name.trim() || newTaskData.columnId === null) return;

    const newTask = {
      name: newTaskData.name,
      column_id: newTaskData.columnId,
      project_id: projectId,
    };

    const res = await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prev) => ({
          ...prev,
          [data.id]: data,
        }));
        setColumns((prev) => ({
          ...prev,
          [newTaskData.columnId!]: {
            ...prev[newTaskData.columnId!],
            taskIds: [...prev[newTaskData.columnId!].taskIds, data.id],
          },
        }));

        setNewTaskData({ columnId: null, name: "" });
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleCloseModal = () => {
    setConfirmDeleteColumnId(null);
  };

  return (
    <div className="p-5 bg-gray-900 flex justify-start min-h-screen relative">
      {/* Blur background if modal is open */}
      <div
        className={`taskview flex flex-col gap-4 transition-all duration-300 ${`${
          showTaskModal !== null || confirmDeleteColumnId !== null
            ? "blur-xs"
            : ""
        }`}`}
      >
        <ol className="taskcols p-3 mt-2 min-w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(columns).map((column) => (
            <li
              key={column.id}
              className="taskcol bg-slate-800 p-2 rounded-lg shadow-sm mx-2 w-72 min-h-20 border border-slate-700 relative"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, column.id)}
            >
              <div className="columnheader flex justify-between items-center p-2 pb-4">
                <h2 className="text-lg font-semibold text-slate-100">
                  {column.name}
                </h2>
                <div className="relative">
                  <button
                    className="text-slate-400 hover:text-white"
                    onClick={() =>
                      setShowColumnDeleteId((prev) =>
                        prev === column.id ? null : column.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>
                  {showColumnDeleteId === column.id && (
                    <div className="absolute right-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-md z-10 p-2">
                      <button
                        onClick={() => setConfirmDeleteColumnId(column.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash /> <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="task-list">
                {column.taskIds.map((taskId) => (
                  <div
                    key={taskId}
                    className="taskbox bg-slate-700 shadow-md my-2 p-3 rounded cursor-pointer border border-slate-600"
                    draggable
                    onDragStart={(event) => handleDragStart(event, taskId)}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-md font-medium text-slate-100">
                        {tasks[taskId].name}
                      </p>
                      <button
                        className="text-slate-300 hover:text-white"
                        onClick={() => setShowTaskModal(taskId)}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}

                {newTaskData.columnId === column.id && (
                  <div className="mt-3">
                    <input
                      className="w-full p-3 text-md rounded bg-gray-700 text-white mb-1"
                      placeholder="Task name"
                      value={newTaskData.name}
                      onChange={(e) =>
                        setNewTaskData({ ...newTaskData, name: e.target.value })
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={confirmAddTask}
                        className="text-md text-white bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded"
                      >
                        Add task
                      </button>
                      <button
                        onClick={() =>
                          setNewTaskData({ columnId: null, name: "" })
                        }
                        className="text-md text-white hover:bg-gray-600 px-3 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {newTaskData.columnId !== column.id && (
                <button
                  onClick={() =>
                    setNewTaskData({
                      columnId: column.id,
                      name: "",
                    })
                  }
                  className="mt-3 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
                >
                  <FaPlus className="text-xs" /> Add task
                </button>
              )}
            </li>
          ))}

          <li className="mx-1 mt-1 bg-slate-800 h-fit p-2 rounded border border-slate-700 flex flex-col items-start">
            {showNewColumnInput ? (
              <div className="flex flex-col gap-1 w-full">
                <input
                  className="p-3 text-md rounded bg-gray-700 text-white"
                  placeholder="Column name"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                />
                <button
                  onClick={confirmAddColumn}
                  className="text-md text-white bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded"
                >
                  Add column
                </button>
                <button
                  onClick={() => {
                    setNewColumnName("");
                    setShowNewColumnInput(false);
                  }}
                  className="text-md text-white hover:bg-gray-600 px-3 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
                onClick={() => setShowNewColumnInput(true)}
              >
                <FaPlus className="text-xs" />
                Add column
              </button>
            )}
          </li>
        </ol>
      </div>

      {/* Modal */}
      {showTaskModal !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-40">
          <div className="bg-gray-700 rounded-lg p-6 w-1/2 h-screen text-white relative">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => setShowTaskModal(null)}
            >
              <FaTimes size={20} />
            </button>
            <h1 className="text-2xl font-bold mb-4">
              {tasks[showTaskModal].name}
            </h1>
            <h2>Column name: {columns[tasks[showTaskModal].column_id].name}</h2>
            <div className="mt-10">
              <h2 className="flex items-center text-lg font-semibold mb-2 gap-2">
                <GrTextAlignFull />
                Description
              </h2>
              {isEditingDescription ? (
                <>
                  <Editor
                    value={description}
                    onTextChange={(e) => setDescription(e.htmlValue || "")}
                    className="text-white bg-gray-800 p-editor-custom rounded"
                    style={{ height: "200px" }}
                  />
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => {
                        // Itt történhetne egy mentés API hívás is, ha szükséges
                        setIsEditingDescription(false);
                      }}
                      className="px-6 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingDescription(false)}
                      className="px-4 py-2 hover:bg-gray-600 rounded text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="bg-gray-800 text-white p-4 rounded cursor-pointer"
                  onClick={() => setIsEditingDescription(true)}
                >
                  <p
                    className="text-neutral-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></p>
                </div>
              )}
              <div className="mt-5">
                <h2 className="flex items-center text-lg font-semibold mb-2 gap-2">
                  <FaUserAstronaut />
                  Assigned user
                </h2>
                <p className="text-neutral-400 text-sm">
                  {tasks[showTaskModal].assigned_user || "No user assigned"}
                </p>
              </div>
              <div className="mt-10">
                <h2 className="flex items-center text-lg font-semibold mb-2 gap-2">
                  <RxActivityLog />
                  Activity
                </h2>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    src="../images/avatar.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />

                  <input
                    type="text"
                    id="default-input"
                    placeholder="Add a comment..."
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 text-white">
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteColumnId !== null && (
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
                  Do you really want to continue? This process cannot be undone.
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
                  onClick={() => {
                    deleteColumn(confirmDeleteColumnId!);
                    setConfirmDeleteColumnId(null); // bezárja a modalt vizuálisan is
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
