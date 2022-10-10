import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { requestAPI } from '../../Services';
import style from './CreateBookingModal.module.css';
import { IContext, MyContext } from '../../context/MyContext';

interface Props {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
    bookId: string
}

const CreateBookingModal: React.FC<Props> = ({showModal, setShowModal, bookId}) => {
  const { users } = useContext(MyContext) as IContext;
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    setUserId(users[0]?.id);
  }, [users]);

  const createBooking = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {userId, bookId}, 'bookings', {
      Authorization: `Bearer ${token}`,
    });
    window.location.reload();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title
          className={style.modalHeader}
        >
          Create Booking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={style.form}>
          <Form.Label>
          Select user
            <Form.Select
              className={style.formSelect} 
              value={userId}
              onChange={({target}) => setUserId(target.value)}
            >
              {users.map(({name, id}) => (
                <option
                  key={id} 
                  value={id}>{name}</option>
              ))}
            </Form.Select>
          </Form.Label>
          <Container
            className={style.formContainer}>
            <Button
              className={style.button}
              onClick={() => createBooking()}
            >
            Submit
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBookingModal;