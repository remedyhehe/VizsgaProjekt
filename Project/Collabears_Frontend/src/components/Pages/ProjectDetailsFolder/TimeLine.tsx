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
  // Csak azok a feladatok, amelyeknek van határideje
  const tasksWithDueDates = tasks.filter((task) => task.due_date);

  // Feladatok csoportosítása dátum szerint
  const groupedTasks = tasksWithDueDates.reduce(
    (acc: Record<string, ITask[]>, task) => {
      const date = task.due_date as string;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {}
  );

  // A dátumok rendezése
  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="p-5 bg-gray-900 text-white flex justify-center min-h-screen">
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Task Timeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDates.map((date) => (
            <div key={date} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {new Date(date).toLocaleDateString("hu-HU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="space-y-2">
                {groupedTasks[date].map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-700 p-3 rounded-md shadow-sm"
                  >
                    <h4 className="text-md font-medium">{task.name}</h4>
                    <p className="text-sm text-gray-400">
                      Határidő: {task.due_date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {sortedDates.length === 0 && (
            <p className="text-center text-gray-400">
              Nincs határidővel rendelkező feladat.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
