import { CgBoard } from "react-icons/cg";
import { FaCalendar, FaList, FaMinus, FaPlus, FaShare, FaSort } from "react-icons/fa";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoAddOutline, IoFilterSharp } from "react-icons/io5";
import { DragEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CiViewTimeline } from "react-icons/ci";
import { ITask, IColumn } from "../../../utils/util";
import Sidebar from "../../Layouts/Sidebar";

const Tasks = () => {

    const [tasks, setTasks] = useState<{ [key: number]: ITask }>({
        1: { name: "Task 12", description: "Description for Task 1", column_id: 1 },
        2: { name: "Task 12", description: "Description for Task 2", column_id: 2 },
        3: { name: "Task 3", description: "Description for Task 3", column_id: 2 },
        4: { name: "Task 4", description: "Description for Task 4", column_id: 2 },
        5: { name: "Task 5", description: "Description for Task 5", column_id: 2 },
        6: {
          name: "Task 6",
          description:
            "Description for Task 6 Lorem Ipsum Szöveg még sssssssssssssssss asdssssssssd asd as asdasdasdasdad asdasd asd asd asd asd ad asd a",
          column_id: 2,
        },
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

    return(


        <div className="p-5 bg-gray-900 flex justify-start">
        <div className="taskview flex flex-col gap-4">

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

                    <div className="flex justify-start gap-2 pt-2">
                        <div className="bg-amber-600 h-2.5 w-12 rounded-full" />
                        <div className="bg-emerald-600 h-2.5 w-12 rounded-full" />
                    </div>
                    </div>
                ))}
                </div>
            </li>
            ))}
            <div className="mx-1 mt-1 bg-slate-800 h-fit p-1 rounded border border-slate-700">

                <FaPlus className="text-3xl text-slate-600 cursor-pointer" />
            </div>
        </ol>
        </div>
        </div>

    )
}
export default Tasks;

