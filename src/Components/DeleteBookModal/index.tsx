import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { requestAPI } from '../../Services';

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
        <Button
          variant="danger"
          onClick={() => deleteBook()}
        >Delete</Button>
      </Modal.Body>
    </Modal>
  );
};
export default DeleteBookModal;