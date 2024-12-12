const EventList = ({ date, events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      <h3>Events on {new Date(date).toLocaleDateString()}:</h3>
      {events.length === 0 ? (
        <p>No events scheduled for this day.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-item">
            <strong>{event.name}</strong>
            <p>
              {event.startTime} to {event.endTime}
            </p>
            <p>{event.description}</p>
            <div className="event-item-actions">
              <button onClick={() => onEdit(event)}>Edit</button>
              <button onClick={() => onDelete(event.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
