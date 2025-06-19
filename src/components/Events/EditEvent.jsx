import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEventDetails, queryClient, updateEventDetails } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const eventId = params.id;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => fetchEventDetails({ signal, eventId })
  })

  const { mutate } = useMutation({
    mutationFn: updateEventDetails,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["events", eventId] });
      const prevEventData = queryClient.getQueryData(["events", eventId])
      queryClient.setQueryData(["events", eventId], data.event);

      return { prevEventData };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", eventId], context.prevEventData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", eventId]);
    }
  })

  function handleSubmit(formData) {
    mutate({ eventId, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  if (isPending) {
    content = <div style={{ textAlign: "center" }}><LoadingIndicator /></div>
  }

  if (isError) {
    content =
      <>
        <ErrorBlock title={"Error occured fetching the edit event details"} message={error?.info?.message || "Try again later"} />
        <div className='form-actions'>
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
  }
  if (data) {
    content = <EventForm inputData={data ? data : null} onSubmit={handleSubmit}>
      <>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </>
    </EventForm>
  }
  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
