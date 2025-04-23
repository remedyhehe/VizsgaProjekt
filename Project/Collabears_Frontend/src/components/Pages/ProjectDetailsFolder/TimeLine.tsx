import React from "react";

interface ITask {
  id: number;
  name: string;
  due_date: string | null; // Formátum: "YYYY-MM-DD"
}

interface TimeLineProps {
  tasks: ITask[];
}

const TimeLine: React.FC<TimeLineProps> = ({ tasks }) => {
  // Rendezés határidő szerint
  const sortedTasks = tasks
    .filter((task) => task.due_date) // Csak azok a feladatok, amelyeknek van határideje
    .sort((a, b) => {
      const dateA = new Date(a.due_date as string);
      const dateB = new Date(b.due_date as string);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="p-5 bg-gray-900 text-white flex justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Task Timeline</h2>
        <div className="relative border-l border-gray-700">
          {sortedTasks.map((task, index) => (
            <div key={task.id} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full -left-4 ring-8 ring-gray-900">
                {index + 1}
              </span>
              <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <time className="block mb-2 text-sm text-gray-400">
                  Due: {task.due_date}
                </time>
                <p className="text-sm text-gray-300">
                  This task is scheduled to be completed by the due date.
                </p>
              </div>
            </div>
          ))}
          {sortedTasks.length === 0 && (
            <p className="text-center text-gray-400">
              No tasks with due dates available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
