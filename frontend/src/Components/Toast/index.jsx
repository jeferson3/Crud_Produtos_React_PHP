import { Toast, ToastContainer } from "react-bootstrap";
import { useGlobalContext } from "../../Context/GlobalContext/context";
import { setToast } from "../../Context/GlobalContext/actions";

export function ToastNotification() {

  const { state: { toast }, dispatch } = useGlobalContext();

  const show = toast.status;
  const bg = toast.type;
  const message = toast.msg;

  return (
    
    <>
      <ToastContainer position="top-end">
        <Toast
          onClose={() => setToast(dispatch, {...toast, status: false})}
          show={show}
          delay={5000}
          autohide bg={bg}
        >
          <Toast.Header>
            <strong className="me-auto"></strong>
            <small>Agora</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}