import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { requestAPI } from '../../Services';
import style from './ReturnBookModal.module.css';

interface Props {
    showModal: boolean
    setShowModal: (value: boolean) => void
    bookingId: string
}

const ReturnBookModal: React.FC<Props> = ({showModal, setShowModal, bookingId}) => {
  const returnBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('PATCH', {}, `bookings/${bookingId}`, {Authorization: `Bearer ${token}`});
    window.location.reload();
  };
  
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm return</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          className={style.modalContainer}
        >
          <Button
            className={style.modalButton}
            variant="warning"
            onClick={() => returnBook()}
          >
            Confirm
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
export default ReturnBookModal;