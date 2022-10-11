import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { requestAPI } from '../../Services';
import style from './CreateUserModal.module.css';

interface Props {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
}

const CreateUserModal: React.FC<Props> = ({showModal, setShowModal}) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    isDisabled: true,
  };
  const [formState, setFormState] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const createUser = async () => {
    const {name, email, password, role} = formState;
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {name, email, password, role}, 'users', {
      Authorization: `Bearer ${token}`});
    window.location.reload();
  };

  const validateCreateUser = () => {
    const {name, email, password} = formState;
    const validate = (
      name.length < 3
      || name.length > 50
      || email.length < 5
      || email.length > 50
      || password.length < 5
      || password.length > 20
      || !email.includes('@')
      || !email.includes('.com')
    );
    setIsDisabled(validate);
  };

  useEffect(() => {
    validateCreateUser();
  }, [formState.name, formState.email, formState.password]);

  return (
    <Modal show={showModal} onHide={() => {setShowModal(false);
      setFormState(initialState)
      ;}}>
      <Modal.Header closeButton>
        <Modal.Title
          className={style.modalHeader}
        >
          Register user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={style.form}>
          <Form.Label
          >
            Name
            <Form.Control
              className={style.formControl} 
              type="text" 
              placeholder="name" 
              onChange={({target}) => setFormState({
                ...formState,
                name: target.value
              })}
              value={formState.name}
            />
          </Form.Label>
          <Form.Label
          >
            Email
            <Form.Control
              className={style.formControl} 
              type="email" 
              placeholder="email" 
              onChange={({target}) => setFormState({
                ...formState,
                email: target.value
              })}
              value={formState.email}
            />
          </Form.Label>
          <Form.Label
          >
            Password
            <Form.Control
              className={style.formControl} 
              type="password" 
              placeholder="password" 
              onChange={({target}) => setFormState({
                ...formState,
                password: target.value
              })}
              value={formState.password}
            />
          </Form.Label>
          <Form.Label>
          Role
            <Form.Select
              className={style.formSelect} 
              value={formState.role}
              onChange={({target}) => setFormState({
                ...formState,
                role: target.value
              })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Label>
          <Container
            className={style.formContainer}>
            <Button
              className={style.button}
              disabled={isDisabled}
              onClick={() => createUser()}
            >
            Submit
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;