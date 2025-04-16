import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const { id: projectId } = useParams(); // Get the project ID from the URL
  interface CalendarEvent {
    id: string;
    title: string;
    start: string;
  }

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Fetch tasks with due dates from the backend
    fetch(
      `http://localhost:8000/api/tasks-with-due-dates?project_id=${projectId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Map tasks to FullCalendar event format
        const calendarEvents = data.map((task: any) => ({
          id: task.id.toString(), // Ensure ID is a string
          title: task.name,
          start: task.due_date, // FullCalendar uses the `start` field
        }));
        setEvents(calendarEvents); // Set events for calendar display
      })
      .catch((error) =>
        console.error("Error fetching tasks with due dates:", error)
      );
  }, [projectId]);

  const handleEventDrop = async (info: any) => {
    const { id, start } = info.event;

    if (!start) {
      console.error("Invalid start date for the event.");
      info.revert();
      return;
    }

    const localDate = new Date(start);
    const formattedDate =
      localDate.getFullYear() +
      "-" +
      String(localDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(localDate.getDate()).padStart(2, "0");

    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ due_date: formattedDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task due date");
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, start: formattedDate } : event
        )
      );
    } catch (error) {
      console.error("Error updating task due date:", error);
      info.revert();
    }
  };

  return (
    <div className="p-5 bg-gray-900 flex justify-center">
      <div className="flex flex-col w-full max-w-7xl">
        <div className="calendar-container bg-gray-800 p-6 rounded-lg shadow-lg text-white">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable={true}
            timeZone="local"
            droppable={true}
            eventDrop={handleEventDrop}
            height={700}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={(eventInfo) => (
              <span>{eventInfo.event.title}</span> // Only display the task title
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
