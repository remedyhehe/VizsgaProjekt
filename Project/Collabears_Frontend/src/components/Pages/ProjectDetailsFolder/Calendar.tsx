import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Calendar = () => {

  interface Project {
    name: string;
    tasks: { name: string; start: string; end: string }[];
  }

  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  return(

    <div className="p-5 bg-gray-900 flex justify-center">
    <div className="flex flex-col w-full max-w-7xl">
      <div className="calendar-container bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height={700}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </div>
  </div>
  )

}

export default Calendar;