import { Link, redirect, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEventDetails, queryClient, updateEventDetails } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();
  const eventId = params.id;

  const { data, isError, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => fetchEventDetails({ signal, eventId }),
    staleTime: 10000
  })

  // const { mutate } = useMutation({
  //   mutationFn: updateEventDetails,
  //   onMutate: async (data) => {
  //     await queryClient.cancelQueries({ queryKey: ["events", eventId] });
  //     const prevEventData = queryClient.getQueryData(["events", eventId])
  //     queryClient.setQueryData(["events", eventId], data.event);

  //     return { prevEventData };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", eventId], context.prevEventData);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", eventId]);
  //   }
  // })

  function handleSubmit(formData) {
    // mutate({ eventId, event: formData });
    // navigate("../");
    submit(formData, { method: "PUT" });

  }

  function handleClose() {
    navigate('../');
  }

  let content;
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
      {state === "submitting" ? <p>Updating...</p> :
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </>
      }
    </EventForm>
  }
  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loadEditEvent({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEventDetails({ signal, eventId: params.id })
  })
}

//editing event using React Router action
export async function editEventAction({ request, params }) {
  const formData = await request.formData();
  const event = Object.fromEntries(formData);
  await updateEventDetails({ eventId: params.id, event });
  queryClient.invalidateQueries(["events"]);
  return redirect('../');
}