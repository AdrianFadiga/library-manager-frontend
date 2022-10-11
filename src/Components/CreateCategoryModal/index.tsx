import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { requestAPI } from '../../Services';
import style from './CreateCategoryModal.module.css';

interface Props {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
}

const CreateCategoryModal: React.FC<Props> = ({showModal, setShowModal}) => {
  const [category, setCategory] = useState<string>('');

  const createCategory = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {category}, 'categories', {
      Authorization: `Bearer ${token}`});
    window.location.reload();
  };
  
  return (
    <Modal show={showModal} onHide={() => {setShowModal(false);
      setCategory('')
      ;}}>
      <Modal.Header closeButton>
        <Modal.Title
          className={style.modalHeader}
        >
          Create Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={style.form}>
          <Form.Label
          >
            New category
            <Form.Control
              className={style.formControl} 
              type="text" 
              placeholder="category"
              maxLength={25} 
              onChange={({target}) => setCategory(target.value)}
              value={category}
            />
          </Form.Label>
          <Container
            className={style.formContainer}>
            <Button
              className={style.button}
              disabled={category.length <= 3 || category.length > 25}
              onClick={() => createCategory()}
            >
            Submit
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryModal;