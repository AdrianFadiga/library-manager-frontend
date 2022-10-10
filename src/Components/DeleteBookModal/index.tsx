import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { requestAPI } from '../../Services';
import style from './DeleteBookModal.module.css';

interface Props {
    bookId: string
    showModal: boolean
    setShowModal: (value: boolean) => void
}

const DeleteBookModal: React.FC<Props> = ({bookId, showModal, setShowModal}) => {
  const deleteBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('DELETE', {}, `books/${bookId}`, {Authorization: `Bearer ${token}`});
    window.location.reload();
  };
  
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          className={style.modalContainer}
        >
          <Button
            className={style.modalButton}
            variant="danger"
            onClick={() => deleteBook()}
          >
            Delete
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
export default DeleteBookModal;