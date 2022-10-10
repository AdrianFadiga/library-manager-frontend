import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { requestAPI } from '../../Services';
import style from './ConfirmBookingModal.module.css';
import { useContext } from 'react';
import { IContext, MyContext } from '../../context/MyContext';

interface Props {
    showModal: boolean
    setShowModal: (value: boolean) => void
    bookId: string
}

const ConfirmBookingModal: React.FC<Props> = ({showModal, setShowModal, bookId}) => {
  const { loggedId } = useContext(MyContext) as IContext;
  const bookThisBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {
      bookId, userId: loggedId
    }, 'bookings', {Authorization: `Bearer ${token}`});
    window.location.reload();
  };
  
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          className={style.modalContainer}
        >
          <Button
            className={style.modalButton}
            variant="success"
            onClick={() => bookThisBook()}
          >
            Confirm
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
export default ConfirmBookingModal;