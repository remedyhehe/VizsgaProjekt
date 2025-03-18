import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CgBoard } from "react-icons/cg";
import { FaCalendar, FaList, FaShare, FaSort } from "react-icons/fa";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoAddOutline, IoFilterSharp } from "react-icons/io5";
import { CiViewTimeline } from "react-icons/ci";
import Sidebar from "../Layouts/Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/projects/${id}`);
        const result = await res.json();
        if (result.status) {
          setProject(result.data);
          // Assuming result.data.tasks contains the tasks with start and end dates
          const formattedEvents = result.data.tasks.map(task => ({
            title: task.name,
            start: new Date(task.start),
            end: new Date(task.end),
            allDay: false,
          }));
          setEvents(formattedEvents);
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
                      className="flex items-center p-5 gap-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-5 gap-2 text-white rounded-sm md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                    >
                      <FaCalendar />
                      Calendar
                    </a>
                  </li>
                </ul>
              </div>

              {/* Gombok jobb oldalra igazítása */}
            
            </div>
          </nav>

          {/* Card below navbar */}
            <div className="p-5 bg-gray-900 flex justify-center">
            <div className="flex flex-col w-full max-w-7xl">
              {/* Calendar */}
              <div className="calendar-container bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                height={700}
                headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
              />
              </div>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
