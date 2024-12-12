import { useState, useEffect } from "react";
import "./Calendar.css";
import Modal from "./Modal.jsx";
import EventList from "./EventList.jsx";
import { getCurrentDate, generateCalendarDays } from "../utils/dateHelpers";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => getCurrentDate());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (date, isCurrentMonth) => {
    const clickedDate = new Date(date);

    if (!isCurrentMonth) {
      setCurrentDate(
        new Date(clickedDate.getFullYear(), clickedDate.getMonth())
      );
    }

    setSelectedDate(date);
    setModalData(null);
    setShowModal(true);
  };

  const addOrUpdateEvent = (event) => {
    const conflictingEvent = events.find(
      (e) =>
        e.date === event.date &&
        e.id !== event.id &&
        ((event.startTime >= e.startTime && event.startTime < e.endTime) ||
          (event.endTime > e.startTime && event.endTime <= e.endTime))
    );

    if (conflictingEvent) {
      alert(
        "This event overlaps with an existing event. Please choose a different time."
      );
      return;
    }

    setEvents((prevEvents) => {
      const filteredEvents = prevEvents.filter((e) => e.id !== event.id);
      return [...filteredEvents, event];
    });
    setShowModal(false);
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((e) => !(e.date === selectedDate && e.id === eventId))
    );
  };

  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate
  );

  const navigateMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset)
    );
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = new Date(selectedDate).toLocaleDateString("default", {
    weekday: "long",
  });

  const filteredEvents = events.filter(
    (event) =>
      event.date === selectedDate &&
      (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="day-name">{dayName}</div>
        <div>
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="calendar-navigation">
        <button onClick={() => navigateMonth(-1)}>Previous</button>
        <button onClick={() => navigateMonth(1)}>Next</button>
      </div>

      <div className="calendar-day-names">
        {dayNames.map((day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="event-search">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="calendar-grid">
        {generateCalendarDays(currentDate).map(({ date, isCurrentMonth }) => (
          <div
            key={date}
            className={`calendar-day ${
              date === selectedDate ? "selected" : ""
            }`}
            onClick={() => handleDayClick(date, isCurrentMonth)}
          >
            {new Date(date).getDate()}
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onSave={addOrUpdateEvent}
          existingEvent={modalData}
        />
      )}

      {selectedDate && (
        <EventList
          date={selectedDate}
          events={filteredEvents}
          onEdit={(event) => {
            setModalData(event);
            setShowModal(true);
          }}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
