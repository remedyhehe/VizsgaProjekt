import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Diagram = () => {
  const taskData = {
    todo: 12,
    inProgress: 23,
    done: 64,
  };

  const totalTasks = taskData.todo + taskData.inProgress + taskData.done;

  const chartData = {
    labels: ["To do", "In progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [taskData.todo, taskData.inProgress, taskData.done],
        backgroundColor: ["#FF7F50", "#20B2AA", "#4682B4"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Fontos a méretezéshez
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <>
      <div className="p-10 bg-gray-900 flex justify-center min-h-screen relative">
        <div className="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
          <div className="flex justify-between mb-3">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Your team's progress
            </h5>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="grid grid-cols-3 gap-3 mb-2">
              <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">
                  {taskData.todo}
                </dt>
                <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium">
                  To do
                </dd>
              </dl>
              <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">
                  {taskData.inProgress}
                </dt>
                <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium">
                  In progress
                </dd>
              </dl>
              <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">
                  {taskData.done}
                </dt>
                <dd className="text-blue-600 dark:text-blue-300 text-sm font-medium">
                  Done
                </dd>
              </dl>
            </div>
          </div>

          <div
            className="py-6"
            id="radial-chart"
            style={{
              position: "relative",
              height: "600px", // Állítsd be a magasságot
              width: "600px", // Állítsd be a szélességet
              margin: "0 auto", // Középre igazítás
            }}
          >
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Diagram;
