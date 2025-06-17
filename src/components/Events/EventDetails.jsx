import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEventDetails, queryClient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

const BACKEND_URL = 'http://localhost:3000';

export default function EventDetails() {
  const params = useParams();
  const eventId = params.id;
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => fetchEventDetails({ signal, eventId })
  })

  const { mutate, isPending: isDeletingEvent } = useMutation({
    mutationFn: () => deleteEvent({ eventId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none"
      });
      navigate('/events');
    }
  })

  const handleDeleteEvent = () => {
    mutate();
  }

  const handleStartDelete = () => {
    setIsDeleting(true);
  }

  const handleStopDelete = () => {
    setIsDeleting(false);
  }

  let content;

  if (isPending) {
    content = <div id='event-details-content' className='center'>
      <p>Fetching event data...</p>
    </div>
  }

  if (isError) {
    content = <div id='event-details-content' className='center'>
      <p>Fetching event data...</p>
      <ErrorBlock title={"Error occured while fetching event details"} message={error.info?.message || "Try again later"} />
    </div>
  }

  if (data) {
    content = <>
      <header>
        <h1>{data.title}</h1>
        <nav>
          <button onClick={handleStartDelete}>Delete</button>
          <Link to="edit">Edit</Link>
        </nav>

      </header>
      <div id="event-details-content">
        <img src={BACKEND_URL + "/" + data.image} alt="" />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} {data.time}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </>
  }

  return (
    <>
      {isDeleting && <Modal onClose={handleStartDelete}>
        <div>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event. This action cannot be undone</p>
          <div className='form-actions'>
            {isDeletingEvent ?
              <span className='button-text'>Deleting....</span> :
              <>
                <button onClick={handleStopDelete} className='button-text'>Cancel</button>
                <button onClick={handleDeleteEvent} className='button'>Delete</button>
              </>
            }
          </div>
        </div>
      </Modal>}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
