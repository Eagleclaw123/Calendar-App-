import { useState } from "react";

const Modal = ({ date, onClose, onSave, existingEvent }) => {
  const [eventName, setEventName] = useState(existingEvent?.name || "");
  const [startTime, setStartTime] = useState(existingEvent?.startTime || "");
  const [endTime, setEndTime] = useState(existingEvent?.endTime || "");
  const [description, setDescription] = useState(
    existingEvent?.description || ""
  );

  const handleSave = () => {
    if (!eventName || !startTime || !endTime) {
      alert("Please fill all required fields.");
      return;
    }
    const newEvent = {
      id: existingEvent?.id || Date.now(),
      name: eventName,
      startTime,
      endTime,
      description,
      date,
    };
    onSave(newEvent);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{existingEvent ? "Edit Event" : "Add Event"}</h3>
        <label>Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
