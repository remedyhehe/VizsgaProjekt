import {
  FaPlus,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUserAstronaut,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { DragEvent, useState, useEffect } from "react";
import { RxActivityLog } from "react-icons/rx";
import { ITask, IColumn } from "../../../utils/util";
import { useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import { GrTextAlignFull } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { MdDateRange, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

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
  const [editingColumnId, setEditingColumnId] = useState<number | null>(null);
  const [editingColumnName, setEditingColumnName] = useState("");
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

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

  const handleDrop = async (
    event: DragEvent<HTMLLIElement>,
    newColumnId: number
  ) => {
    event.preventDefault();

    const taskId = parseInt(event.dataTransfer.getData("text/plain"), 10);
    const startColumn = Object.values(columns).find((column) =>
      column.taskIds.includes(taskId)
    );

    if (startColumn && startColumn.id !== newColumnId) {
      // Frissítsd a kliensoldali állapotot
      const newStartTaskIds = startColumn.taskIds.filter((id) => id !== taskId);
      const newEndTaskIds = [...columns[newColumnId].taskIds, taskId];

      setColumns((prev) => ({
        ...prev,
        [startColumn.id]: {
          ...startColumn,
          taskIds: newStartTaskIds,
          number_of_tasks: newStartTaskIds.length, // Oszlop frissítése
        },
        [newColumnId]: {
          ...prev[newColumnId],
          taskIds: newEndTaskIds,
          number_of_tasks: newEndTaskIds.length, // Oszlop frissítése
        },
      }));

      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], column_id: newColumnId },
      }));

      // Frissítsd az adatbázist
      try {
        const response = await fetch(
          `http://localhost:8000/api/tasks/${taskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ column_id: newColumnId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task column");
        }

        // Ha szükséges, lekérheted az oszlopokat újra az adatbázisból
      } catch (error) {
        console.error("Error updating task column:", error);
        toast.error("Error moving task. Please try again.");
      }
    }
  };
  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setUnreadNotifications((prev) => prev + 1);
  };
  const toggleNotificationPanel = () => {
    setShowNotificationPanel(!showNotificationPanel);
    if (!showNotificationPanel) {
      setUnreadNotifications(0);
      // Reset unread count when panel is opened
    }
  };

  useEffect(() => {
    // Trigger deadline-related notifications
    const interval = setInterval(() => {
      const today = new Date();
      Object.values(tasks).forEach((task) => {
        if (task.due_date) {
          const dueDate = new Date(task.due_date);
          const daysLeft = Math.ceil(
            (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
          );
          if (daysLeft >= 0 && daysLeft <= 2) {
            const message = `Task "${task.name}" is due in ${daysLeft} day(s)!`;
            if (!notifications.includes(message)) {
              addNotification(message);
            }
          }
        }
      });
    }, 2000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks, notifications]);

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
    toast.success("Column deleted successfully!", {
      className: "bg-red-500 text-white px-4 py-2 rounded shadow-lg",
    });
    setConfirmDeleteColumnId(null); // Close the confirmation modal
  };

  const confirmAddTask = async () => {
    if (!newTaskData.name.trim() || newTaskData.columnId === null) {
      toast.error("Task name and column are required!");
      return;
    }

    const newTask = {
      name: newTaskData.name,
      column_id: newTaskData.columnId,
      project_id: projectId,
      description: description,
      due_date: editingTask?.due_date || null,
    };

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add task");
      }

      const data = await response.json();

      // Frissítsd a tasks és columns state-et
      setTasks((prev) => ({
        ...prev,
        [data.task.id]: data.task, // Biztosítsuk, hogy az új task felkerül az állapotba
      }));

      setColumns((prev) => ({
        ...prev,
        [newTaskData.columnId!]: {
          ...prev[newTaskData.columnId!],
          taskIds: [...prev[newTaskData.columnId!].taskIds, data.task.id],
        },
      }));

      setNewTaskData({ columnId: null, name: "" });
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Error adding task: " + errorMessage);
    }
  };

  const handleCloseModal = () => {
    setConfirmDeleteColumnId(null);
  };
  const saveColumnName = async (columnId: number) => {
    if (!editingColumnName.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/columns/${columnId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: editingColumnName }),
        }
      );

      if (!response.ok) {
        throw new Error("Hiba történt a mentés során.");
      }

      // Frissítjük a columns state-et
      setColumns((prev) => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          name: editingColumnName,
        },
      }));

      setEditingColumnId(null);
      setEditingColumnName("");
    } catch (error) {
      console.error("Hiba a mentés során:", error);
      alert("Nem sikerült menteni az oszlop nevét.");
    }
  };
  const handleSaveTask = async () => {
    if (!editingTask) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/tasks/${editingTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingTask.name,
            description: description, // Leírás hozzáadása
            due_date: editingTask.due_date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save task.");
      }

      setTasks((prev) => ({
        ...prev,
        [editingTask.id]: {
          ...editingTask,
          description, // Frissítsük a leírást a state-ben
        },
      }));
      setShowTaskModal(null);
      setEditingTask(null);
      toast.success("Task saved successfully!");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }

      setTasks((prev) => {
        const updatedTasks = { ...prev };
        delete updatedTasks[taskId]; // Remove the task from the tasks state
        return updatedTasks;
      });

      setColumns((prev) => {
        const updatedColumns = { ...prev };
        // Find the column that contains the taskId and remove it from taskIds
        for (const columnId in updatedColumns) {
          const column = updatedColumns[columnId];
          if (column.taskIds.includes(taskId)) {
            updatedColumns[columnId] = {
              ...column,
              taskIds: column.taskIds.filter((id) => id !== taskId),
            };
            break;
          }
        }
        return updatedColumns;
      });

      setShowTaskModal(null);

      // Show a red toast notification
      toast.success("Task deleted successfully!", {
        className: "bg-red-500 text-white px-4 py-2 rounded shadow-lg",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };
  const toggleTaskStatus = async (taskId: number) => {
    const currentStatus = tasks[taskId]?.status || "Nincs kész"; // Use the current status directly

    const newStatus = currentStatus === "Kész" ? "Nincs kész" : "Kész"; // Toggle status

    try {
      const response = await fetch(
        `http://localhost:8000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }), // Send the new status name
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await response.json();

      // Update tasks state
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], status: newStatus }, // Update the status as a string
      }));

      toast.success("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status. Please try again.");
    }
  };
  const calculateDaysLeft = (dueDate: string | null) => {
    if (!dueDate) return null;

    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft;
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
        <ol className="taskcols p-3 mt-2 min-w-fit max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          {Object.values(columns).map((column) => (
            <li
              key={column.id}
              className="taskcol bg-slate-800 p-2 rounded-lg shadow-sm mx-2 w-72 min-h-20 border border-slate-700 relative"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, column.id)}
            >
              <div className="columnheader flex justify-between items-center p-2 pb-4">
                {editingColumnId === column.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editingColumnName}
                      onChange={(e) => setEditingColumnName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveColumnName(column.id);
                        }
                      }}
                      onBlur={() => {
                        saveColumnName(column.id);
                        setEditingColumnId(null);
                      }}
                      autoFocus
                      className="bg-slate-700 text-white rounded px-2 py-1"
                    />
                  </div>
                ) : (
                  <h2
                    className="text-lg font-semibold text-slate-100 cursor-pointer"
                    onClick={() => {
                      setEditingColumnId(column.id);
                      setEditingColumnName(column.name);
                    }}
                    title="Kattints a szerkesztéshez"
                  >
                    {column.name}
                  </h2>
                )}

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
                {column.taskIds
                  .filter((taskId) => tasks[taskId]) // Only include tasks that exist
                  .map((taskId) => (
                    <div
                      key={taskId}
                      className="taskbox"
                      draggable
                      onDragStart={(event) => handleDragStart(event, taskId)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={tasks[taskId]?.status === "Kész"}
                            onChange={() => toggleTaskStatus(taskId)}
                            className="checkbox mr-3 appearance-none w-4 h-4 rounded-full border-2 border-gray-300 checked:bg-green-500 checked:border-green-500"
                          />

                          <p
                            className={`text-md font-medium ${
                              tasks[taskId]?.status === "Kész"
                                ? " text-green-500"
                                : "text-slate-100"
                            }`}
                          >
                            {tasks[taskId]?.name}
                          </p>
                        </div>
                        <div className="task-actions">
                          <button
                            onClick={() => {
                              setShowTaskModal(taskId);
                              setEditingTask(tasks[taskId]);
                            }}
                            className="text-slate-300 hover:text-white"
                          >
                            <FaEdit />
                          </button>
                        </div>
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
      <div
        className={`fixed bottom-0 right-5 bg-gray-800 text-white rounded-t-xl shadow-lg w-80 ${
          showNotificationPanel ? "h-64" : "h-12"
        } overflow-hidden transition-all duration-300`}
      >
        <div
          className="bg-gray-700 p-3 cursor-pointer flex justify-between items-center"
          onClick={() => setShowNotificationPanel(!showNotificationPanel)}
        >
          <div className="flex items-center gap-2">
            <span>Notifications</span>
            {unreadNotifications > 0 && !showNotificationPanel && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </div>
          <span className="text-orange-500">
            {showNotificationPanel ? <FaChevronDown /> : <FaChevronUp />}
          </span>
        </div>
        {showNotificationPanel && (
          <div className="p-3 space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="bg-gray-600 px-3 py-2 rounded text-sm shadow-sm"
                >
                  {notification}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No notifications</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showTaskModal !== null && editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto text-white relative">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => setShowTaskModal(null)}
            >
              <FaTimes size={20} />
            </button>
            <h1 className="text-2xl font-bold mb-4">Manage task</h1>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Task Name:</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={editingTask.name}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, name: e.target.value })
                }
              />
            </div>
            <div className="mt-5">
              <h2 className="flex items-center text-md font-semibold mb-2 gap-2">
                <RxActivityLog />
                Status
              </h2>
              <p className="text-neutral-400 text-md">
                {editingTask?.status || "Nincs státusz"}
              </p>
            </div>
            <div className="mt-5">
              <h2 className="flex items-center text-md font-semibold mb-2 gap-2">
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
                      onClick={() => setIsEditingDescription(false)}
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
                <h2 className="flex items-center text-md font-semibold mb-2 gap-2">
                  <FaUserAstronaut />
                  Assigned user
                </h2>
                <p className="text-neutral-400 text-sm">
                  {tasks[showTaskModal].assigned_user || "No user assigned"}
                </p>
              </div>
              <div className="mt-5">
                <h2 className="flex items-center text-md font-semibold mb-2 gap-2">
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 text-white">
                    <IoSend />
                  </button>
                </div>
                <div className="mt-5">
                  <h2 className="flex items-center text-md font-semibold mb-2 gap-2">
                    <MdDateRange />
                    Due Date
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    {tasks[showTaskModal]?.due_date || "No due date set"}
                  </p>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-gray-800 text-white mt-2"
                    value={editingTask.due_date || ""}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        due_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <button
                    onClick={handleSaveTask}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDeleteTask(editingTask.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    <MdDelete />
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
                  className="mb-2 md:mb-0 bg-gray-700 text-slate-200 px-5 py-2 text-sm shadow-sm font-medium tracking-wider  rounded-xl"
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
