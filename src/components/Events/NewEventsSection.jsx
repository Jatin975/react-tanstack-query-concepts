
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../utils/http.js';

export default function NewEventsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', {max: 3}],
    queryFn: ({signal, queryKey})=> fetchEvents({signal, ...queryKey[1]})
  })

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
